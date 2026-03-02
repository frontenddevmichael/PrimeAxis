import { useEffect, useRef, useState } from "react";


/* ─────────────────────────────────────────────────────────
   SVG GRAPHICS — brand-violet palette, light theme
───────────────────────────────────────────────────────── */

/** Terminal window — Custom Web & App Dev */
const DevGraphic = () => (
    <svg className="svc-tile__graphic" viewBox="0 0 200 128" fill="none" aria-hidden="true">
        {/* window shell — slightly tinted so it reads against white card */}
        <rect width="200" height="128" rx="10" fill="#f0ecfb" stroke="#d5c8f5" strokeWidth="1" />
        <rect width="200" height="26" rx="10" fill="#e8e0f8" />
        <rect y="16" width="200" height="10" fill="#e8e0f8" />
        {/* traffic lights */}
        <circle cx="15" cy="13" r="4" fill="#FF5F57" />
        <circle cx="28" cy="13" r="4" fill="#FEBC2E" />
        <circle cx="41" cy="13" r="4" fill="#28C840" />
        {/* address bar */}
        <rect x="56" y="7" width="96" height="12" rx="6" fill="#f8f5ff" stroke="#d5c8f5" strokeWidth="0.8" />
        <rect x="62" y="11" width="48" height="4" rx="2" fill="#c9baee" />
        {/* code lines — violet tokens */}
        <rect x="12" y="36" width="30" height="5" rx="2" fill="#6A00F4" fillOpacity="0.55" />
        <rect x="50" y="36" width="54" height="5" rx="2" fill="#9B00D9" fillOpacity="0.3" />
        <rect x="112" y="36" width="22" height="5" rx="2" fill="#8b82a7" fillOpacity="0.2" />
        <rect x="20" y="49" width="18" height="5" rx="2" fill="#9B00D9" fillOpacity="0.55" />
        <rect x="46" y="49" width="68" height="5" rx="2" fill="#8b82a7" fillOpacity="0.15" />
        <rect x="122" y="49" width="32" height="5" rx="2" fill="#6A00F4" fillOpacity="0.25" />
        <rect x="20" y="62" width="40" height="5" rx="2" fill="#8b82a7" fillOpacity="0.15" />
        <rect x="68" y="62" width="26" height="5" rx="2" fill="#6A00F4" fillOpacity="0.4" />
        <rect x="102" y="62" width="48" height="5" rx="2" fill="#8b82a7" fillOpacity="0.1" />
        <rect x="12" y="75" width="28" height="5" rx="2" fill="#9B00D9" fillOpacity="0.35" />
        <rect x="48" y="75" width="14" height="5" rx="2" fill="#8b82a7" fillOpacity="0.1" />
        <rect x="20" y="88" width="58" height="5" rx="2" fill="#6A00F4" fillOpacity="0.28" />
        <rect x="86" y="88" width="36" height="5" rx="2" fill="#8b82a7" fillOpacity="0.1" />
        <rect x="12" y="101" width="22" height="5" rx="2" fill="#6A00F4" fillOpacity="0.6" />
        <rect x="42" y="101" width="42" height="5" rx="2" fill="#9B00D9" fillOpacity="0.28" />
        <rect x="92" y="101" width="58" height="5" rx="2" fill="#8b82a7" fillOpacity="0.1" />
        {/* blinking cursor */}
        <rect x="12" y="114" width="7" height="8" rx="1.5" fill="#6A00F4" fillOpacity="0.7">
            <animate attributeName="opacity" values="0.7;0.05;0.7" dur="1.1s" repeatCount="indefinite" />
        </rect>
    </svg>
);

