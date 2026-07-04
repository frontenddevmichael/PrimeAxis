import { useEffect, useRef, useState } from "react";

export default function CallBooking() {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const io = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        if (sectionRef.current) io.observe(sectionRef.current);
        return () => io.disconnect();
    }, []);

    return (
        <section
            className={`call-booking${visible ? " call-booking--visible" : ""}`}
            ref={sectionRef}
        >
            <div className="call-booking__inner">
                <span className="call-booking__tag">Free Consultation</span>
                <h2 className="call-booking__title">
                    Not ready to commit?<br />
                    <em>Let's talk first.</em>
                </h2>
                <p className="call-booking__desc">
                    No pressure, no pitch. Tell us what you're working on and we'll
                    tell you honestly if we can help — and how.
                </p>
                <a
                    className="btn btn--gradient call-booking__btn"
                    href="https://wa.me/2349164300395?text=Hello!%20I'd%20like%20to%20book%20a%20free%20consultation%20with%20PrimeAxis."
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic
                >
                    Book a Free Call <span className="btn__arrow" aria-hidden="true">↗</span>
                </a>
                <p className="call-booking__footnote">
                    Free 15-minute call. No credit card. No follow-up spam.
                </p>
            </div>
        </section>
    );
}