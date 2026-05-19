const navLinks = [
  { href: "#about", label: "Про нас" },
  { href: "#services", label: "Послуги" },
  { href: "#contact", label: "Контакти" },
];

const services = [
  {
    title: "Розробка",
    description:
      "Сучасні веб-застосунки на React та Next.js з увагою до продуктивності та UX.",
  },
  {
    title: "Дизайн",
    description:
      "Чистий інтерфейс, адаптивна верстка та доступність на всіх пристроях.",
  },
  {
    title: "Підтримка",
    description:
      "Супровід проєкту після запуску: оновлення, моніторинг і масштабування.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-stone-200/80 bg-background/80 backdrop-blur-md dark:border-stone-800">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <a
            href="#"
            className="text-xl font-semibold tracking-tight text-accent"
          >
            Tera
          </a>
          <nav className="hidden gap-8 text-sm font-medium text-stone-600 sm:flex dark:text-stone-400">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Зв&apos;язатися
          </a>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden px-6 py-24 sm:py-32">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--color-accent-muted),transparent)]"
          />
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
              Ласкаво просимо
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Сайт Tera на Next.js
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-600 dark:text-stone-400">
              Швидкий, сучасний React-сайт з App Router, TypeScript і Tailwind
              CSS. Редагуйте{" "}
              <code className="rounded bg-stone-200/80 px-1.5 py-0.5 font-mono text-sm dark:bg-stone-800">
                src/app/page.tsx
              </code>{" "}
              і розвивайте проєкт далі.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#services"
                className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Дізнатися більше
              </a>
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium transition-colors hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-900"
              >
                Документація Next.js
              </a>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="border-t border-stone-200 bg-stone-50 px-6 py-20 dark:border-stone-800 dark:bg-stone-950"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight">Про нас</h2>
            <p className="mt-4 max-w-2xl text-stone-600 dark:text-stone-400">
              Tera — стартовий шаблон для вашого бізнесу чи портфоліо. Цей
              проєкт уже налаштований для локальної розробки та деплою на
              Vercel або інший хостинг.
            </p>
          </div>
        </section>

        <section id="services" className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight">Послуги</h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-3">
              {services.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900"
                >
                  <h3 className="font-semibold text-accent">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-stone-200 px-6 py-20 dark:border-stone-800"
        >
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Контакти</h2>
            <p className="mt-4 text-stone-600 dark:text-stone-400">
              Додайте сюди email, форму або посилання на соцмережі.
            </p>
            <a
              href="mailto:hello@tera.example"
              className="mt-6 inline-block text-accent underline-offset-4 hover:underline"
            >
              hello@tera.example
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 px-6 py-8 text-center text-sm text-stone-500 dark:border-stone-800">
        © {new Date().getFullYear()} Tera. Усі права захищені.
      </footer>
    </div>
  );
}
