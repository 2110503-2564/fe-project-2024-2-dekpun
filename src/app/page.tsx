import Banner from "@/components/Banner";
import DentCatalog from "@/components/DentCatalog";
import { FAQ } from "@/components/FAQ";
import { Reviews } from "@/components/Reviews";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>

      {/* Hero Section */}
      <Banner/>

      <div className="flex flex-col items-center w-full">

      {/* Services Section */}
      <section className="w-full max-w-6xl py-10">
        <h2 className="text-3xl font-bold text-center mb-6">Our Dental Services</h2>
        <Services />
      </section>

      {/* Featured Dentists */}
      <section className="w-full max-w-6xl py-10">
        <h2 className="text-3xl font-bold text-center mb-6">Top Rated Dentists</h2>
        <DentCatalog />
      </section>

      {/* Patient Reviews */}
      <section className="w-full max-w-6xl py-10">
        <h2 className="text-3xl font-bold text-center mb-6">What Our Patients Say</h2>
        <Reviews />
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-6xl py-10">
        <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        <FAQ />
      </section>

      {/* Footer */}
      <Footer />

      </div>

    </main>
  );
}
