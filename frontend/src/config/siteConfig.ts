// Site configuration — structural defaults only
// All business content is served from the Django CMS API.
// This file contains only UI/structural configuration.

export const SITE_CONFIG = {
  name: "",
  tagline: "",
  description: "",
  foundedYear: 0,

  contact: {
    phonePrimary: "",
    phoneSecondary: "",
    landline: "",
    emailPrimary: "",
    emailSupport: "",
    
    salesOffice: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      formatted: "",
    },

    registeredOffice: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      formatted: "",
    },

    mapEmbedUrl: "",
  },

  social: {
    facebook: "",
    linkedin: "",
    youtube: "",
  },

  navigation: {
    mainMenu: [],
    footerColumns: [],
  },
};
