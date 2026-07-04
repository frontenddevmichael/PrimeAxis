import { useEffect, useRef, useState, useCallback } from "react";

/* ─── WhatsApp Config ──────────────────────────────────────── */
const WHATSAPP_PROJECT = "2349061712509";

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

const STEP_LABELS = ["Your Info", "Project", "Review"];

/* ─── Validation per step ─────────────────────────────────── */
function validateStep(step, data) {
    const e = {};
    if (step === 0) {
        if (!data.name.trim()) e.name = "Full name is required";
        if (!data.email.trim()) e.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
            e.email = "Enter a valid email address";
    }
    if (step === 1) {
        if (!data.projectType) e.projectType = "Select a project type";
        if (!data.budget) e.budget = "Select a budget range";
        if (!data.description.trim()) e.description = "Project description is required";
        else if (data.description.trim().length < 20)
            e.description = "Please add more detail (min 20 chars)";
    }
    return e;
}

/* ─── Sub-components ──────────────────────────────────────── */
function FieldError({ msg, id }) {
    if (!msg) return null;
    return <span id={id} className="cf__error" role="alert">{msg}</span>;
}

function SelectWrap({ children }) {
    return <div className="cf__select-wrap">{children}</div>;
}

function SuccessScreen({ onReset }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 50);
        return () => clearTimeout(t);
    }, []);
    return (
        <div className={`cf__success${visible ? " cf__success--visible" : ""}`} role="status" aria-live="polite">
            <div className="cf__success-mark" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="23" stroke="var(--accent-primary)" strokeWidth="1.5" />
                    <path d="M 14 24 L 21 31 L 34 17" stroke="var(--accent-primary)"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <h3 className="cf__success-title">Brief Sent via WhatsApp</h3>
            <p className="cf__success-body">
                Thanks for reaching out. WhatsApp should now be open with your
                message ready — just hit send. We'll respond within 24 hours
                with a focused plan.
            </p>
            <button className="cf__success-reset" onClick={onReset} data-magnetic>
                Submit another project ↗
            </button>
        </div>
    );
}

function StepDot({ index, active, completed, label, onClick }) {
    let cls = "cf-step__dot";
    if (completed) cls += " cf-step__dot--done";
    if (active) cls += " cf-step__dot--active";
    return (
        <button type="button" className={cls} onClick={onClick} aria-current={active ? "step" : undefined}
            aria-label={`Step ${index + 1}: ${label}${completed ? " (completed)" : ""}`}>
            <span className="cf-step__dot-circle">
                {completed ? (
                    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
                        <path d="M 2 6 L 5 9 L 10 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <span>{index + 1}</span>
                )}
            </span>
            <span className="cf-step__dot-label">{label}</span>
        </button>
    );
}

/* ─── Step 1: Your Info ───────────────────────────────────── */
function StepInfo({ form, errors, handleChange, cls }) {
    return (
        <div className="cf__grid">
            <div className="cf__field">
                <label className="cf__label" htmlFor="cf-name">
                    Full Name <span className="cf__req-mark">*</span>
                </label>
                <input id="cf-name" className={cls("cf__input", "name")}
                    type="text" placeholder="Jane Smith"
                    value={form.name} onChange={handleChange("name")}
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "cf-name-error" : undefined} />
                <FieldError msg={errors.name} id="cf-name-error" />
            </div>

            <div className="cf__field">
                <label className="cf__label" htmlFor="cf-email">
                    Email <span className="cf__req-mark">*</span>
                </label>
                <input id="cf-email" className={cls("cf__input", "email")}
                    type="email" placeholder="jane@company.com"
                    value={form.email} onChange={handleChange("email")}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "cf-email-error" : undefined} />
                <FieldError msg={errors.email} id="cf-email-error" />
            </div>

            <div className="cf__field">
                <label className="cf__label" htmlFor="cf-company">Company</label>
                <input id="cf-company" className="cf__input"
                    type="text" placeholder="Acme Corp."
                    value={form.company} onChange={handleChange("company")}
                    autoComplete="organization" />
            </div>
        </div>
    );
}

