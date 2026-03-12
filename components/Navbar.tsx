"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { FloorPlanStyle } from "@/lib/floor-plan-styles";

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

const submenuImageSets: Record<string, string[]> = {
  "floor-plans": [
    "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=900&q=80"
  ],
  "our-homes": [
    "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80"
  ],
  "build-process": [
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=900&q=80"
  ],
  about: [
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80"
  ],
  "get-started": [
    "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=900&q=80"
  ]
};

const getSubmenuImage = (
  menuId: string,
  index: number,
  href: string,
  submenuImageOverrides?: Record<string, string>
) => {
  const overrideImage = submenuImageOverrides?.[href];
  if (overrideImage) {
    return overrideImage;
  }

  const images = submenuImageSets[menuId];
  if (!images?.length) {
    return "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80";
  }
  return images[index % images.length];
};

const baseNavItems: NavItem[] = [
  {
    id: "floor-plans",
    href: "/floor-plans",
    label: "Floor Plans"
  },
  {
    id: "our-homes",
    href: "/our-homes",
    label: "Our Homes",
    subItems: [
      { href: "/our-homes/photo-gallery", label: "Photo Gallery" },
      { href: "/our-homes/videos", label: "Videos" },
      { href: "/our-homes/virtual-tours", label: "Virtual Tours" },
      { href: "/our-homes/visit-our-model-homes", label: "Visit Our Model Homes" }
    ]
  },
  {
    id: "build-process",
    href: "/build-process",
    label: "Build Process",
    subItems: [
      { href: "/build-process/building-green", label: "Building Green" },
      { href: "/build-process/design-and-ordering-process", label: "Design and Ordering Process" },
      { href: "/build-process/modular-construction", label: "Modular Construction" },
      { href: "/build-process/modular-vs-manufactured", label: "Modular vs. Manufactured" },
      { href: "/build-process/precision-building", label: "Precision Building" },
      { href: "/build-process/site-built-vs-factory-built", label: "Site Built vs. Factory Built" },
      { href: "/build-process/warranty", label: "Warranty" }
    ]
  },
  {
    id: "about",
    href: "/about",
    label: "About",
    subItems: [
      { href: "/about/our-philosophy", label: "Our Philosophy" },
      { href: "/about/our-team", label: "Our Team" },
      { href: "/about/valoria-homes-reviews", label: "Valoria Homes Reviews" }
    ]
  },
  {
    id: "get-started",
    href: "/get-started",
    label: "Get Started",
    subItems: [
      { href: "/get-started/homebuying-process", label: "Homebuying Process" },
      { href: "/get-started/faq", label: "FAQs" },
      { href: "/get-started/terms-and-definitions", label: "Terms & Definitions" },
      { href: "/get-started/mortgage-calculator", label: "Mortgage Calculator" }
    ]
  },
  {
    id: "contact",
    href: "/contact",
    label: "Contact"
  }
];

type NavbarProps = {
  floorPlanStyles: FloorPlanStyle[];
  submenuImageOverrides?: Record<string, string>;
};