/** Launch arc — Digital Product Dev */
const ProductGraphic = () => (
    <svg className="svc-tile__graphic" viewBox="0 0 150 190" fill="none" aria-hidden="true">
        {/* dashed guide path */}
        <path d="M 18 172 Q 75 86 132 12" stroke="#c9baee" strokeWidth="1.2" strokeDasharray="4 5" />
        {/* animated purple streak */}
        <path d="M 18 172 Q 75 86 132 12" stroke="#6A00F4" strokeWidth="2" strokeDasharray="58 220" strokeOpacity="0.5">
            <animate attributeName="stroke-dashoffset" values="0;-278" dur="2.6s" repeatCount="indefinite" />
        </path>
        {/* milestone circles */}
        <circle cx="18" cy="172" r="5" fill="#ede5fb" stroke="#c9baee" strokeWidth="1.4" />
        <circle cx="54" cy="122" r="4.5" fill="#ede5fb" stroke="#9B00D9" strokeWidth="1.4" strokeOpacity="0.55" />
        <circle cx="93" cy="68" r="4.5" fill="#ede5fb" stroke="#6A00F4" strokeWidth="1.4" strokeOpacity="0.7" />
        {/* launch pulse */}
        <circle cx="132" cy="12" r="7" fill="#ede5fb" stroke="#6A00F4" strokeWidth="1.5">
            <animate attributeName="r" values="7;12;7" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.25;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="132" cy="12" r="3.5" fill="#6A00F4" fillOpacity="0.7" />
        {/* stage labels */}
        <text x="26" y="176" fill="#8b82a7" fontSize="7.5" fontFamily="monospace" fillOpacity="0.8">CONCEPT</text>
        <text x="60" y="117" fill="#9B00D9" fontSize="7.5" fontFamily="monospace" fillOpacity="0.9">MVP</text>
        <text x="98" y="63" fill="#6A00F4" fontSize="7.5" fontFamily="monospace">BUILD</text>
        <text x="104" y="33" fill="#6A00F4" fontSize="7.5" fontFamily="monospace">LAUNCH ↗</text>
    </svg>
);

/** Before → After browser — Redesign */
const RedesignGraphic = () => (
    <svg className="svc-tile__graphic" viewBox="0 0 274 92" fill="none" aria-hidden="true">
        {/* ── BEFORE ── */}
        <rect width="114" height="92" rx="7" fill="#f0ecfb" stroke="#c9baee" strokeWidth="1" />
        <rect width="114" height="22" rx="7" fill="#e4dcf7" />
        <rect y="15" width="114" height="7" fill="#e4dcf7" />
        <circle cx="11" cy="11" r="3.2" fill="#8b82a7" fillOpacity="0.4" />
        <circle cx="21" cy="11" r="3.2" fill="#8b82a7" fillOpacity="0.4" />
        <circle cx="31" cy="11" r="3.2" fill="#8b82a7" fillOpacity="0.4" />
        <rect x="8" y="28" width="98" height="7" rx="2" fill="#8b82a7" fillOpacity="0.2" />
        <rect x="8" y="41" width="68" height="5" rx="2" fill="#8b82a7" fillOpacity="0.14" />
        <rect x="8" y="52" width="82" height="5" rx="2" fill="#8b82a7" fillOpacity="0.14" />
        <rect x="8" y="63" width="50" height="5" rx="2" fill="#8b82a7" fillOpacity="0.14" />
        <rect x="8" y="76" width="28" height="10" rx="3" fill="#8b82a7" fillOpacity="0.18" />
        <text x="57" y="6" fill="#8b82a7" fontSize="7" fontFamily="monospace" textAnchor="middle" fillOpacity="0.65">BEFORE</text>

        {/* ── ARROW ── */}
        <g transform="translate(124, 36)">
            <line x1="0" y1="10" x2="22" y2="10" stroke="#6A00F4" strokeWidth="1.5" strokeOpacity="0.55" />
            <path d="M 15 4 L 24 10 L 15 16" stroke="#6A00F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.55" />
        </g>

        {/* ── AFTER ── */}
        <rect x="156" width="118" height="92" rx="7" fill="#faf8ff" stroke="#6A00F4" strokeWidth="1" strokeOpacity="0.4" />
        <rect x="156" width="118" height="22" rx="7" fill="#ede5fb" />
        <rect x="156" y="15" width="118" height="7" fill="#ede5fb" />
        <circle cx="167" cy="11" r="3.2" fill="#FF5F57" />
        <circle cx="177" cy="11" r="3.2" fill="#FEBC2E" />
        <circle cx="187" cy="11" r="3.2" fill="#28C840" />
        <rect x="196" y="6" width="70" height="10" rx="5" fill="white" stroke="#c9baee" strokeWidth="0.8" />
        {/* hero block */}
        <rect x="164" y="28" width="102" height="26" rx="4" fill="#ede5fb" stroke="#c9baee" strokeWidth="0.6" />
        <rect x="172" y="34" width="44" height="6" rx="2" fill="#6A00F4" fillOpacity="0.6" />
        <rect x="172" y="43" width="28" height="4" rx="2" fill="#8b82a7" fillOpacity="0.3" />
        <rect x="232" y="31" width="26" height="18" rx="4" fill="#6A00F4" fillOpacity="0.25" />
        {/* content blocks */}
        <rect x="164" y="60" width="30" height="12" rx="3" fill="#9B00D9" fillOpacity="0.15" />
        <rect x="200" y="60" width="30" height="12" rx="3" fill="#6A00F4" fillOpacity="0.12" />
        <rect x="236" y="60" width="30" height="12" rx="3" fill="#ede5fb" stroke="#c9baee" strokeWidth="0.5" />
        <rect x="164" y="78" width="60" height="4" rx="2" fill="#8b82a7" fillOpacity="0.15" />
        <text x="215" y="6" fill="#6A00F4" fontSize="7" fontFamily="monospace" textAnchor="middle" fillOpacity="0.75">AFTER</text>
    </svg>
);

