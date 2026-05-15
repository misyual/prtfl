import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import './App.css'
import DotField from './components/DotField'
import SplashCursor from './components/SplashCursor'


function App() {
  return (
    <>
      <div className="background-stage">
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
        <SplashCursor
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          SHADING
          RAINBOW_MODE={false}
          COLOR="#A855F7"
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
