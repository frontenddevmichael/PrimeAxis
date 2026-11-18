import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { useEffect, type ReactElement } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'

import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { useIsMobile } from './lib/useMediaQuery'
import { SHOW_PROJECTS } from './data'
import { ScrollProgress } from './components/Motion'
import { ToastProvider } from './components/Overlay'
import { Careers } from './pages/Careers'
import { CaseStudy } from './pages/CaseStudy'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { RolePage } from './pages/Role'
import { Services } from './pages/Services'
import { Studio } from './pages/Studio'
import { Styleguide } from './pages/Styleguide'
import { Work } from './pages/Work'

/** Scroll to the top on a new page, or to the #hash target when there is one. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      return
    }
    // Wait for the page transition to mount the target.
    const t = window.setTimeout(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 420)
    return () => window.clearTimeout(t)
  }, [pathname, hash])
  return null
}

/** Careers is a desktop page: phones go home instead of an orphaned route. */
function DesktopOnly({ children }: { children: ReactElement }) {
  return useIsMobile() ? <Navigate to="/" replace /> : children
}

function Pages() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        id="main"
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1"
      >
        <Routes location={location}>
          <Route index element={<Home />} />
          {SHOW_PROJECTS && <Route path="work" element={<Work />} />}
          {SHOW_PROJECTS && <Route path="work/:slug" element={<CaseStudy />} />}
          <Route path="services" element={<Services />} />
          <Route path="studio" element={<Studio />} />
          <Route
            path="careers"
            element={
              <DesktopOnly>
                <Careers />
              </DesktopOnly>
            }
          />
          <Route
            path="careers/:slug"
            element={
              <DesktopOnly>
                <RolePage />
              </DesktopOnly>
            }
          />
          <Route path="contact" element={<Contact />} />
          <Route path="styleguide" element={<Styleguide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  )
}

export function App() {
  return (
    // In dev, always play motion so animations can be reviewed. Production respects the OS setting.
    <MotionConfig reducedMotion={import.meta.env.DEV ? 'never' : 'user'}>
      <BrowserRouter>
        <ToastProvider>
          <ScrollProgress />
          <ScrollManager />
          <a href="#main" className="sr-only z-[100] rounded-full bg-violet px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
            Skip to content
          </a>
          <div id="top" className="flex min-h-svh flex-col">
            {/* Outside Pages: no transformed ancestor, so it stays fixed and mounts once */}
            <Nav />
            <Pages />
            <Footer />
          </div>
        </ToastProvider>
      </BrowserRouter>
    </MotionConfig>
  )
}