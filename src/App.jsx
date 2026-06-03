import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import './App.css'
import Banners from './components/Banners'


function App() {
  return (
    <div className="portfolio-shell">
      <Navbar />
        <main>
            <Hero />
            <About />
            <Projects />
            <Banners />
            <Contact />
        </main>
      <Footer />
    </div>
  )
}

export default App
