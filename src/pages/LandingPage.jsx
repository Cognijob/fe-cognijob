import Navbar from '../components/layout/Navbar'
import Hero from '../components/landing/Hero'

const bgGradient = 'linear-gradient(180deg, #E6CDEE 26%, #D6CDEE 50%, #CDD6EE 78%)'

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen relative" style={{ background: bgGradient }}>
      {/* Navbar */}
      <Navbar />
      
      {/* Main content */}
      <main className="w-full">
        {/* Hero Section */}
        <Hero />
        
        {/* Section lainnya nanti di bawah sini */}
      </main>
    </div>
  )
}