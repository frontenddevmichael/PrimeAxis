import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Team", href: "#team" },
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

    // Apply / remove .dark on <html>
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

    // Hide on scroll-down, show on scroll-up
    useEffect(() => {
        const onScroll = () => {
            const current = window.scrollY;
            setScrolled(current > 50);
            if (current > lastScrollY.current && current > 80) {
                setHidden(true);
                setMenuOpen(false);
            } else {
                setHidden(false);
            }
            lastScrollY.current = current;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu on outside click
    useEffect(() => {
        if (!menuOpen) return;
        const handler = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [menuOpen]);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const toggleDark = () => setIsDark((d) => !d);
    const toggleMenu = () => setMenuOpen((o) => !o);
    const closeMenu = () => setMenuOpen(false);

    const navClass = [
        "navbar",
        scrolled ? "navbar--scrolled" : "",
        hidden ? "navbar--hidden" : "",
        menuOpen ? "navbar--open" : "",
    ].filter(Boolean).join(" ");

    return (
        <nav ref={navRef} className={navClass} aria-label="Main navigation">
            <div className="nav-container">

                {/* Logo */}
                <div className="logo">
                    <h2>Prime<span>Axis</span></h2>
                </div>

                {/* Centre pill — desktop only */}
                <div className="navLink-container glass">
                    <ul className="nav-links">
                        {NAV_LINKS.map((link) => (
                            <li key={link.label}>
                                <a href={link.href} className="nav-link">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button className="cta" aria-label="Contact us">
                        Contact us
                    </button>
                </div>

                {/* Right cluster — dark toggle + hamburger */}
                <div className="nav-actions">
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

                    <button
                        className="nav-icon-btn nav-hamburger"
                        onClick={toggleMenu}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                    >
                        <span className={`nav-hamburger__icon${menuOpen ? " nav-hamburger__icon--open" : ""}`}>
                            <IconMenu />
                        </span>
                        <span className={`nav-hamburger__icon nav-hamburger__icon--close${menuOpen ? " nav-hamburger__icon--open" : ""}`}>
                            <IconX />
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                id="mobile-menu"
                ref={mobileMenuRef}
                className={`nav-mobile${menuOpen ? " nav-mobile--open" : ""}`}
                aria-hidden={!menuOpen}
            >
                <ul className="nav-mobile__links">
                    {NAV_LINKS.map((link, i) => (
                        <li
                            key={link.label}
                            className="nav-mobile__item"
                            style={{ "--_item-delay": `${i * 0.06}s` }}
                        >

                           <a  href={link.href}
                            className="nav-link nav-mobile__link"
                            onClick={closeMenu}
                            >
                            {link.label}
                        </a>
                        </li>
                    ))}
            </ul>
            <div className="nav-mobile__cta">
                <button className="cta nav-mobile__cta-btn" onClick={closeMenu}>
                    Contact us
                </button>
            </div>
        </div>
        </nav >
    );
}