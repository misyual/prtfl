import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import './App.css'
import DotField from './components/DotField'

function App() {
  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <DotField
          dotRadius={2.5}
          dotSpacing={16}
          bulgeStrength={67}
          glowRadius={220}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={500}
          cursorForce={0.23}
          bulgeOnly
          gradientFrom="#A855F7"
          gradientTo="#B497CF"
          glowColor="#120F17"
        />
      </div>

      <div className="portfolio-shell" style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App