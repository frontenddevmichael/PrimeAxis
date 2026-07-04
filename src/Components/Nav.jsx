import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
    { label: "Home", href: "#Hero" },
    { label: "About", href: "#About" },
    { label: "Services", href: "#Services" },
    { label: "Team", href: "#Teams" },
    { label: "Contact", href: "#Contact" },
];

function IconSun() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
    );
}

function IconMoon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
    );
}

function IconMenu() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    );
}

function IconX() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

export default function Nav() {
    const navRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const lastScrollY = useRef(0);

    const [isDark, setIsDark] = useState(() => {
        if (typeof window === "undefined") return false;
        const saved = localStorage.getItem("primeaxis-theme");
        if (saved) return saved === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    const [menuOpen, setMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");

    /* ===========================
       Theme Sync
    ============================ */
    useEffect(() => {
        const root = document.documentElement;

        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("primeaxis-theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("primeaxis-theme", "light");
        }
    }, [isDark]);

    /* ===========================
       Scroll Behaviour
       Adds a 10px deadband to prevent flicker
       from touch scroll bounce.
    ============================ */
    useEffect(() => {
        const onScroll = () => {
            const current = window.scrollY;

            setScrolled(current > 50);

            if (current > lastScrollY.current && current > 80) {
                setHidden(true);
                setMenuOpen(false);
            } else if (current < lastScrollY.current - 10) {
                setHidden(false);
            }

            lastScrollY.current = current;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ===========================
       Scroll-spy — active nav link
       Uses rootMargin with a narrow detection band near the top
       so the current section is always the one whose top edge
       is closest to the viewport top (below the navbar).
    ============================ */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                let highest = null;
                let highestTop = Infinity;
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        const match = NAV_LINKS.find((link) => link.href === `#${id}`);
                        if (match) {
                            const rect = entry.target.getBoundingClientRect();
                            if (rect.top < highestTop) {
                                highestTop = rect.top;
                                highest = match.label;
                            }
                        }
                    }
                });
                if (highest) setActiveSection(highest);
            },
            { threshold: 0, rootMargin: "-80px 0px -90% 0px" }
        );

        NAV_LINKS.forEach(({ href }) => {
            const el = document.querySelector(href);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    /* ===========================
       Outside Click Close
    ============================ */
    useEffect(() => {
        if (!menuOpen) return;

        const outsideClick = (e) => {
            if (
                navRef.current &&
                !navRef.current.contains(e.target) &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(e.target)
            ) {
                setMenuOpen(false);
            }
        };

        const escapeKey = (e) => {
            if (e.key === "Escape") setMenuOpen(false);
        };

        document.addEventListener("mousedown", outsideClick);
        document.addEventListener("keydown", escapeKey);
        return () => {
            document.removeEventListener("mousedown", outsideClick);
            document.removeEventListener("keydown", escapeKey);
        };
    }, [menuOpen]);

    /* ===========================
       Body Scroll Lock
    ============================ */
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const toggleDark = () => setIsDark((d) => !d);
    const toggleMenu = () => setMenuOpen((o) => !o);
    const closeMenu = () => setMenuOpen(false);

    const navClass = [
        "navbar",
        scrolled ? "navbar--scrolled" : "",
        hidden ? "navbar--hidden" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <>
            <nav ref={navRef} className={navClass} aria-label="Main navigation">
                <div className="nav-container">

                    {/* Logo */}
                    <div className="logo">
                        Prime
                        <span>
                            Axis
                        </span>
                    </div>

                    {/* Desktop Links */}
                    <div className="navLink-container">
                        <ul className="nav-links">
                            {NAV_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className={`nav-link${activeSection === link.label ? " active" : ""}`}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Actions */}
                    <div className="nav-actions">

                        {/* Theme Toggle */}
                        <button
                            className="nav-icon-btn nav-theme-toggle"
                            onClick={toggleDark}
                            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                            title={isDark ? "Light mode" : "Dark mode"}
                        >
                            <span className="nav-theme-toggle__track" aria-hidden="true">
                                <span className="nav-theme-toggle__thumb">
                                    {isDark ? <IconSun /> : <IconMoon />}
                                </span>
                            </span>
                        </button>

                        {/* Hamburger */}
                        <button
                            className="nav-icon-btn nav-hamburger"
                            onClick={toggleMenu}
                            aria-label="Open menu"
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                        >
                            <IconMenu />
                        </button>

                    </div>
                </div>
            </nav>

            {/* Mobile Menu — Full Screen Overlay (outside <nav> to avoid animation transform containment) */}
            <div
                id="mobile-menu"
                ref={mobileMenuRef}
                className={`nav-mobile${menuOpen ? " nav-mobile--open" : ""}`}
                aria-hidden={!menuOpen}
            >
                <button
                    className="nav-mobile__close"
                    onClick={closeMenu}
                    aria-label="Close menu"
                >
                    <IconX />
                </button>

                <div className="nav-mobile__brand">
                    Prime<span>Axis</span>
                </div>

                <ul className="nav-mobile__links">
                    {NAV_LINKS.map((link, i) => (
                        <li
                            key={link.label}
                            className="nav-mobile__item"
                            style={{ "--_i": i }}
                        >
                            <a
                                href={link.href}
                                className="nav-link nav-mobile__link"
                                onClick={closeMenu}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}