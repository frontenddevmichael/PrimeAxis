

import { useEffect, useRef, useState } from "react";


/* ─── Navigation data ─────────────────────────────────────── */
const NAV = [
    {
        heading: "Services",
        links: [
            { label: "Web Development", href: "#Services" },
            { label: "Digital Products", href: "#Services" },
            { label: "UI / UX Design", href: "#Services" },
            { label: "Redesign & Perf.", href: "#Services" },
        ],
    },
    {
        heading: "Company",
        links: [
            { label: "About Us", href: "#About" },
            { label: "Our Work", href: "#Services" },
            { label: "The team", href: "#Teams" },
            { label: "Contact", href: "#Contact" },
        ],
    },
    {
        heading: "Connect",
        links: [
            { label: "Twitter / X", href: "#twitter" },
            { label: "LinkedIn", href: "#linkedin" },
            { label: "Facebook", href: "#facebook" },
            { label: "Instagram", href: "#instagram" },
        ],
    },
];

/* ─── Back to top ─────────────────────────────────────────── */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ─── Component ───────────────────────────────────────────── */
export default function FooterSection() {
    const [visible, setVisible] = useState(false);
    const footerRef = useRef(null);

    useEffect(() => {
        const io = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.05 }
        );
        if (footerRef.current) io.observe(footerRef.current);
        return () => io.disconnect();
    }, []);

    const year = new Date().getFullYear();

    return (
        <footer
            className={`footer${visible ? " footer--visible" : ""}`}
            ref={footerRef}
        >
            {/* CONTENT-AUDIT: add real email address (e.g. hello@primeaxis.tech)
               and real social profile URLs when available. Current hrefs are placeholders. */}

            {/* ════════════════════════════════════════
          ZONE 1 — Upper: tagline + nav columns
      ════════════════════════════════════════ */}
            <div className="footer__upper">

                {/* Left — brand statement */}
                <div className="footer__brand">
                    <div className="footer__brand-mark">
                        <span className="footer__brand-status">PRIMEAXIS TECHNOLOGIES</span>
                    </div>

                    <p className="footer__tagline">
                        Technology that<br />
                        <em className="footer__tagline-em">moves with you.</em>
                    </p>

                    <p className="footer__brand-body">
                        From idea to infrastructure —<br />we build the digital
                        foundations<br />growing companies stand on.
                    </p>

                    <a href="#Contact" className="footer__cta">
                        Start a Project
                        <span className="footer__cta-arrow" aria-hidden="true">↗</span>
                    </a>
                </div>

                {/* Right — nav columns */}
                <nav className="footer__nav" aria-label="Footer navigation">
                    {NAV.map((col, ci) => (
                        <div key={col.heading} className="footer__nav-col"
                            style={{ "--_col-delay": `calc(var(--stagger-unit) * ${ci + 2})` }}>
                            <h3 className="footer__nav-heading">{col.heading}</h3>
                            <ul className="footer__nav-list">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} className="footer__nav-link">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>

            </div>

            {/* ════════════════════════════════════════
          ZONE 2 — Oversized wordmark canvas
      ════════════════════════════════════════ */}
            <div className="footer__wordmark-wrap" aria-hidden="true">
                {/* SVG text so we can use stroke without font-outline hacks */}
                <svg
                    className="footer__wordmark-svg"
                    viewBox="0 0 1200 160"
                    fill="none"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <text
                        x="50%"
                        y="138"
                        textAnchor="middle"
                        className="footer__wordmark-text"
                        fill="none"
                        stroke="rgba(255,255,255,0.07)"
                        strokeWidth="1.2"
                        fontFamily="'Playfair Display', Georgia, serif"
                        fontWeight="900"
                        fontSize="148"
                        letterSpacing="-4"
                    >
                        PRIM AXIS
                    </text>
                    {/* Subtle gradient-filled version layered behind for glow depth */}
                    <text
                        x="50%"
                        y="138"
                        textAnchor="middle"
                        className="footer__wordmark-text"
                        fill="url(#wordmark-gradient)"
                        fillOpacity="0.04"
                        fontFamily="'Playfair Display', Georgia, serif"
                        fontWeight="900"
                        fontSize="148"
                        letterSpacing="-4"
                    >
                        PRIM AXIS
                    </text>
                    <defs>
                        <linearGradient id="wordmark-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#c9a8ff" />
                            <stop offset="50%" stopColor="#ffffff" />
                            <stop offset="100%" stopColor="#c9a8ff" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* ════════════════════════════════════════
          ZONE 3 — Bottom bar
      ════════════════════════════════════════ */}
            <div className="footer__bar">
                <p className="footer__copyright">
                    © {year} Prime Axis. All rights reserved.
                </p>

                <div className="footer__bar-center">
                    <span className="footer__bar-sep" aria-hidden="true" />
                    <span className="footer__bar-tagline">
                        Built with precision. Delivered with purpose.
                    </span>
                    <span className="footer__bar-sep" aria-hidden="true" />
                </div>

                <button
                    className="footer__back-top"
                    onClick={scrollToTop}
                    aria-label="Back to top"
                >
                    Back to top
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                        aria-hidden="true" className="footer__back-top-icon">
                        <path d="M7 11V3M3 7l4-4 4 4"
                            stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

        </footer>
    );
}