import { useEffect, useRef, useState } from "react";

/* ── Counter animation — counts from 0 to target on scroll in ── */
function CountUp({ target, suffix = "" }) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);
    const rafId = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStarted(true); },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started || isNaN(target)) return;
        let start = 0;
        const duration = 1200;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) rafId.current = requestAnimationFrame(step);
        };
        rafId.current = requestAnimationFrame(step);
        return () => { if (rafId.current !== null) cancelAnimationFrame(rafId.current); };
    }, [started, target]);

    return <span ref={ref} className="about__stat-num">{count}{suffix}</span>;
}

/* ── Inline SVG icons for approach cards ── */
const CARD_ICONS = {
    "01": (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="about__card-icon">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    ),
    "02": (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="about__card-icon">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    "03": (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="about__card-icon">
            <polyline points="1 17 7 11 11 15 17 9 23 15" />
            <polyline points="17 9 23 9 23 15" />
        </svg>
    ),
};

const APPROACH = [
    {
        num: "01",
        name: "Engineer First",
        desc: "We lead with strong technical foundations — clean architecture, reliable pipelines, and maintainable code.",
    },
    {
        num: "02",
        name: "Product Minded",
        desc: "Beyond writing code, we think deeply about what you're building, why it matters, and how users will experience it.",
    },
    {
        num: "03",
        name: "Built to Scale",
        desc: "From MVP to enterprise, our systems are designed to handle growth without costly rewrites.",
    },
];

export default function AboutPage() {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.12 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            className={`about${visible ? " about--visible" : ""}`}
            ref={sectionRef}
            id="About"
        >
            {/* Subtle background shape */}
            <div className="about__bg" aria-hidden="true">
                <div className="about__bg-shape" />
            </div>

            {/* ── Header rule ── */}
            <div className="about__header">
                <span className="about__rule" />
                <h2 className="about__title">Who We Are</h2>
                <span className="about__rule" />
            </div>

            {/* ── Two-column body ── */}
            <div className="about__body">
                <div className="about__pull">
                    <blockquote className="about__quote">
                        We've shipped production systems for startups stepping into enterprise — and every line of code was written by engineers who still review each other's pull requests.
                    </blockquote>
                  </div>

                <div className="about__copy">
                    <p>
                        PrimeAxis is a remote-first engineering studio that partners with
                        growing companies to design, build, and scale the systems their
                        business runs on. We don't template — we architect. Every project
                        is treated as a product, not a ticket.
                    </p>
                    <p>
                        Our approach goes beyond writing code — we design systems that automate
                        operations, improve efficiency, and support long-term growth. We combine
                        strong technical execution with thoughtful product design to deliver
                        solutions that are fast, maintainable, and built for scale.
                    </p>
                </div>
            </div>



            {/* ── Proof stats ── */}
            <div className="about__stats">
                <div className="about__stat" style={{ "--_stat-delay": "calc(var(--stagger-unit) * 1)" }}>
                    <CountUp target={50} suffix="+" />
                    <span className="about__stat-label">Projects Delivered</span>
                </div>
                <div className="about__stat" style={{ "--_stat-delay": "calc(var(--stagger-unit) * 2)" }}>
                    <CountUp target={6} />
                    <span className="about__stat-label">Team Members</span>
                </div>
                <div className="about__stat" style={{ "--_stat-delay": "calc(var(--stagger-unit) * 3)" }}>
                    <span className="about__stat-num">≤24hr</span>
                    <span className="about__stat-label">Response Time</span>
                </div>
            </div>

            {/* ── Approach cards ── */}
            <div className="about__cards">
                {APPROACH.map((a, i) => (
                    <div
                        className="about__card"
                        key={a.num}
                        style={{ transitionDelay: `calc(var(--stagger-unit) * ${i + 5})` }}
                    >
                        {CARD_ICONS[a.num]}
                        <span className="about__card-num">{a.num}</span>
                        <h3 className="about__card-name">{a.name}</h3>
                        <p className="about__card-desc">{a.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}