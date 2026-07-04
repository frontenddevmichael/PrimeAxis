
import { useEffect } from "react"
import Lenis from "lenis"
import Nav from "./Components/Nav"
import HeroPage from "./Components/Hero-page"
import AboutPage from "./Components/AboutPage"
import ServicesPage from "./Components/Service"
import TeamSection from "./Components/Team"
import ContactSection from "./Components/ContactPage"
import CallBooking from "./Components/CallBooking"
import Footer from "./Components/Footer"
export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on("scroll", () => {
      window.dispatchEvent(new Event("scroll"))
    })

    /* Intercept anchor link clicks so Lenis scrolls smoothly */
    function handleAnchorClick(e) {
      const a = e.target.closest("a[href^='#']")
      if (!a) return
      const target = document.querySelector(a.getAttribute("href"))
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target)
    }
    document.addEventListener("click", handleAnchorClick)

    /* Button ripple on click */
    function handleRipple(e) {
      const btn = e.target.closest(".btn, .cta, .cf__submit, .btn--contact, .cf__success-reset, .footer__cta, .nav-icon-btn:not(.nav-theme-toggle)")
      if (!btn || btn.closest("[data-no-ripple]")) return
      const rect = btn.getBoundingClientRect()
      const ripple = document.createElement("span")
      ripple.className = "ripple"
      const size = Math.max(rect.width, rect.height)
      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`
      btn.appendChild(ripple)
      ripple.addEventListener("animationend", () => ripple.remove())
    }
    document.addEventListener("click", handleRipple)

    /* Magnetic hover on CTAs */
    const magState = new WeakMap()
    function handleMagEnter(e) {
      const el = e.target.closest("[data-magnetic]")
      if (!el || magState.has(el)) return
      const state = { raf: null, x: 0, y: 0 }
      magState.set(el, state)

      function apply() {
        if (state.raf) return
        state.raf = requestAnimationFrame(() => {
          state.raf = null
          if (!el.isConnected) return
          const dx = state.x, dy = state.y
          if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
            el.style.transform = ""
          } else {
            el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
          }
        })
      }

      function onMove(ev) {
        const rect = el.getBoundingClientRect()
        const strength = parseFloat(el.dataset.magStrength) || 0.3
        state.x = (ev.clientX - rect.left - rect.width / 2) * strength
        state.y = (ev.clientY - rect.top - rect.height / 2) * strength
        apply()
      }

      function onLeave() {
        cancelAnimationFrame(state.raf)
        state.raf = null
        el.style.transform = ""
        el.removeEventListener("mousemove", onMove)
        el.removeEventListener("mouseleave", onLeave)
        magState.delete(el)
        setTimeout(() => el.style.removeProperty("transition"), 500)
      }

      el.addEventListener("mousemove", onMove)
      el.addEventListener("mouseleave", onLeave, { once: false })
      el.style.transition = el.style.transition || "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)"
    }
    document.addEventListener("mouseenter", handleMagEnter, true)

    window.lenis = lenis

    return () => {
      lenis.destroy()
      document.removeEventListener("click", handleAnchorClick)
      document.removeEventListener("click", handleRipple)
      document.removeEventListener("mouseenter", handleMagEnter, true)
      delete window.lenis
    }
  }, [])

  return (
    <>
      <a href="#Services" className="skip-link">Skip to content</a>
      <Nav />
      <HeroPage />
      <AboutPage />
      <ServicesPage />
      <TeamSection />
      <ContactSection />
      <CallBooking />
      <Footer />
    </>
  )
}
