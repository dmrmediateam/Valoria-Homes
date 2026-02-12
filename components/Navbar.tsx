"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type SubItem = {
  href: string;
  label: string;
};

type NavItem = {
  id: string;
  href: string;
  label: string;
  subItems?: SubItem[];
};

const navItems: NavItem[] = [
  {
    id: "floor-plans",
    href: "/floor-plans",
    label: "Floor Plans",
    subItems: [
      { href: "/floor-plans", label: "All Floor Plans" },
      { href: "/floor-plans", label: "Starter Series" },
      { href: "/floor-plans", label: "Single Section" },
      { href: "/floor-plans", label: "Cape Cod" },
      { href: "/floor-plans", label: "Chalet" },
      { href: "/floor-plans", label: "Colonial" },
      { href: "/floor-plans", label: "Cottage" },
      { href: "/floor-plans", label: "Duplex" },
      { href: "/floor-plans", label: "Ranch" }
    ]
  },
  {
    id: "see-our-homes",
    href: "/floor-plans",
    label: "See Our Homes",
    subItems: [
      { href: "/floor-plans", label: "Photo Gallery" },
      { href: "/floor-plans", label: "Videos" },
      { href: "/floor-plans", label: "Virtual Tours" },
      { href: "/floor-plans", label: "Visit Our Model Homes" }
    ]
  },
  {
    id: "build-process",
    href: "/build-process",
    label: "Build Process",
    subItems: [
      { href: "/build-process", label: "Building Green" },
      { href: "/build-process", label: "Design and Ordering Process" },
      { href: "/build-process", label: "Modular Construction" },
      { href: "/build-process", label: "Modular vs. Manufactured" },
      { href: "/build-process", label: "Precision Building" },
      { href: "/build-process", label: "Site Built vs. Factory Built" },
      { href: "/build-process", label: "Warranty" }
    ]
  },
  {
    id: "about",
    href: "/about",
    label: "About",
    subItems: [
      { href: "/about", label: "Become a Builder" },
      { href: "/about", label: "Careers" },
      { href: "/about", label: "History" },
      { href: "/about", label: "Our Philosophy" },
      { href: "/about", label: "Our Team" },
      { href: "/about", label: "Valoria Homes Reviews" }
    ]
  },
  {
    id: "resources",
    href: "/get-started",
    label: "Resources",
    subItems: [
      { href: "/get-started", label: "Color Visualizer" },
      { href: "/get-started", label: "Events" },
      { href: "/get-started", label: "FAQs" },
      { href: "/get-started", label: "Home Design Center" },
      { href: "/get-started", label: "Mortgage Calculator" }
    ]
  },
  {
    id: "contact",
    href: "/contact",
    label: "Contact"
  }
];

