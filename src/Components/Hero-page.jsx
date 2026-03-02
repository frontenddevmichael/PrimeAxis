import { useEffect, useRef, useState } from "react";
import mockup from "../assets/mockup.png";

export default function HeroPage() {
    const [visible, setVisible] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const heroRef = useRef(null);
    const tiltRef = useRef(null);

    /* ── Trigger reveal ── */
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    /* ── Parallax tilt on mockup only ── */
    const handleMouseMove = (e) => {
        const rect = heroRef.current?.getBoundingClientRect();
        if (!rect) return;
        setMousePos({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        });
    };

    const tiltStyle = {
        transform: `perspective(900px) rotateY(${(mousePos.x - 0.5) * -8}deg) rotateX(${(mousePos.y - 0.5) * 5}deg)`,
        transition: "transform 0.08s linear",
    };

    return (
        <section
            className={`hero${visible ? " hero--visible" : ""}`}
            ref={heroRef}
            onMouseMove={handleMouseMove}
        >
            {/* ── Background — single radial wash + dot grid ── */}
            <div className="hero__bg" aria-hidden="true">
                <div className="hero__bg-radial" />
                <div className="hero__bg-grid" />
            </div>

            {/* ── Two-column grid ── */}
            <div className="hero__inner">

                {/* ── LEFT: Copy ── */}
                <div className="hero__content">

                    <span className="hero__eyebrow">
                        <span className="hero__eyebrow-dot" />
                        Primeaxis Digital
                    </span>

                    <h1 className="hero__heading">
                        Build Faster.<br />
                        Scale <em className="hero__heading-em">Smarter.</em>
                    </h1>

                    <p className="hero__body">
                        Cast your tech worries on us and focus on growing your business.
                        We handle infrastructure, development, and digital strategy —
                        so you can stay in your lane.
                    </p>



                    <div className="hero__buttons">
                        <button className="btn btn--primary">
                            Explore Services
                        </button>
                        <button className="btn btn--ghost">
                            Contact Us
                            <span className="btn__arrow" aria-hidden="true">↗</span>
                        </button>
                    </div>

                </div>

                {/* ── RIGHT: Visuals ── */}
                <div className="hero__visuals">

                    {/* Accent ring — single, static, CSS only */}
                    <div className="hero__ring" aria-hidden="true" />

                    {/* Mockup with parallax tilt */}
                    <div className="hero__mockup-wrap" style={tiltStyle} ref={tiltRef}>
                        <img
                            src={mockup}
                            alt="Product dashboard mockup"
                            className="hero__mockup"
                            draggable="false"
                        />
                    </div>

                </div>
            </div>

            {/* ── Scroll hint ── */}
            <div className="hero__scroll-hint" aria-hidden="true">
                <div className="hero__scroll-mouse">
                    <div className="hero__scroll-wheel" />
                </div>
                <span>Scroll</span>
            </div>
        </section>
    );
}