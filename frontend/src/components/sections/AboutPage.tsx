import { SectionHeader } from "@/components/ui/SectionHeader";
import { ShieldCheck, Clock, Users, Wifi, Award, HeartHandshake } from "lucide-react";

const WHY_ITEMS = [
  { icon: <Award size={24} />, title: "End-to-End Provider", description: "Hardware, installation, digital signage and IT consulting end-to-end solution for hospitality, retail and corporate sectors." },
  { icon: <Clock size={24} />, title: "Prompt Service", description: "Prompt service on all days, even after office hours. We understand that business never stops." },
  { icon: <HeartHandshake size={24} />, title: "Reliable Partner", description: "Reliable partner for regular updates, maintenance and consumables for day-to-day operations." },
  { icon: <Users size={24} />, title: "Customer-First Approach", description: "We put ourselves in your shoes so that the client gets the best solution for their business." },
  { icon: <ShieldCheck size={24} />, title: "Quality Hardware", description: "World-class products from Samsung, LG, Godspeed and other reputed global brands." },
  { icon: <Wifi size={24} />, title: "Free IT Consulting", description: "Professional IT networking consulting at no cost for new businesses. Complete guidance from planning to execution." },
];

const TIMELINE = [
  { year: "2014", title: "Founded", description: "Sakthi Solutions was established by Jayakumar (25+ years in sales, retail, automation & hospitality) and Vidya Rani (sales & financial products)." },
  { year: "2015", title: "Godspeed Partnership", description: "Partnered with Godspeed for world-class digital signage products manufactured in Hong Kong and China." },
  { year: "2016", title: "Full-Stack IT Consulting", description: "Expanded to provide complete IT infrastructure consulting for the hospitality industry including networking, WiFi, and hardware." },
  { year: "2018", title: "Tellus & Childwood", description: "Added Tellus feedback solutions and Childwood children's play equipment to the product portfolio." },
  { year: "Present", title: "Growing Strong", description: "Continuing to serve corporates, hospitals, hotels, restaurants, malls and more across the region." },
];

export function AboutPage() {
  return (
    <>
      <section className="bg-primary-500 text-white py-20 md:py-28">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-400 mb-4">About Us</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Technology Partner<br />Since 2014</h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Digital signage, interactive kiosks, feedback solutions and IT consulting
            for hospitality, retail and corporate sectors.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="section-label">Our Story</p>
              <h2 className="heading-md text-primary-500 mb-6">Built on Experience, Driven by Service</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Sakthi Solutions was founded in 2014 by a dynamic couple bringing together decades of
                combined expertise. Jayakumar brought 25+ years of experience in sales across retail,
                packaging, industrial automation and hospitality. Vidya Rani contributed deep knowledge
                in sales and financial products.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The company provides end-to-end IT consulting and digital signage solutions
                for hospitality, retail and corporate sectors. With decades of combined experience
                in sales and technology, the team brings deep domain expertise to every project.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We represent Godspeed, a world-class digital signage brand with manufacturing units
                in Hong Kong and China, providing solutions for corporates, hospitals, hotels, restaurants,
                malls and event management companies.
              </p>
            </div>
            <div>
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden mb-6">
                <img
                  src="/assets/products/about_images.jpg"
                  alt="Sakthi Solutions"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="section-label">What We Do</p>
              <h2 className="heading-md text-primary-500 mb-6">Complete IT Infrastructure Solutions</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We provide IT infrastructure consulting including networking,
                network cable laying, WiFi site surveys, suggesting best WiFi routers and access points
                at enterprise standards, proper racking of network switches and routers with protection
                of online UPS from reputed brands.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From digital signage and interactive kiosks to feedback solutions and IT networking,
                we cover the complete technology needs of your business under one roof.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <SectionHeader label="Why Sakthi" title="Why Sakthi Solutions" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_ITEMS.map((item) => (
              <div key={item.title} className="card">
                <div className="w-12 h-12 bg-accent-50 flex items-center justify-center mb-4 text-accent-500">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-primary-500 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeader label="Our Journey" title="Timeline" />
          <div className="max-w-3xl mx-auto">
            {TIMELINE.map((item, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {item.year}
                  </div>
                  {index < TIMELINE.length - 1 && <div className="w-px bg-gray-200 flex-1 mt-2" />}
                </div>
                <div className="pb-8">
                  <h3 className="font-semibold text-primary-500 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}