export default function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileOpenSubmenus, setMobileOpenSubmenus] = useState<Record<string, boolean>>({});

  const itemsById = useMemo(() => Object.fromEntries(navItems.map((item) => [item.id, item])), []);

  const toggleMobileSubmenu = (id: string) => {
    setMobileOpenSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <header className="header content-grid bg-brand-blue expand sticky top-0 z-50 border-b border-white/20 relative">
      <div className="header__wrapper content-full mx-auto flex h-[112px] w-full max-w-[1720px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="header__logo">
          <span className="visually-hidden sr-only">Home</span>
          <Link className="brand-logo" href="/" aria-label="Home">
            <Image
              className="dim"
              src="/images/Valoria_Concept2_Logo.png"
              width={132}
              height={115}
              alt="Valoria Homes Inc. logo"
              priority
            />
          </Link>
        </div>

        <nav className="header__nav relative hidden md:block" aria-label="primary navigation">
          <ul className="header__nav-list flex-align-center flex items-center gap-10">
            {navItems.map((item) => {
              const hasSubMenu = Boolean(item.subItems?.length);
              const menuItemId = `menu-item-${item.id}`;
              const subMenuId = `submenu-${item.id}`;

              return (
                <li
                  key={item.id}
                  className={`header__nav-list-item ${hasSubMenu ? "has-sub-menu group relative pb-16 -mb-16" : ""}`}
                >
                  <Link
                    className="header__nav-list-link sub-menu-toggle font-body relative text-[18px] font-[400] text-white transition-colors duration-300 ease-out hover:text-brand-bronze after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-brand-bronze after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:after:scale-x-100"
                    id={menuItemId}
                    href={item.href}
                    aria-haspopup={hasSubMenu ? "true" : undefined}
                    aria-controls={hasSubMenu ? subMenuId : undefined}
                    aria-expanded={hasSubMenu ? "false" : undefined}
                  >
                    {item.label}
                  </Link>

                  {hasSubMenu && (
                    <div
                      id={subMenuId}
                      aria-labelledby={menuItemId}
                      className="header__mega-menu fixed left-0 right-0 top-[112px] z-[70] hidden border-t border-brand-blue/10 bg-white shadow-xl group-hover:block group-focus-within:block"
                    >
                      <div className="mx-auto w-full max-w-[1720px] px-4 py-10 sm:px-6 lg:px-8">
                        <p className="font-body text-[34px] font-[700] uppercase tracking-wide text-brand-blue">{item.label}</p>
                        <div className="mt-8 grid grid-cols-3 gap-6">
                          {item.subItems!.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="block rounded-lg border border-slate-200 bg-white px-6 py-5 font-body text-[20px] font-[400] text-brand-body transition-colors duration-200 hover:border-brand-bronze hover:text-brand-blue"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="header__cta gap-sm hidden md:block">
          <Link className="header__mobile-cta btn btn--primary rounded-full bg-brand-bronze px-8 py-3 font-body text-[16px] font-semibold text-brand-body" href="/get-started" aria-label="Find Your Builder">
            Find Your Builder
          </Link>
        </div>

        <button
          className="header__hamburger hamburger hamburger--slider fw-700 inline-flex items-center justify-center rounded-md border border-white/40 px-3 py-2 font-body text-sm font-bold text-white md:hidden"
          type="button"
          aria-controls="header__mobile-nav"
          aria-label="open mobile menu"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((prev) => !prev)}
        >
          <span className="hamburger-box">Menu</span>
        </button>
      </div>

      {mobileNavOpen && (
        <div id="header__mobile-nav" className="header__mobile-nav bg-brand-blue border-t border-white/20 md:hidden">
          <div className="header__mobile-nav-inner px-4 py-4 sm:px-6">
            <ul className="header__mobile-nav-menu space-y-1">
              {navItems.map((item) => {
                const hasSubmenu = Boolean(item.subItems?.length);
                const open = Boolean(mobileOpenSubmenus[item.id]);
                const submenuId = `mobile-submenu-${item.id}`;

                return (
                  <li key={item.id} className={`header__mobile-nav-item ${hasSubmenu ? "nav-item-has-dropdown" : ""}`}>
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        className="header__mobile-nav-link parent fw-500 font-body flex-1 rounded px-3 py-2 text-[15px] font-medium text-white"
                        href={item.href}
                        aria-haspopup={hasSubmenu ? "true" : undefined}
                        aria-controls={hasSubmenu ? submenuId : undefined}
                        aria-expanded={hasSubmenu ? open : undefined}
                        title={item.label}
                        onClick={() => setMobileNavOpen(false)}
                      >
                        {item.label}
                      </Link>

                      {hasSubmenu && (
                        <button
                          className="toggle-mobile-dropdown inline-flex h-8 w-8 items-center justify-center rounded border border-white/30 text-white"
                          aria-label="open mobile dropdown menu"
                          type="button"
                          onClick={() => toggleMobileSubmenu(item.id)}
                        >
                          {open ? "−" : "+"}
                        </button>
                      )}
                    </div>

                    {hasSubmenu && open && (
                      <ul className="header__mobile-dropdown mt-1 space-y-1 pl-2" id={submenuId} aria-labelledby={submenuId}>
                        {itemsById[item.id].subItems?.map((subItem) => (
                          <li key={subItem.label} className="header__mobile-nav-item">
                            <Link
                              className="header__mobile-dropdown-link block rounded px-3 py-2 text-sm text-white/90 hover:bg-white/10"
                              href={subItem.href}
                              title={subItem.label}
                              onClick={() => setMobileNavOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="header__mobile-cta margin-inline-auto mt-4 text-center">
              <Link className="btn btn--primary inline-flex rounded-full bg-brand-bronze px-7 py-3 font-semibold text-brand-body" href="/get-started" aria-label="Find Your Builder" onClick={() => setMobileNavOpen(false)}>
                Find Your Builder
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