/* ─── Step 2: Project Details ─────────────────────────────── */
function StepProject({ form, errors, handleChange, cls }) {
    return (
        <div className="cf__grid">
            <div className="cf__field">
                <label className="cf__label" htmlFor="cf-type">
                    Project Type <span className="cf__req-mark">*</span>
                </label>
                <SelectWrap>
                    <select id="cf-type" className={cls("cf__select", "projectType")}
                        value={form.projectType} onChange={handleChange("projectType")}
                        aria-invalid={!!errors.projectType}
                        aria-describedby={errors.projectType ? "cf-projectType-error" : undefined}>
                        <option value="">Select type…</option>
                        {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </SelectWrap>
                <FieldError msg={errors.projectType} id="cf-projectType-error" />
            </div>

            <div className="cf__field">
                <label className="cf__label" htmlFor="cf-budget">
                    Budget Range <span className="cf__req-mark">*</span>
                </label>
                <SelectWrap>
                    <select id="cf-budget" className={cls("cf__select", "budget")}
                        value={form.budget} onChange={handleChange("budget")}
                        aria-invalid={!!errors.budget}
                        aria-describedby={errors.budget ? "cf-budget-error" : undefined}>
                        <option value="">Select budget…</option>
                        {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                </SelectWrap>
                <FieldError msg={errors.budget} id="cf-budget-error" />
            </div>

            <div className="cf__field cf__field--full">
                <label className="cf__label" htmlFor="cf-desc">
                    Project Description <span className="cf__req-mark">*</span>
                </label>
                <textarea id="cf-desc" className={cls("cf__textarea", "description")}
                    placeholder="Describe your project, goals, and any specific requirements…"
                    value={form.description} onChange={handleChange("description")}
                    rows={4} data-lenis-prevent
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? "cf-description-error" : undefined} />
                <FieldError msg={errors.description} id="cf-description-error" />
            </div>

            <div className="cf__divider" aria-hidden="true">
                <span className="cf__divider-line" />
                <span className="cf__divider-label">Optional</span>
                <span className="cf__divider-line" />
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
    );
}

/* ─── Step 3: Review & Send ───────────────────────────────── */
function StepReview({ form }) {
    return (
        <div className="cf__review">
            <div className="cf__review-grid">
                <div className="cf__review-item">
                    <span className="cf__review-label">Name</span>
                    <span className="cf__review-value">{form.name}</span>
                </div>
                <div className="cf__review-item">
                    <span className="cf__review-label">Email</span>
                    <span className="cf__review-value">{form.email}</span>
                </div>
                {form.company && (
                    <div className="cf__review-item">
                        <span className="cf__review-label">Company</span>
                        <span className="cf__review-value">{form.company}</span>
                    </div>
                )}
                <div className="cf__review-item">
                    <span className="cf__review-label">Project Type</span>
                    <span className="cf__review-value">{form.projectType}</span>
                </div>
                <div className="cf__review-item">
                    <span className="cf__review-label">Budget</span>
                    <span className="cf__review-value">{form.budget}</span>
                </div>
                {form.timeline && (
                    <div className="cf__review-item">
                        <span className="cf__review-label">Timeline</span>
                        <span className="cf__review-value">{form.timeline}</span>
                    </div>
                )}
                <div className="cf__review-item cf__review-item--full">
                    <span className="cf__review-label">Description</span>
                    <span className="cf__review-value">{form.description}</span>
                </div>
            </div>
        </div>
    );
}

/* ─── Main Component ──────────────────────────────────────── */
export default function ContactSection() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle");
    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState("forward");

    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const submitting = useRef(false);

    /* Focus first errored field on validation failure */
    useEffect(() => {
        const keys = Object.keys(errors);
        if (keys.length === 0) return;
        const firstField = formRef.current?.querySelector(`[aria-invalid="true"]`);
        if (firstField) firstField.focus();
    }, [errors]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (submitting.current) return;

        const errs = validateStep(2, form);
        if (Object.keys(errs).length) { setErrors(errs); return; }

        submitting.current = true;

        const msg = encodeURIComponent(
            `*New Project Inquiry — PrimeAxis*\n\n` +
            `Name: ${form.name}\n` +
            `Email: ${form.email}\n` +
            `Company: ${form.company || "N/A"}\n` +
            `Project Type: ${form.projectType}\n` +
            `Budget: ${form.budget}\n` +
            `Timeline: ${form.timeline || "Not specified"}\n` +
            `Description: ${form.description}`
        );

        window.open(`https://wa.me/${WHATSAPP_PROJECT}?text=${msg}`, "_blank");

        setStatus("success");
        setForm(INITIAL_FORM);
        setStep(0);
        submitting.current = false;
    };

    const handleReset = () => {
        setStatus("idle"); setErrors({});
        setForm(INITIAL_FORM);
        setStep(0);
        setDirection("forward");
    };

    const goNext = useCallback(() => {
        const errs = validateStep(step, form);
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setErrors({});
        setDirection("forward");
        setStep(s => s + 1);
    }, [step, form]);

    const goBack = useCallback(() => {
        setDirection("backward");
        setStep(s => s - 1);
    }, []);

    const cls = (base, key) => errors[key] ? `${base} ${base}--err` : base;

    const completed = (i) => {
        if (i === 0 && (form.name || form.email)) return true;
        if (i === 1 && (form.projectType || form.budget || form.description)) return true;
        return false;
    };

    const steps = [
        <StepInfo key="info" form={form} errors={errors} handleChange={handleChange} cls={cls} />,
        <StepProject key="project" form={form} errors={errors} handleChange={handleChange} cls={cls} />,
        <StepReview key="review" form={form} />,
    ];

    return (
        <section
            className={`contact${visible ? " contact--visible" : ""}`}
            ref={sectionRef}
            id="Contact"
        >

            <div className="contact__layout">

                {/* ── LEFT PANEL ── */}
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
                        <ol className="contact__process" aria-label="Our process">
                            {PROCESS_STEPS.map((s, i) => (
                                <li key={s.num} className="contact__step"
                                    style={{ "--_step-delay": `calc(var(--stagger-unit) * ${i + 2})` }}>
                                    <div className="contact__step-num">{s.num}</div>
                                    <div className="contact__step-body">
                                        <strong className="contact__step-title">{s.title}</strong>
                                        <span className="contact__step-desc">{s.body}</span>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <div className="contact__detail">
                            <span className="contact__detail-label">Response time</span>
                            <span className="contact__detail-value">Within 24 hours</span>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT PANEL — form ── */}
                <div className="contact__form-panel">
                    {status === "success" ? (
                        <SuccessScreen onReset={handleReset} />
                    ) : (
                        <form className="contact__form" onSubmit={handleSubmit} noValidate ref={formRef}>

                            <div className="contact__form-header">
                                <h3 className="contact__form-title">Project Brief</h3>
                                <p className="contact__form-sub">
                                    Fields marked <span className="cf__req-mark">*</span> are required.
                                </p>
                            </div>

                            {/* ── Step progress ── */}
                            <div className="cf-step__bar" role="tablist" aria-label="Form steps">
                                {STEP_LABELS.map((label, i) => (
                                    <StepDot key={label} index={i} active={step === i}
                                        completed={i < step || (i === step && false)}
                                        label={label}
                                        onClick={i < step ? () => { setDirection("backward"); setStep(i); } : undefined} />
                                ))}
                            </div>

                            {/* ── Step content ── */}
                            <div className={`cf-step__content cf-step__content--${direction}`} key={step}>
                                {steps[step]}
                            </div>

                            {/* ── Step navigation ── */}
                            <div className="cf-step__nav">
                                {step > 0 && (
                                    <button type="button" className="cf-step__back" onClick={goBack} data-magnetic>
                                        <span aria-hidden="true">←</span> Back
                                    </button>
                                )}
                                {step < 2 && (
                                    <button type="button" className="cf-step__next btn btn--gradient" onClick={goNext} data-magnetic>
                                        Next <span aria-hidden="true">→</span>
                                    </button>
                                )}
                                {step === 2 && (
                                    <button type="submit" className="cf-step__send btn btn--gradient" data-magnetic>
                                        Send via WhatsApp <span className="btn__arrow" aria-hidden="true">↗</span>
                                    </button>
                                )}
                            </div>

                            {status === "error" && (
                                <div className="cf__api-error" role="alert">Something went wrong. Please try again.</div>
                            )}

                            <p className="cf__trust">We'll respond with a focused plan within 24 hours.</p>

                        </form>
                    )}
                </div>

            </div>
        </section>
    );
}