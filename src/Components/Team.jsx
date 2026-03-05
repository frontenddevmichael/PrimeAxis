import { useEffect, useRef, useState, useMemo, useCallback, memo } from "react";
import Michael from "../assets/Michael.jpeg";
import Grace from "../assets/Grace.jpeg";
import Ose from "../assets/Ose.jpeg";
import Omale from "../assets/Omale.jpeg";
import Tumise from "../assets/Tumise.jpeg";
import Ola from "../assets/Ola.jpeg"

const TEAM = [
    {
        id: "omale-michael",
        featured: true,
        name: "Omale Michael",
        role: "Software Developer",
        tag: "Team Lead",
        type: "engineering",
        signature: "If it can be built, it will be built right.",
        bio: "Architects the systems that power PrimeAxis. Obsessed with performance, clarity, and shipping things that last.",
        skills: ["System Architecture", "Frontend Engineering", "Product Strategy"],
        photo: Michael,
        linkedin: "#",
        github: "#",
    },
    {
        id: "grace-ufah",
        name: "Grace Ufah",
        role: "Graphic Designer",
        type: "design",
        signature: "A brand should be recognisable in a glance.",
        bio: "Shapes how PrimeAxis looks to the world — from first impressions to lasting identity.",
        skills: ["Brand Design", "Visual Identity", "Marketing Graphics"],
        photo: Grace,
        linkedin: "#",
    },
    {
        id: "omale-godswill",
        name: "Omale Godswill",
        role: "UI/UX Designer",
        type: "design",
        signature: "Good design removes the need to explain itself.",
        bio: "Bridges user needs and product goals through research-backed, intentional interface design.",
        skills: ["Figma", "UX Research", "Design Systems"],
        photo: Omale,
        linkedin: "#",
    },
    {
        id: "sopein-tummise",
        name: "Sopein Tummise",
        role: "Social Media Strategist",
        type: "marketing",
        signature: "Attention is earned, not bought.",
        bio: "Grows and sustains PrimeAxis's voice across platforms — turning content into community.",
        skills: ["Content Strategy", "Community Growth", "Brand Positioning"],
        photo: Tumise,
        linkedin: "#",
    },
    {
        id: "olakumbi",
        name: "Olakumbi",
        role: "Motion Designer",
        type: "design",
        signature: "Motion is the punctuation of good design.",
        bio: "Gives PrimeAxis's stories rhythm and weight through animation and dynamic visual narrative.",
        skills: ["Motion Graphics", "Animation", "Video Editing"],
        photo: Ola,
        linkedin: "#",
    },
    {
        id: "arekhanose-onosereme",
        name: "Arekhanose Onosereme",
        role: "Cloud & Database Engineer",
        type: "engineering",
        signature: "Infrastructure no one notices is infrastructure done well.",
        bio: "Keeps PrimeAxis running — quietly, reliably, and at scale. Owns the cloud and everything beneath it.",
        skills: ["Cloud Architecture", "Database Engineering", "DevOps"],
        photo: Ose,
        linkedin: "#",
        github: "#",
    },
];

// Memoized to prevent recreation
const IconLinkedIn = memo(function IconLinkedIn() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
        </svg>
    );
});

const IconGitHub = memo(function IconGitHub() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.135 20.167 22 16.411 22 12.017 22 6.484 17.522 2 12 2z" />
        </svg>
    );
});

// Memoized to prevent recreation when name doesn't change
const PhotoPlaceholder = memo(function PhotoPlaceholder({ name }) {
    const initials = useMemo(
        () => name.split(" ").map((w) => w[0]).join("").slice(0, 2),
        [name]
    );
    return (
        <div className="team__photo-placeholder" aria-label={`Photo of ${name}`}>
            <div className="team__photo-placeholder-ring" aria-hidden="true" />
            <span className="team__photo-initials">{initials}</span>
        </div>
    );
});

