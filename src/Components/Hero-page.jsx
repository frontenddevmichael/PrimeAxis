import { useEffect, useRef, useState } from "react";
import mockup from "../assets/mockup.png";

export default function HeroPage() {
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const heroRef = useRef(null);
    const rafId = useRef(null);

    /* ── Parallax tilt on mockup only — throttle via rAF ── */
    const handleMouseMove = (e) => {
        if (rafId.current !== null) return;
        rafId.current = requestAnimationFrame(() => {
            const rect = heroRef.current?.getBoundingClientRect();
            if (!rect) { rafId.current = null; return; }
            setMousePos({
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height,
            });
            rafId.current = null;
        });
    };

    const tiltStyle = {
        transform: `perspective(900px) rotateY(${(mousePos.x - 0.5) * -4}deg) rotateX(${(mousePos.y - 0.5) * 3}deg)`,
        transition: "transform 0.15s var(--ease-spring)",
    };

    /* ── Hide scroll hint after first viewport ── */
    useEffect(() => {
        const onScroll = () => {
            const hint = document.querySelector(".hero__scroll-hint");
            if (!hint) return;
            const past = window.scrollY > window.innerHeight * 0.8;
            hint.classList.toggle("hero__scroll-hint--hidden", past);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToContact = () => {
        const el = document.getElementById("Contact");
        if (window.lenis) window.lenis.scrollTo(el);
        else el.scrollIntoView({ behavior: "smooth" });
    }

    const scrollToServices = () => {
        const el = document.getElementById("Services")
        if (window.lenis) window.lenis.scrollTo(el);
        else el.scrollIntoView({ behavior: "smooth" });
    }
    return (
        <section
            className="hero"
            ref={heroRef}
            onMouseMove={handleMouseMove}
            id="Hero"
            data-reveal="fade-up"
        >
            {/* ── Background — single radial wash + dot grid ── */}
            <div className="hero__bg" aria-hidden="true">
                <div className="hero__bg-radial" data-depth="-0.15" />
                <div className="hero__bg-grid" />
            </div>

            {/* ── Two-column grid ── */}
            <div className="hero__inner">

                {/* ── LEFT: Copy ── */}
                <div className="hero__content">

                    <span className="hero__eyebrow">
                        <span className="hero__eyebrow-dot" />
                        Prime Axis
                    </span>

                    <h1 className="hero__heading">
                        Build Faster.<br />
                        Scale <em className="hero__heading-em">Smarter.</em>
                    </h1>

                    <p className="hero__body">
                        We build the systems that run your business — from polished
                        frontends to automated backends, from first deploy to production
                        at scale. You focus on growth; we handle the infrastructure.
                    </p>



                    <div className="hero__buttons">
                        <button className="btn btn--primary" onClick={scrollToServices} data-magnetic>
                            Explore Services
                        </button>
                        <button className="btn--contact" onClick={scrollToContact} data-magnetic>
                            Contact Us
                            <span className="btn__arrow" aria-hidden="true">↗</span>
                        </button>
                    </div>

                </div>

                {/* ── RIGHT: Visuals ── */}
                <div className="hero__visuals">

                    {/* Accent ring — single, static, CSS only */}
                    <div className="hero__ring" aria-hidden="true" data-depth="-0.25" />

                    {/* Mockup with parallax tilt */}
                    <div className="hero__mockup-wrap" style={tiltStyle}>
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