export default function Navbar({ floorPlanStyles, submenuImageOverrides }: NavbarProps) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileOpenSubmenus, setMobileOpenSubmenus] = useState<Record<string, boolean>>({});
  const [suppressDesktopMegaMenu, setSuppressDesktopMegaMenu] = useState(false);

  const navItems = useMemo<NavItem[]>(() => {
    const floorPlanSubItems: SubItem[] = [
      { href: "/floor-plans", label: "All Floor Plans" },
      ...floorPlanStyles.map((style) => ({
        href: `/floor-plans/${style.slug}`,
        label: style.title
      }))
    ];

    return baseNavItems.map((item) =>
      item.id === "floor-plans"
        ? {
            ...item,
            subItems: floorPlanSubItems
          }
        : item
    );
  }, [floorPlanStyles]);

  const itemsById = useMemo(() => Object.fromEntries(navItems.map((item) => [item.id, item])), [navItems]);

  useEffect(() => {
    setMobileNavOpen(false);
    setMobileOpenSubmenus({});
    setSuppressDesktopMegaMenu(true);
  }, [pathname]);

  const toggleMobileSubmenu = (id: string) => {
    setMobileOpenSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleNavLinkClick = () => {
    setSuppressDesktopMegaMenu(true);
    setMobileNavOpen(false);
  };

  const showDesktopMegaMenu = () => {
    setSuppressDesktopMegaMenu(false);
  };

  const hideDesktopMegaMenu = () => {
    setSuppressDesktopMegaMenu(true);
  };

  return (
    <header className="header content-grid relative z-50 border-b border-white/20 bg-brand-blue font-body">
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

        <nav className="header__nav hidden h-full md:flex md:items-center" aria-label="primary navigation">
          <ul className="header__nav-list flex items-center gap-10">
            {navItems.map((item) => {
              const hasSubMenu = Boolean(item.subItems?.length);
              const menuItemId = `menu-item-${item.id}`;

              return (
                <li
                  key={item.id}
                  className={`header__nav-list-item ${hasSubMenu ? "group static pb-14 -mb-14" : ""}`}
                  onMouseEnter={hasSubMenu ? showDesktopMegaMenu : undefined}
                  onMouseLeave={hasSubMenu ? hideDesktopMegaMenu : undefined}
                >
                  <Link
                    className="header__nav-list-link relative font-body text-[18px] font-[400] text-white transition-colors duration-300 ease-out hover:text-brand-bronze after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-brand-bronze after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:after:scale-x-100"
                    id={menuItemId}
                    href={item.href}
                    onClick={handleNavLinkClick}
                    aria-haspopup={hasSubMenu ? "true" : undefined}
                    aria-controls={hasSubMenu ? `desktop-mega-menu-${item.id}` : undefined}
                    aria-expanded={hasSubMenu ? false : undefined}
                  >
                    {item.label}
                  </Link>

                  {hasSubMenu && (
                    <div
                      id={`desktop-mega-menu-${item.id}`}
                      aria-labelledby={menuItemId}
                      className="header__mega-menu absolute left-0 right-0 top-full z-[70] hidden border-t border-brand-blue/10 bg-white shadow-xl group-hover:block group-focus-within:block"
                      style={suppressDesktopMegaMenu ? { display: "none" } : undefined}
                    >
                      <div className="mx-auto w-full max-w-[1720px] px-4 py-6 sm:px-6 lg:px-8">
                        <p className="font-body text-[28px] font-[700] uppercase tracking-wide text-brand-blue">{item.label}</p>
                        <div className="mt-5 grid content-start grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5">
                          {item.subItems!.map((subItem, index) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="group/card block overflow-hidden rounded-lg border border-slate-200 bg-brand-offwhite transition duration-200 hover:border-brand-bronze hover:shadow-md"
                              onClick={handleNavLinkClick}
                            >
                              <div className="relative aspect-[4/3] w-full overflow-hidden">
                                <Image
                                  src={getSubmenuImage(item.id, index, subItem.href, submenuImageOverrides)}
                                  alt={`${subItem.label} preview`}
                                  fill
                                  sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 19vw, 26vw"
                                  className="object-cover transition-transform duration-300 group-hover/card:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                              </div>
                              <div className="px-3 py-2.5">
                                <p className="font-body text-[15px] font-[400] leading-tight text-brand-body transition-colors duration-200 group-hover/card:text-brand-blue">
                                  {subItem.label}
                                </p>
                              </div>
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

        <div className="header__cta hidden md:block">
          <Link className="header__mobile-cta btn btn--primary rounded-md bg-brand-bronze px-8 py-3 font-body text-[16px] font-semibold text-brand-body" href="/get-started" aria-label="Find Your Builder">
            Find Your Builder
          </Link>
        </div>

        <button
          className="header__hamburger inline-flex items-center justify-center rounded-md border border-white/40 px-3 py-2 font-body text-sm font-bold text-white md:hidden"
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
        <div id="header__mobile-nav" className="header__mobile-nav border-t border-white/20 bg-brand-blue md:hidden">
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
                        className="header__mobile-nav-link parent fw-500 flex-1 rounded px-3 py-2 font-body text-[15px] font-medium text-white"
                        href={item.href}
                        aria-haspopup={hasSubmenu ? "true" : undefined}
                        aria-controls={hasSubmenu ? submenuId : undefined}
                        aria-expanded={hasSubmenu ? open : undefined}
                        title={item.label}
                        onClick={handleNavLinkClick}
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
                              onClick={handleNavLinkClick}
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
              <Link className="btn btn--primary inline-flex rounded-md bg-brand-bronze px-7 py-3 font-semibold text-brand-body" href="/get-started" aria-label="Find Your Builder" onClick={handleNavLinkClick}>
                Find Your Builder
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
