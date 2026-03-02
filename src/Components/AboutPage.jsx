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
                        We build technology that solves real business problems.
                    </blockquote>
                  
                </div>

                <div className="about__copy">
                    <p>
                        PrimeAxis is a technology-focused digital solutions company that builds
                        scalable systems for modern businesses and startups. We specialize in
                        transforming ideas into reliable, production-ready products through clean
                        engineering, strategic product thinking, and structured development processes.
                    </p>
                    <p>
                        Our approach goes beyond writing code — we design systems that automate
                        operations, improve efficiency, and support long-term growth. We combine
                        strong technical execution with thoughtful product design to deliver
                        solutions that are fast, maintainable, and built for scale.
                    </p>
                </div>
            </div>



            {/* ── Approach cards ── */}
            <div className="about__cards">
                {APPROACH.map((a, i) => (
                    <div
                        className="about__card"
                        key={a.num}
                        style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
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