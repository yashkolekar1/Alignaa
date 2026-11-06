import { useEffect, useRef, useState } from "react";

type SiteHeaderProps = {
  isPartnerPage?: boolean;
};

type NavItem = {
  key: string;
  label: string;
  href: string;
};

export function SiteHeader({ isPartnerPage = false }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string>("home");
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  const navItems: NavItem[] = [
    { key: "home", label: "Home", href: "/" },
    { key: "system", label: "The Alignaa. System", href: "/#how-it-works" },
    { key: "webinar", label: "Free Webinar", href: "/#enquiry" },
    { key: "cases", label: "Case Studies", href: "/#results" },
    {
      key: "contact",
      label: "Contact us",
      href: isPartnerPage ? "/become-a-partner/#partner-enquiry" : "/#enquiry",
    },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const getActiveFromHash = () => {
      const hash = window.location.hash;
      if (hash === "#how-it-works") return "system";
      if (hash === "#results") return "cases";
      if (hash === "#enquiry" || hash === "#partner-enquiry") return "contact";
      if (window.location.pathname === "/" && (!hash || hash === "#" || hash === "#top")) return "home";
      return "";
    };

    const initial = getActiveFromHash();
    if (initial) {
      setActiveKey(initial);
    } else if (window.location.pathname === "/") {
      setActiveKey("home");
    } else {
      setActiveKey("");
    }

    if (window.location.pathname !== "/") {
      return;
    }

    const sectionIds = [
      { id: "enquiry", key: "contact" },
      { id: "results", key: "cases" },
      { id: "how-it-works", key: "system" },
    ];

    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveKey("home");
        return;
      }

      const scrollPos = window.scrollY + 140;
      for (const { id, key } of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveKey(key);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", () => {
      const fromHash = getActiveFromHash();
      if (fromHash) setActiveKey(fromHash);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    setMenuOpen(false);
    setActiveKey(item.key);

    if (item.key === "home" && window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.location.hash) {
        window.history.pushState(null, "", "/");
      }
    }
  };

  return (
    <header className="site-header">
      <div className="header-inner content-width">
        <a className="navbar-brand" href="/" aria-label="Alignaa home">
          <img
            src="/assets/alignaa-logo.png"
            srcSet="/assets/alignaa-logo.png 1x, /assets/alignaa-logo@2x.png 2x"
            alt="Alignaa"
            className="site-logo"
            width="144"
            height="38"
          />
        </a>

        <nav
          id="primary-navigation"
          className={`primary-navigation${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const isActive = activeKey === item.key;
            return (
              <a
                key={item.key}
                href={item.href}
                className={`nav-link${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => handleLinkClick(e, item)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="header-right">
          <button
            ref={menuToggleRef}
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle-lines" aria-hidden="true">
              <i />
              <i />
            </span>
            <span className="visually-hidden">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div
          className="menu-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
