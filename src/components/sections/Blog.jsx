import SectionShell from "../SectionShell";
import { blogPosts } from "../../data/blog";

export default function Blog() {
  return (
    <SectionShell>
      <h2 className="section-title">Blog</h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {blogPosts.map((post) => (
          <a
            key={post.id}
            href={post.url}
            className="group block animate-fade-up"
          >
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-brand-50">
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider bg-white/90 dark:bg-night-card/90 backdrop-blur text-brand-500 font-semibold px-2.5 py-1 rounded-full">
                {post.category}
              </span>
            </div>
            <p className="mt-3 text-[11px] text-ink-500">{post.date}</p>
            <h4 className="mt-1 text-base font-medium text-ink-900 group-hover:text-brand-500 transition-colors">
              {post.title}
            </h4>
          </a>
        ))}
      </div>
    </SectionShell>
  );
}
