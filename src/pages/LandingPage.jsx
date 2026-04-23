import Navbar from '../components/layout/Navbar'
import Hero from '../components/landing/Hero'
import CaraKerja from '../components/landing/CaraKerja'
import Keunggulan from '../components/landing/Keunggulan'
import FAQ from '../components/landing/FAQ'
import Footer from '../components/layout/Footer'

export default function LandingPage() {
  return (
    <div className="w-full relative bg-[#CDD6EE]">
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