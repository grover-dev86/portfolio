import { useState } from "react";
import {
  HiMapPin,
  HiPhone,
  HiEnvelope,
  HiBriefcase,
} from "react-icons/hi2";
import SectionShell from "../SectionShell";
import { personalInfo } from "../../data/profile";

const initialForm = { name: "", email: "", subject: "", message: "" };

// 👇 Reemplaza esto por tu Access Key de https://web3forms.com (gratis, sin tarjeta).
const WEB3FORMS_ACCESS_KEY = "TU_ACCESS_KEY_AQUI";

function InfoCard({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 px-3 py-4 rounded-xl border border-ink-300/30 bg-white hover:border-brand-300 hover:shadow-sm transition min-w-0">
      <Icon className="text-2xl text-brand-400 shrink-0" />
      <span className="block w-full text-[13px] text-ink-700 font-medium leading-tight break-words">
        {label}
      </span>
    </div>
  );
}

function FormField({ id, label, type = "text", value, onChange, error, fillHeight = false, ...rest }) {
  const isTextarea = type === "textarea";

  const fieldClasses = [
    "peer w-full rounded-xl border bg-white px-4 pt-5 pb-2 text-sm text-ink-900",
    "placeholder-transparent focus:outline-none focus:ring-1 focus:ring-brand-200 focus:border-brand-400 transition",
    error ? "border-red-300" : "border-ink-300/40",
  ].join(" ");

  // Floating label states:
  //  - DEFAULT (filled, not focused): floats above the top border, brand color
  //  - peer-placeholder-shown (empty): sits inside the field like a placeholder
  //  - peer-focus (focused): floats above — generated after placeholder-shown, so it wins
  const labelClasses = [
    "absolute left-3 -top-2 px-1 bg-white text-xs font-medium pointer-events-none transition-all duration-200",
    error ? "text-red-500" : "text-brand-400",
    // Resting state when input is empty
    "peer-placeholder-shown:top-4",
    "peer-placeholder-shown:left-4",
    "peer-placeholder-shown:text-sm",
    "peer-placeholder-shown:font-normal",
    "peer-placeholder-shown:text-ink-500",
    "peer-placeholder-shown:px-0",
    "peer-placeholder-shown:bg-transparent",
    // Focused — wins over placeholder-shown (CSS order)
    "peer-focus:-top-2",
    "peer-focus:left-3",
    "peer-focus:text-xs",
    "peer-focus:font-medium",
    "peer-focus:px-1",
    "peer-focus:bg-white",
    error ? "peer-focus:text-red-500" : "peer-focus:text-brand-400",
  ].join(" ");

  return (
    <div className={["relative", fillHeight ? "h-full" : ""].join(" ")}>
      {isTextarea ? (
        <textarea
          id={id}
          name={id}
          placeholder=" "
          rows={fillHeight ? undefined : 5}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          className={[fieldClasses, fillHeight ? "h-full resize-none min-h-[160px]" : ""].join(" ")}
          {...rest}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder=" "
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          className={fieldClasses}
          {...rest}
        />
      )}
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Nombre requerido";
  if (!form.email.trim()) errors.email = "Email requerido";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Email no válido";
  if (!form.subject.trim()) errors.subject = "Asunto requerido";
  if (!form.message.trim()) errors.message = "Mensaje requerido";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate(form);
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm(initialForm);
        setTimeout(() => setStatus("idle"), 3500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <SectionShell>
      <h2 className="section-title">Contacto</h2>

      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
          <InfoCard icon={HiMapPin} label="Lima" />
          <InfoCard icon={HiPhone} label={personalInfo.phone} />
          <InfoCard icon={HiEnvelope} label={personalInfo.email} />
          <InfoCard icon={HiBriefcase} label={personalInfo.status} />
        </div>

        <div>
          <div className="rounded-2xl overflow-hidden border border-ink-300/30 aspect-[16/6]">
            <iframe
              title="Mapa de ubicación"
              src={personalInfo.mapEmbed}
              className="w-full h-full"
              loading="lazy"
            />
          </div>

          <h3 className="mt-6 text-xl font-semibold text-ink-900">
            ¿Cómo Puedo <span className="text-brand-400">Ayudarte?</span>
          </h3>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-4 grid gap-3 md:grid-cols-2 md:grid-rows-[auto_auto_auto_auto]"
          >
            <div className="md:col-start-1 md:row-start-1">
              <FormField
                id="name"
                label="Nombre"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />
            </div>
            <div className="md:col-start-1 md:row-start-2">
              <FormField
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>
            <div className="md:col-start-1 md:row-start-3">
              <FormField
                id="subject"
                label="Asunto"
                value={form.subject}
                onChange={handleChange}
                error={errors.subject}
              />
            </div>
            <div className="md:col-start-2 md:row-start-1 md:row-span-3">
              <FormField
                id="message"
                label="Mensaje"
                type="textarea"
                fillHeight
                value={form.message}
                onChange={handleChange}
                error={errors.message}
              />
            </div>

            <div className="md:col-span-2 md:row-start-4 mt-2 flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-400 text-white text-sm font-medium hover:bg-brand-500 transition disabled:opacity-60"
              >
                {status === "sending" ? "Enviando…" : "Enviar mensaje"}
              </button>
              {status === "sent" && (
                <span className="text-sm text-green-600 animate-fade-in">
                  ¡Mensaje enviado!
                </span>
              )}
              {status === "error" && (
                <span className="text-sm text-red-500 animate-fade-in">
                  Ocurrió un error. Inténtalo de nuevo.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </SectionShell>
  );
}
