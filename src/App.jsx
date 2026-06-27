import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PhoneGate from './components/PhoneGate'
import Hub from './pages/Hub'
import RealEstateHub from './pages/RealEstateHub'
import DeveloperPage from './pages/DeveloperPage'
import ProjectPage from './pages/ProjectPage'
import Training from './pages/Training'
import About from './pages/About'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
}

function PageWrapper({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

// Layout that gates all /real-estate/* behind phone capture
function RealEstateLayout() {
  return (
    <PhoneGate>
      <Outlet />
    </PhoneGate>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public routes — no gate */}
          <Route path="/" element={<PageWrapper><Hub /></PageWrapper>} />
          <Route path="/training" element={<PageWrapper><Training /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />

          {/* Real estate — phone gate on first visit */}
          <Route element={<RealEstateLayout />}>
            <Route path="/real-estate" element={<PageWrapper><RealEstateHub /></PageWrapper>} />
            <Route path="/real-estate/:devSlug" element={<PageWrapper><DeveloperPage /></PageWrapper>} />
            <Route path="/real-estate/:devSlug/:projectSlug" element={<PageWrapper><ProjectPage /></PageWrapper>} />
          </Route>
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
