import Navbar from '../components/layout/Navbar'
import Hero from '../components/landing/Hero'
import CaraKerja from '../components/landing/CaraKerja'
import Keunggulan from '../components/landing/Keunggulan'
import FAQ from '../components/landing/FAQ'
import Footer from '../components/layout/Footer'

const bgGradient = 'linear-gradient(180deg, #E6CDEE 26%, #D6CDEE 50%, #CDD6EE 78%)'

export default function LandingPage() {
  return (
    // Pindahkan style background ke div pembungkus yang scrollable
    <div className="w-full relative" style={{ background: bgGradient }}>
      {/* Navbar fixed */}
      <Navbar />
      
      {/* Main content */}
      <main className="w-full flex flex-col items-center">
        {/* Section Hero */}
        <Hero />
        
        {/* Section Cara Kerja */}
        <CaraKerja />

        {/* Section Keunggulan */}
        <Keunggulan />

        {/* Section FAQ */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}