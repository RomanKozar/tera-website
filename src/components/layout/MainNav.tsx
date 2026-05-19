"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavItem } from "@/lib/navigation";

const linkBase =
  "flex items-center gap-1 px-3 py-3 text-sm font-semibold text-tera-navy transition-colors hover:text-tera-blue";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = isActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`${linkBase} ${active ? "border-b-2 border-tera-gold bg-white/30" : ""}`}
    >
      {item.label}
    </Link>
  );
}

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = isActive(pathname, item.href);

  if (!item.children?.length) {
    return <NavLink item={item} />;
  }

  return (
    <li
      className="relative list-none"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href={item.href} className={`${linkBase} ${active ? "border-b-2 border-tera-gold bg-white/30" : ""}`}>
        {item.label}
        <span className="text-[10px] opacity-70" aria-hidden>
          ▾
        </span>
      </Link>
      {open && (
        <ul className="absolute left-0 top-full z-30 min-w-[280px] border border-tera-border bg-white py-1 shadow-xl">
          {item.children.map((child) => (
            <li key={child.href} className="list-none">
              <Link
                href={child.href}
                className="block px-4 py-3 text-sm font-medium text-tera-navy hover:bg-tera-nav-bg hover:text-tera-blue"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function MainNav({ items, menuLabel }: { items: NavItem[]; menuLabel: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className="hidden bg-gradient-to-r from-tera-nav-bg to-tera-nav-bg-end lg:block"
        aria-label={menuLabel}
      >
        <ul className="mx-auto flex max-w-7xl flex-wrap px-2">
          {items.map((item) =>
            item.children?.length ? (
              <DesktopDropdown key={item.href} item={item} />
            ) : (
              <li key={item.href} className="list-none">
                <NavLink item={item} />
              </li>
            ),
          )}
        </ul>
      </nav>

      <section
        className="bg-gradient-to-r from-tera-nav-bg to-tera-nav-bg-end lg:hidden"
        aria-label={menuLabel}
      >
        <button
          type="button"
          className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-bold text-tera-navy"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
        >
          {menuLabel}
          <span aria-hidden>{mobileOpen ? "✕" : "☰"}</span>
        </button>
        {mobileOpen && (
          <nav className="border-t border-tera-blue/15 bg-white/40 pb-2">
            {items.map((item) => (
              <section key={item.href}>
                <NavLink item={item} onNavigate={() => setMobileOpen(false)} />
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className="block border-t border-tera-border/50 py-2.5 pl-8 pr-4 text-sm font-medium text-tera-navy hover:bg-white/60"
                  >
                    {child.label}
                  </Link>
                ))}
              </section>
            ))}
          </nav>
        )}
      </section>
    </>
  );
}
