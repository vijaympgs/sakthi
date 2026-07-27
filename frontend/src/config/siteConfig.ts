export const SITE_CONFIG = {
  name: "Sakthi Solutions",
  tagline: "Digital Signage, Kiosks & IT Solutions",
  description:
    "Digital signage, interactive kiosks, customer feedback solutions and IT consulting for hospitality, retail, and corporate businesses. Serving Chennai & India since 2014.",
  foundedYear: 2014,

  contact: {
    phonePrimary: "+91 9840057127", // Jayakumar
    phoneSecondary: "+91 9381459199", // Vidya Rani
    landline: "044 26420089",
    emailPrimary: "info@sakthisolutions.in",
    emailSupport: "support@sakthisolutions.in",
    
    salesOffice: {
      addressLine1: "1/1, 1st Floor",
      addressLine2: "General Collins Road, Choolai",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600112",
      country: "India",
      formatted: "1/1, 1st Floor, General Collins Road, Choolai, Chennai - 600112",
    },

    registeredOffice: {
      addressLine1: "F7, 1st Floor",
      addressLine2: "40/26 Arani Muthu Street, Choolai",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600112",
      country: "India",
      formatted: "F7, 1st Floor, 40/26 Arani Muthu Street, Choolai, Chennai - 600112",
    },

    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.142420851332!2d80.26311231482329!3d13.09015899077815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265fb1d99fc0d%3A0x426a91434f932dba!2ssakthi+solutions!5e0!3m2!1sen!2sin!4v1522991981617",
  },

  social: {
    facebook: "https://www.facebook.com/Sakthi-Solutions-276890643116200/",
    linkedin: "https://www.linkedin.com/company/sakthi-solutions/",
    youtube: "https://www.youtube.com/channel/UCxRoJTQKDHkLFj6hFCTHW0g",
  },

  navigation: {
    mainMenu: [
      { label: "Home", url: "/", order: 1 },
      { label: "About Us", url: "/about", order: 2 },
      {
        label: "Products",
        url: "/products",
        order: 3,
        children: [
          {
            label: "Godspeed Signage",
            url: "/products",
            children: [
              { label: "Indoor Digital Signage", url: "/products/indoor-digital-signage" },
              { label: "Floor Standing Signage", url: "/products/indoor-digital-signage/floor-standing" },
              { label: "Wall Mounting Signage", url: "/products/indoor-digital-signage/wall-mounting" },
              { label: "Smart Touch Table", url: "/products/smart-touch-table" },
              { label: "Wayfinding Kiosk", url: "/products/wayfinding-kiosk" },
              { label: "Touch Screen Kiosk", url: "/products/touch-screen-kiosk" },
              { label: "Video Wall", url: "/products/video-wall" },
            ],
          },
          { label: "Tellus Feedback Solution", url: "/products/tellus" },
          { label: "Childwood Play Equipment", url: "/products/childwood" },
        ],
      },
      {
        label: "Services",
        url: "/services",
        order: 4,
        children: [
          { label: "Hardware for Restaurant & Bar", url: "/services" },
          { label: "IT Networking Consulting", url: "/services" },
        ],
      },
      { label: "Contact Us", url: "/#contact-section", order: 5 },
    ],
    footerColumns: [
      {
        title: "Godspeed",
        links: [
          { label: "Indoor Digital Signage", url: "/products/indoor-digital-signage" },
          { label: "Smart Touch Table", url: "/products/smart-touch-table" },
          { label: "Wayfinding Kiosk", url: "/products/wayfinding-kiosk" },
          { label: "Touch Screen Kiosk", url: "/products/touch-screen-kiosk" },
          { label: "Video Wall", url: "/products/video-wall" },
        ],
      },
      {
        title: "More Products & Services",
        links: [
          { label: "Tellus Feedback Solution", url: "/products/tellus" },
          { label: "Childwood Catalog (130 items)", url: "/products/childwood" },
          { label: "POS Hardware & Printers", url: "/services" },
          { label: "IT Networking Consulting", url: "/services" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About Us", url: "/about" },
          { label: "All Products", url: "/products" },
          { label: "Services Overview", url: "/services" },
          { label: "Contact Us", url: "/#contact-section" },
        ],
      },
    ],
  },
};