/** Wireframe → UI — UX Design */
const UXGraphic = () => (
    <svg className="svc-tile__graphic" viewBox="0 0 270 92" fill="none" aria-hidden="true">
        {/* ── WIREFRAME ── */}
        <rect width="118" height="92" rx="7" fill="#f0ecfb" stroke="#c9baee" strokeWidth="1" />
        <rect x="6" y="6" width="106" height="20" rx="3" fill="none" stroke="#c9baee" strokeWidth="1" strokeDasharray="3 3" />
        <rect x="6" y="32" width="48" height="54" rx="3" fill="none" stroke="#c9baee" strokeWidth="1" strokeDasharray="3 3" />
        <rect x="60" y="32" width="58" height="24" rx="3" fill="none" stroke="#c9baee" strokeWidth="1" strokeDasharray="3 3" />
        <rect x="60" y="62" width="58" height="24" rx="3" fill="none" stroke="#c9baee" strokeWidth="1" strokeDasharray="3 3" />
        {/* cursor */}
        <g transform="translate(46, 38)">
            <path d="M 0 0 L 0 16 L 4 12 L 7.5 19 L 10 17.5 L 6.5 10.5 L 12 10.5 Z" fill="#9B00D9" fillOpacity="0.75" />
            <circle cx="0" cy="0" r="9" fill="#6A00F4" fillOpacity="0.08" stroke="#6A00F4" strokeWidth="0.8" strokeOpacity="0.3">
                <animate attributeName="r" values="9;14;9" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0;1" dur="2.2s" repeatCount="indefinite" />
            </circle>
        </g>

        {/* ── ARROW ── */}
        <g transform="translate(128, 36)">
            <line x1="0" y1="10" x2="10" y2="10" stroke="#6A00F4" strokeWidth="1.5" strokeOpacity="0.5" />
            <path d="M 4 4 L 13 10 L 4 16" stroke="#6A00F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.5" />
        </g>

        {/* ── FINAL UI ── */}
        <rect x="152" width="118" height="92" rx="7" fill="#faf8ff" stroke="#6A00F4" strokeWidth="1" strokeOpacity="0.35" />
        {/* nav */}
        <rect x="152" width="118" height="20" rx="7" fill="#ede5fb" />
        <rect x="152" y="13" width="118" height="7" fill="#ede5fb" />
        <rect x="160" y="6" width="28" height="8" rx="4" fill="#6A00F4" fillOpacity="0.35" />
        <rect x="220" y="8" width="42" height="5" rx="2" fill="#8b82a7" fillOpacity="0.25" />
        {/* hero */}
        <rect x="160" y="26" width="102" height="30" rx="4" fill="#ede5fb" />
        <rect x="168" y="32" width="50" height="7" rx="2" fill="#6A00F4" fillOpacity="0.55" />
        <rect x="168" y="43" width="34" height="5" rx="2" fill="#8b82a7" fillOpacity="0.28" />
        <rect x="224" y="28" width="32" height="26" rx="4" fill="#9B00D9" fillOpacity="0.22" />
        {/* cards */}
        <rect x="160" y="62" width="30" height="22" rx="3" fill="#ede5fb" stroke="#c9baee" strokeWidth="0.6" />
        <rect x="164" y="67" width="22" height="4" rx="1" fill="#6A00F4" fillOpacity="0.45" />
        <rect x="164" y="74" width="16" height="3" rx="1" fill="#8b82a7" fillOpacity="0.25" />
        <rect x="196" y="62" width="30" height="22" rx="3" fill="#ede5fb" stroke="#c9baee" strokeWidth="0.6" />
        <rect x="200" y="67" width="22" height="4" rx="1" fill="#9B00D9" fillOpacity="0.4" />
        <rect x="200" y="74" width="16" height="3" rx="1" fill="#8b82a7" fillOpacity="0.25" />
        <rect x="232" y="62" width="30" height="22" rx="3" fill="#ede5fb" stroke="#c9baee" strokeWidth="0.6" />
        <rect x="236" y="67" width="22" height="4" rx="1" fill="#6A00F4" fillOpacity="0.35" />
        <rect x="236" y="74" width="16" height="3" rx="1" fill="#8b82a7" fillOpacity="0.25" />
    </svg>
);

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */

