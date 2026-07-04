import { useEffect, useRef, useState } from "react";




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
                <div className="about__stat">
                    <span className="about__stat-num">50+</span>
                    <span className="about__stat-label">Projects Delivered</span>
                </div>
                <div className="about__stat">
                    <span className="about__stat-num">6</span>
                    <span className="about__stat-label">Team Members</span>
                </div>
                <div className="about__stat">
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
                        <span className="about__card-num">{a.num}</span>
                        <h3 className="about__card-name">{a.name}</h3>
                        <p className="about__card-desc">{a.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}