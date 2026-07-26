import Link from "next/link";
import { Phone, Mail, MapPin, Building2, Facebook, Linkedin, Youtube, ChevronRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#2b323e] text-white border-t border-gray-800">
      <div className="container-page py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
                <span className="text-[#f54337]">S</span>akthi <span className="text-[#f54337]">S</span>olutions
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Digital signage, interactive kiosks, feedback solutions, and IT consulting
              for hospitality, retail, and corporate sectors since 2014.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/Sakthi-Solutions-276890643116200/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-gray-600 flex items-center justify-center hover:bg-[#f54337] hover:border-[#f54337] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
              <a
                href="https://www.linkedin.com/company/sakthi-solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-gray-600 flex items-center justify-center hover:bg-[#f54337] hover:border-[#f54337] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCxRoJTQKDHkLFj6hFCTHW0g"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-gray-600 flex items-center justify-center hover:bg-[#f54337] hover:border-[#f54337] transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={15} />
              </a>
            </div>
          </div>

          {/* Column 1: Godspeed */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <span className="w-1 h-5 bg-[#f54337] inline-block mr-3"></span>
              <span className="text-[#f54337]">G</span>odspeed
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Indoor Digital Signage", href: "/products/indoor-digital-signage" },
                { label: "Floor Standing Series", href: "/products/indoor-digital-signage/floor-standing" },
                { label: "Wall Mounting Series", href: "/products/indoor-digital-signage/wall-mounting" },
                { label: "Smart Touch Table", href: "/products/smart-touch-table" },
                { label: "Wayfinding Kiosk", href: "/products/wayfinding-kiosk" },
                { label: "Touch Screen Kiosk", href: "/products/touch-screen-kiosk" },
                { label: "Video Wall", href: "/products/video-wall" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-200 hover:text-[#f54337] transition-colors flex items-center gap-2">
                    <span className="text-[#f54337] text-xs font-bold">&gt;</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: More Products */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <span className="w-1 h-5 bg-[#f54337] inline-block mr-3"></span>
              <span className="text-[#f54337]">M</span>ore Products
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Tellus Feedback Solution", href: "/products/tellus" },
                { label: "Childwood Play Equipment", href: "/products/childwood" },
                { label: "Hardware Supply for Restaurant & Bar", href: "/services" },
                { label: "IT Networking Consulting", href: "/services" },
                { label: "About Sakthi Solutions", href: "/about" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-200 hover:text-[#f54337] transition-colors flex items-center gap-2">
                    <span className="text-[#f54337] text-xs font-bold">&gt;</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Address */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <span className="w-1 h-5 bg-[#f54337] inline-block mr-3"></span>
              <span className="text-[#f54337]">A</span>ddress
            </h3>
            <div className="space-y-4 text-sm text-gray-200">
              
              <div className="flex items-center gap-2.5 font-bold text-white">
                <Building2 size={16} className="text-[#f54337] shrink-0" />
                <span>Sales Office</span>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#f54337] shrink-0 mt-1" />
                <div className="leading-relaxed">
                  <p>1/1, 1st Floor,</p>
                  <p>General Collins Road,</p>
                  <p>Choolai Chennai - 600112.</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#f54337] shrink-0" />
                <div>
                  <a href="tel:+919840057127" className="hover:text-[#f54337] transition-colors">+91 9840057127</a>,{" "}
                  <a href="tel:+919381459199" className="hover:text-[#f54337] transition-colors">+91 9381459199</a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#f54337] shrink-0" />
                <a href="mailto:info@sakthisolutions.in" className="hover:text-[#f54337] transition-colors">
                  info@sakthisolutions.in
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="border-t border-gray-700/60 bg-[#212630]">
        <div className="container-page py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sakthi Solutions. All rights reserved.</p>
          <p>
            Powered by <span className="text-white font-medium">Olivine AI Technologies</span>
          </p>
        </div>
      </div>
    </footer>
  );
}