// Memoized to prevent unnecessary re-renders
const TeamCard = memo(function TeamCard({ member, index }) {
    const [hovered, setHovered] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
    const cardRef = useRef(null);
    const rafId = useRef(null);

    // Throttled mouse move using requestAnimationFrame
    const handleMouseMove = useCallback((e) => {
        // Cancel previous animation frame if it exists
        if (rafId.current !== null) return;

        rafId.current = requestAnimationFrame(() => {
            const rect = cardRef.current?.getBoundingClientRect();
            if (!rect) {
                rafId.current = null;
                return;
            }

            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            setSpotlightPos({ x: x * 100, y: y * 100 });
            setTilt({
                x: (y - 0.5) * -10,
                y: (x - 0.5) * 10,
            });

            rafId.current = null;
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
        // Cancel any pending animation frame
        if (rafId.current !== null) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }
    }, []);

    // Cleanup animation frame on unmount
    useEffect(() => {
        return () => {
            if (rafId.current !== null) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    return (
        <article
            ref={cardRef}
            className={[
                "team__card",
                `team__card--${member.type}`,
                member.featured ? "team__card--featured" : "",
                hovered ? "team__card--hovered" : "",
            ]
                .filter(Boolean)
                .join(" ")}
            style={{
                "--_stagger-delay": `${0.08 + index * 0.09}s`,
                "--_tilt-x": `${tilt.x}deg`,
                "--_tilt-y": `${tilt.y}deg`,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            aria-label={`${member.name}, ${member.role}`}
        >
            {/* Cursor-tracked spotlight */}
            <div
                className="team__card-spotlight"
                style={{
                    background: `radial-gradient(320px circle at ${spotlightPos.x}% ${spotlightPos.y}%, var(--_spotlight), transparent 65%)`,
                    opacity: hovered ? 1 : 0,
                }}
                aria-hidden="true"
            />

            {/* Discipline accent line */}
            <div className="team__card-accent-line" aria-hidden="true" />

            {/* Photo */}
            <div className="team__photo-wrap">
                {member.photo ? (
                    <img
                        src={member.photo}
                        alt={member.name}
                        className="team__photo"
                        loading="lazy"
                    />
                ) : (
                    <PhotoPlaceholder name={member.name} />
                )}

                {/* Shimmer sweep on hover */}
                <div className="team__photo-shimmer" aria-hidden="true" />

                {/* Gradient overlay that lifts on hover */}
                <div className="team__photo-overlay" aria-hidden="true" />

                {member.featured && (
                    <span className="team__founder-badge">{member.tag}</span>
                )}
            </div>

            {/* Card body */}
            <div className="team__card-body">
                <div className="team__identity">
                    <h3 className="team__name">{member.name}</h3>
                    <span className="team__role">{member.role}</span>
                </div>

                <p className="team__signature">{member.signature}</p>

                <div className="team__reveal">
                    <p className="team__bio">{member.bio}</p>
                    <div className="team__skills">
                        {member.skills.map((s, i) => (
                            <span
                                className="team__skill"
                                key={s}
                                style={{ "--_skill-delay": `${i * 0.07}s` }}
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="team__socials">
                    <a
                        href={member.linkedin}
                        className="team__social-link"
                        aria-label={`${member.name} on LinkedIn`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <IconLinkedIn />
                    </a>

                    {member.type === "engineering" && member.github && (
                        <a
                            href={member.github}
                            className="team__social-link"
                            aria-label={`${member.name} on GitHub`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <IconGitHub />
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
});

// Memoized to prevent unnecessary re-renders
const StatCounter = memo(function StatCounter({ target, suffix = "" }) {
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
        const duration = 1400;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
                rafId.current = requestAnimationFrame(step);
            }
        };
        rafId.current = requestAnimationFrame(step);

        // Cleanup function
        return () => {
            if (rafId.current !== null) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, [started, target]);

    const display = isNaN(target) ? suffix : `${String(count).padStart(2, "0")}${suffix}`;

    return <span ref={ref} className="team__stat-num">{display}</span>;
});

export default function TeamSection() {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.08 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Memoize stats to prevent recreation on every render
    const stats = useMemo(() => [
        { target: 6, suffix: "", label: "Team Members" },
        { target: 3, suffix: "", label: "Disciplines" },
        { target: 100, suffix: "%", label: "Remote-First" },
        { target: NaN, suffix: "∞", label: "Iterations Shipped" },
    ], []);

    return (
        <section
            className={`team${visible ? " team--visible" : ""}`}
            ref={sectionRef}
            id="Teams"
        >
            {/* Background */}
            <div className="team__bg" aria-hidden="true">
                <div className="team__bg-blob team__bg-blob--1" />
                <div className="team__bg-blob team__bg-blob--2" />
                <div className="team__bg-blob team__bg-blob--3" />
                <div className="team__bg-grid" />
            </div>

            {/* Header */}
            <div className="team__header">
                <span className="team__header-tag">The Team</span>
                <h2 className="team__title">
                    The people behind{" "}
                    <span className="team__title-accent">PrimeAxis</span>
                </h2>
                <p className="team__subtitle">
                    Six people. Three disciplines. One shared standard — build things
                    that are fast, considered, and built to last.
                </p>
            </div>

            {/* Stats bar */}
            <div className="team__stats-bar" aria-label="Team at a glance">
                {stats.map((stat, i) => (
                    <div
                        className="team__stat"
                        key={stat.label}
                        style={{ "--_stat-delay": `${0.3 + i * 0.08}s` }}
                    >
                        <StatCounter target={stat.target} suffix={stat.suffix} />
                        <span className="team__stat-label">{stat.label}</span>
                    </div>
                ))}
            </div>

            {/* Grid */}
            <div className="team__grid">
                {TEAM.map((member, i) => (
                    <TeamCard key={member.id} member={member} index={i} />
                ))}
            </div>
        </section>
    );
}
