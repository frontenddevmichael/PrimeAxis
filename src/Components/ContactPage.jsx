import { useEffect, useRef, useState } from "react";


/* ─── Constants ───────────────────────────────────────────── */
const PROJECT_TYPES = [
    "Website", "Web App", "Automation",
    "MVP", "Redesign", "Custom System",
];
const BUDGET_RANGES = ["$500 – $1,000", "$1,000 – $5,000", "$5,000+"];
const TIMELINES = ["ASAP", "1 – 2 months", "3 – 6 months", "6+ months", "Flexible"];

const PROCESS_STEPS = [
    { num: "01", title: "Brief", body: "Submit your project details and goals." },
    { num: "02", title: "Review", body: "We analyse and respond within 24 hours." },
    { num: "03", title: "Kickoff", body: "Aligned scope, timeline, and first deliverable set." },
];

const INITIAL_FORM = {
    name: "", email: "", company: "",
    projectType: "", budget: "", timeline: "", description: "",
};

/* ─── Validation ──────────────────────────────────────────── */
function validate(data) {
    const e = {};
    if (!data.name.trim()) e.name = "Full name is required";
    if (!data.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        e.email = "Enter a valid email address";
    if (!data.projectType) e.projectType = "Select a project type";
    if (!data.budget) e.budget = "Select a budget range";
    if (!data.description.trim()) e.description = "Project description is required";
    else if (data.description.trim().length < 20)
        e.description = "Please add more detail (min 20 chars)";
    return e;
}

/* ─── Sub-components ──────────────────────────────────────── */
function FieldError({ msg }) {
    if (!msg) return null;
    return <span className="cf__error" role="alert">{msg}</span>;
}

function SelectWrap({ children }) {
    return <div className="cf__select-wrap">{children}</div>;
}

function SuccessScreen({ onReset }) {
    return (
        <div className="cf__success">
            <div className="cf__success-mark" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="23" stroke="var(--accent-primary)" strokeWidth="1.5" />
                    <path d="M 14 24 L 21 31 L 34 17" stroke="var(--accent-primary)"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <h3 className="cf__success-title">Brief Received</h3>
            <p className="cf__success-body">
                Thanks for reaching out. We've logged your project and will
                be in touch within 24 hours with a focused plan.
            </p>
            <button className="cf__success-reset" onClick={onReset}>
                Submit another project ↗
            </button>
        </div>
    );
}

/* ─── Main Component ──────────────────────────────────────── */
export default function ContactSection() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle");
    const [apiError, setApiError] = useState("");
    const [visible, setVisible] = useState(false);

    const sectionRef = useRef(null);
    const submitting = useRef(false);

    /* Intersection observer reveal */
    useEffect(() => {
        const io = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.06 }
        );
        if (sectionRef.current) io.observe(sectionRef.current);
        return () => io.disconnect();
    }, []);

    const handleChange = (key) => (e) => {
        setForm(prev => ({ ...prev, [key]: e.target.value }));
        if (errors[key]) setErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting.current) return;
        const errs = validate(form);
        if (Object.keys(errs).length) { setErrors(errs); return; }

        submitting.current = true;
        setStatus("loading");
        setApiError("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name, email: form.email,
                    projectType: form.projectType, budget: form.budget,
                    description: form.description,
                    company: form.company || undefined,
                    timeline: form.timeline || undefined,
                }),
            });
            if (!res.ok) throw new Error(`Server error: ${res.status}`);
            setStatus("success");
            setForm(INITIAL_FORM);
        } catch (err) {
            setApiError(err.message || "Something went wrong. Please try again.");
            setStatus("error");
        } finally {
            submitting.current = false;
        }
    };

    const handleReset = () => {
        setStatus("idle"); setErrors({});
        setForm(INITIAL_FORM); setApiError("");
    };

    const cls = (base, key) => errors[key] ? `${base} ${base}--err` : base;

    return (
        <section
            className={`contact${visible ? " contact--visible" : ""}`}
            ref={sectionRef}
            id="Contact"
        >
            {/* ── Architectural SVG canvas — dark panel only ── */}
            <div className="contact__canvas" aria-hidden="true">
                <svg className="contact__canvas-svg" viewBox="0 0 560 720"
                    fill="none" preserveAspectRatio="xMidYMid slice">
                    {/* Large open circle — architectural anchor */}
                    <circle cx="280" cy="360" r="260"
                        stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                    <circle cx="280" cy="360" r="180"
                        stroke="rgba(255,255,255,0.05)" strokeWidth="0.8"
                        strokeDasharray="6 10">
                        <animateTransform attributeName="transform" type="rotate"
                            from="0 280 360" to="360 280 360" dur="40s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="280" cy="360" r="100"
                        stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" />
                    {/* Fine crosshatch grid — top quadrant */}
                    {Array.from({ length: 10 }, (_, i) => (
                        <line key={`h${i}`}
                            x1="0" y1={40 + i * 22} x2="560" y2={40 + i * 22}
                            stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                    ))}
                    {Array.from({ length: 14 }, (_, i) => (
                        <line key={`v${i}`}
                            x1={i * 40} y1="0" x2={i * 40} y2="260"
                            stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                    ))}
                    {/* Diagonal slash — editorial tension */}
                    <line x1="0" y1="540" x2="200" y2="720"
                        stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <line x1="30" y1="540" x2="230" y2="720"
                        stroke="rgba(255,255,255,0.03)" strokeWidth="0.6" />
                    {/* Corner dot cluster */}
                    {[0, 12, 24].map(ox => [0, 12, 24].map(oy => (
                        <circle key={`${ox}${oy}`}
                            cx={480 + ox} cy={60 + oy} r="1.5"
                            fill="rgba(255,255,255,0.12)" />
                    )))}
                    {/* Accent line — bottom trim */}
                    <line x1="48" y1="680" x2="260" y2="680"
                        stroke="rgba(196,122,255,0.25)" strokeWidth="1" />
                    <circle cx="48" cy="680" r="3"
                        fill="rgba(196,122,255,0.4)" />
                </svg>
            </div>

            <div className="contact__layout">

                {/* ── LEFT PANEL — dark brand purple ── */}
                <div className="contact__panel">

                    <div className="contact__panel-content">
                        <span className="contact__eyebrow">Start a Project</span>

                        <h2 className="contact__title">
                            Let's Build<br />
                            Something<br />
                            <em className="contact__title-em">Scalable.</em>
                        </h2>

                        <p className="contact__panel-body">
                            Tell us about your project and we'll respond with
                            a focused plan — no fluff, no generic proposals.
                        </p>

                        {/* Process timeline */}
                        <ol className="contact__process" aria-label="Our process">
                            {PROCESS_STEPS.map((step, i) => (
                                <li key={step.num} className="contact__step"
                                    style={{ transitionDelay: `${0.4 + i * 0.1}s` }}>
                                    <div className="contact__step-num">{step.num}</div>
                                    <div className="contact__step-body">
                                        <strong className="contact__step-title">{step.title}</strong>
                                        <span className="contact__step-desc">{step.body}</span>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        {/* Contact detail strip */}
                        <div className="contact__detail">
                            <span className="contact__detail-label">Response time</span>
                            <span className="contact__detail-value">Within 24 hours</span>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT PANEL — white form ── */}
                <div className="contact__form-panel">
                    {status === "success" ? (
                        <SuccessScreen onReset={handleReset} />
                    ) : (
                        <form className="contact__form" onSubmit={handleSubmit} noValidate>

                            <div className="contact__form-header">
                                <h3 className="contact__form-title">Project Brief</h3>
                                <p className="contact__form-sub">
                                    Fields marked <span className="cf__req-mark">*</span> are required.
                                </p>
                            </div>

                            {/* Required fields grid */}
                            <div className="cf__grid">

                                <div className="cf__field">
                                    <label className="cf__label" htmlFor="cf-name">
                                        Full Name <span className="cf__req-mark">*</span>
                                    </label>
                                    <input id="cf-name" className={cls("cf__input", "name")}
                                        type="text" placeholder="Jane Smith"
                                        value={form.name} onChange={handleChange("name")}
                                        autoComplete="name" />
                                    <FieldError msg={errors.name} />
                                </div>

                                <div className="cf__field">
                                    <label className="cf__label" htmlFor="cf-email">
                                        Email <span className="cf__req-mark">*</span>
                                    </label>
                                    <input id="cf-email" className={cls("cf__input", "email")}
                                        type="email" placeholder="jane@company.com"
                                        value={form.email} onChange={handleChange("email")}
                                        autoComplete="email" />
                                    <FieldError msg={errors.email} />
                                </div>

                                <div className="cf__field">
                                    <label className="cf__label" htmlFor="cf-type">
                                        Project Type <span className="cf__req-mark">*</span>
                                    </label>
                                    <SelectWrap>
                                        <select id="cf-type" className={cls("cf__select", "projectType")}
                                            value={form.projectType} onChange={handleChange("projectType")}>
                                            <option value="">Select type…</option>
                                            {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </SelectWrap>
                                    <FieldError msg={errors.projectType} />
                                </div>

                                <div className="cf__field">
                                    <label className="cf__label" htmlFor="cf-budget">
                                        Budget Range <span className="cf__req-mark">*</span>
                                    </label>
                                    <SelectWrap>
                                        <select id="cf-budget" className={cls("cf__select", "budget")}
                                            value={form.budget} onChange={handleChange("budget")}>
                                            <option value="">Select budget…</option>
                                            {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
                                        </select>
                                    </SelectWrap>
                                    <FieldError msg={errors.budget} />
                                </div>

                                <div className="cf__field cf__field--full">
                                    <label className="cf__label" htmlFor="cf-desc">
                                        Project Description <span className="cf__req-mark">*</span>
                                    </label>
                                    <textarea id="cf-desc" className={cls("cf__textarea", "description")}
                                        placeholder="Describe your project, goals, and any specific requirements…"
                                        value={form.description} onChange={handleChange("description")}
                                        rows={4} />
                                    <FieldError msg={errors.description} />
                                </div>

                            </div>

                            {/* Optional divider */}
                            <div className="cf__divider" aria-hidden="true">
                                <span className="cf__divider-line" />
                                <span className="cf__divider-label">Optional</span>
                                <span className="cf__divider-line" />
                            </div>

                            <div className="cf__grid">
                                <div className="cf__field">
                                    <label className="cf__label" htmlFor="cf-company">Company</label>
                                    <input id="cf-company" className="cf__input"
                                        type="text" placeholder="Acme Corp."
                                        value={form.company} onChange={handleChange("company")}
                                        autoComplete="organization" />
                                </div>

                                <div className="cf__field">
                                    <label className="cf__label" htmlFor="cf-timeline">Timeline</label>
                                    <SelectWrap>
                                        <select id="cf-timeline" className="cf__select"
                                            value={form.timeline} onChange={handleChange("timeline")}>
                                            <option value="">Select timeline…</option>
                                            {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </SelectWrap>
                                </div>
                            </div>

                            {/* API error */}
                            {status === "error" && apiError && (
                                <div className="cf__api-error" role="alert">⚠ {apiError}</div>
                            )}

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className={`cf__submit${status === "error" ? " cf__submit--err" : ""}`}
                            >
                                {status === "loading" ? (
                                    <><span className="cf__spinner" aria-hidden="true" />Sending…</>
                                ) : status === "error" ? (
                                    <>↺ Try Again</>
                                ) : (
                                    <>Send Project Brief <span className="cf__submit-arrow">↗</span></>
                                )}
                            </button>

                        </form>
                    )}
                </div>

            </div>
        </section>
    );
}