const SERVICES = {
    dev: {
        num: "01",
        tag: "Core Offering",
        title: "Custom Web & Application Development",
        desc: "We build the digital infrastructure your business runs on — from polished marketing sites to complex web apps and internal tooling.",
        bullets: [
            "Business websites & landing pages",
            "Web applications & SaaS platforms",
            "Internal tools & admin dashboards",
            "API integrations & backend systems",
        ],
    },
    product: {
        num: "03",
        tag: "For Founders",
        title: "Digital Product Development",
        desc: "Idea to shipped product. We architect, build, and launch MVPs that are ready to grow from day one.",
        bullets: [
            "Concept to MVP in weeks",
            "Product architecture & planning",
            "Scalable SaaS prototypes",
            "Production-ready delivery",
        ],
    },
    redesign: {
        num: "04",
        tag: "Performance",
        title: "Redesign & Performance Optimisation",
        desc: "Slow, outdated, underperforming sites rebuilt into fast, modern, conversion-focused experiences.",
        points: ["UI modernisation", "Core Web Vitals", "SEO structure", "Mobile responsiveness"],
    },
    uiux: {
        num: "05",
        tag: "Strategy",
        title: "UI/UX Design & Product Strategy",
        desc: "We think before we build. Interface design and journey mapping that keeps products purposeful.",
        points: ["Interface design", "Prototyping", "User journey mapping", "Feature structuring"],
    },
};

/* ─────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────── */

