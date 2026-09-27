import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Banners from './components/Banners'
import WebDesigns from './components/WebDesigns'
import SmoothScroll from './components/SmoothScroll'
import './App.css'

function App() {
  return (
    <SmoothScroll>
      <div className="portfolio-shell">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Banners />
          <WebDesigns />
          <Contact />
        </main>
        <Footer />
        <div className="grain" aria-hidden="true" />
      </div>
    </SmoothScroll>
  )
}

export default App
