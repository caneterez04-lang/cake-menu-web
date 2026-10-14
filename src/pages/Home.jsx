import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
export default function Home() {
  return (
    <div className="bg-cream min-h-screen">
      <Navbar />
      {/* Hero section */}
      <section className="grid md:grid-cols-2 items-center gap-10 px-10 py-16">
        <div>
          <h1 className="font-script text-6xl md:text-7xl text-deep leading-tight">
            Best Custom<br />Cakes Bakery
          </h1>
          <p className="mt-6 text-gray-500 max-w-md">
            We create handcrafted cakes made with love, premium ingredients,
            and a touch of magic. Because the sweetest moments deserve to be
            celebrated.
          </p>
          <Link
            to="/products"
            className="inline-block mt-8 bg-deep text-white px-6 py-3 rounded-full font-semibold"
          >
            Order Now
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}