export default function ServicesPage() {
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const io = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.06 }
        );
        if (sectionRef.current) io.observe(sectionRef.current);
        return () => io.disconnect();
    }, []);

    const hover = (id) => () => setHovered(id);
    const leave = () => setHovered(null);

    return (
        <section
            className={`services${visible ? " services--visible" : ""}`}
            ref={sectionRef}
        >
            {/* subtle dot-grid atmosphere */}
            <div className="services__bg" aria-hidden="true">
                <div className="services__bg-grid" />
            </div>

            <div className="services__inner">

                {/* ── HEADER ── */}
                <header className="services__header">
                    <h2 className="services__title">
                        Services Built for <em>Real Growth</em>
                    </h2>
                    <p className="services__subtitle">
                        Four focused capabilities. One team that ships.
                    </p>
                </header>

                {/* ── BENTO GRID ── */}
                <div className="svc-bento">

                    {/* ── TILE 01 — Dev (hero, wide) ── */}
                    <article
                        className={`svc-tile svc-tile--dev${hovered === "dev" ? " svc-tile--hovered" : ""}`}
                        onMouseEnter={hover("dev")}
                        onMouseLeave={leave}
                    >
                        <div className="svc-tile__inner">
                            <div className="svc-tile__meta">
                                <span className="svc-tile__tag">{SERVICES.dev.tag}</span>
                                <span className="svc-tile__num">{SERVICES.dev.num}</span>
                            </div>
                            <h3 className="svc-tile__title">{SERVICES.dev.title}</h3>
                            <p className="svc-tile__desc">{SERVICES.dev.desc}</p>
                            <ul className="svc-tile__bullets">
                                {SERVICES.dev.bullets.map((b) => (
                                    <li key={b} className="svc-tile__bullet">
                                        <span className="svc-tile__bullet-mark" aria-hidden="true" />
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="svc-tile__graphic-wrap">
                            <DevGraphic />
                        </div>
                        <div className="svc-tile__corner-strip">
                            <span>WEB</span><span className="svc-tile__dot" />
                            <span>APP</span><span className="svc-tile__dot" />
                            <span>API</span>
                        </div>
                    </article>

                    {/* ── TILE 03 — Product (tall) ── */}
                    <article
                        className={`svc-tile svc-tile--product${hovered === "product" ? " svc-tile--hovered" : ""}`}
                        onMouseEnter={hover("product")}
                        onMouseLeave={leave}
                    >
                        <div className="svc-tile__inner">
                            <div className="svc-tile__meta">
                                <span className="svc-tile__tag svc-tile__tag--secondary">{SERVICES.product.tag}</span>
                                <span className="svc-tile__num">{SERVICES.product.num}</span>
                            </div>
                            <h3 className="svc-tile__title">{SERVICES.product.title}</h3>
                            <p className="svc-tile__desc">{SERVICES.product.desc}</p>
                            <ul className="svc-tile__bullets">
                                {SERVICES.product.bullets.map((b) => (
                                    <li key={b} className="svc-tile__bullet svc-tile__bullet--secondary">
                                        <span className="svc-tile__bullet-mark svc-tile__bullet-mark--secondary" aria-hidden="true" />
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="svc-tile__graphic-wrap svc-tile__graphic-wrap--product">
                            <ProductGraphic />
                        </div>
                        {/* stat badge */}
                    </article>

                    {/* ── STAT TILE — pure typographic accent ── */}
                    <div className="svc-tile svc-tile--stat" aria-hidden="true">
                        <div className="svc-stat__rings">
                            <svg viewBox="0 0 140 140" fill="none" className="svc-stat__svg">
                                <circle cx="70" cy="70" r="62" stroke="#c9baee" strokeWidth="1" strokeDasharray="3 6" />
                                <circle cx="70" cy="70" r="44" stroke="#c9baee" strokeWidth="0.8" strokeDasharray="2 5" />
                                <circle cx="70" cy="70" r="26" fill="#ede5fb" stroke="#c9baee" strokeWidth="0.8" />
                                <circle cx="70" cy="70" r="9" fill="#6A00F4" fillOpacity="0.2" stroke="#6A00F4" strokeWidth="1" strokeOpacity="0.5" />
                            </svg>
                        </div>
                        <div className="svc-stat__body">
                            <p className="svc-stat__num">04</p>
                            <p className="svc-stat__word">Services</p>
                            <hr className="svc-stat__rule" />
                            <p className="svc-stat__sub">One team.<br />All of it.</p>
                        </div>
                    </div>

                    {/* ── TILE 04 — Redesign (wide, second row) ── */}
                    <article
                        className={`svc-tile svc-tile--redesign${hovered === "redesign" ? " svc-tile--hovered" : ""}`}
                        onMouseEnter={hover("redesign")}
                        onMouseLeave={leave}
                    >
                        <div className="svc-tile__inner svc-tile__inner--row">
                            <div className="svc-tile__text-col">
                                <div className="svc-tile__meta">
                                    <span className="svc-tile__tag">{SERVICES.redesign.tag}</span>
                                    <span className="svc-tile__num">{SERVICES.redesign.num}</span>
                                </div>
                                <h3 className="svc-tile__title svc-tile__title--sm">{SERVICES.redesign.title}</h3>
                                <p className="svc-tile__desc svc-tile__desc--sm">{SERVICES.redesign.desc}</p>
                                <div className="svc-tile__chips">
                                    {SERVICES.redesign.points.map((p) => (
                                        <span key={p} className="svc-tile__chip">{p}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="svc-tile__graphic-wrap svc-tile__graphic-wrap--side">
                                <RedesignGraphic />
                            </div>
                        </div>
                    </article>

                    {/* ── TILE 05 — UX ── */}
                    <article
                        className={`svc-tile svc-tile--uiux${hovered === "uiux" ? " svc-tile--hovered" : ""}`}
                        onMouseEnter={hover("uiux")}
                        onMouseLeave={leave}
                    >
                        <div className="svc-tile__inner svc-tile__inner--row">
                            <div className="svc-tile__text-col">
                                <div className="svc-tile__meta">
                                    <span className="svc-tile__tag svc-tile__tag--secondary">{SERVICES.uiux.tag}</span>
                                    <span className="svc-tile__num">{SERVICES.uiux.num}</span>
                                </div>
                                <h3 className="svc-tile__title svc-tile__title--sm">{SERVICES.uiux.title}</h3>
                                <p className="svc-tile__desc svc-tile__desc--sm">{SERVICES.uiux.desc}</p>
                                <div className="svc-tile__chips">
                                    {SERVICES.uiux.points.map((p) => (
                                        <span key={p} className="svc-tile__chip svc-tile__chip--secondary">{p}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="svc-tile__graphic-wrap svc-tile__graphic-wrap--side">
                                <UXGraphic />
                            </div>
                        </div>
                    </article>

                    {/* ── CTA TILE — full width ── */}
                    <div className="svc-tile svc-tile--cta">
                        {/* decorative sine waves */}
                        <svg className="svc-cta__deco" viewBox="0 0 900 130" preserveAspectRatio="none" fill="none" aria-hidden="true">
                            <path d="M0 65 Q225 20 450 65 Q675 110 900 65" stroke="#6A00F4" strokeWidth="1.2" strokeOpacity="0.1" />
                            <path d="M0 65 Q225 110 450 65 Q675 20 900 65" stroke="#9B00D9" strokeWidth="1" strokeOpacity="0.07" />
                            <path d="M0 45 Q225 0 450 45 Q675 90 900 45" stroke="#6A00F4" strokeWidth="0.8" strokeOpacity="0.06" />
                        </svg>
                        <div className="svc-cta__inner">
                            <div className="svc-cta__text">
                                <p className="svc-cta__mono">// let's build something</p>
                                <h3 className="svc-cta__heading">Not sure which service fits?</h3>
                                <p className="svc-cta__sub">Tell us what you're trying to build. We'll figure out the rest.</p>
                            </div>
                            <div className="svc-cta__actions">
                                <button className="btn btn--gradient">Start a Project</button>
                                <button className="btn btn--outline">Book a Free Call</button>
                            </div>
                        </div>
                    </div>

                </div>{/* /svc-bento */}
            </div>{/* /services__inner */}
        </section>
    );
}