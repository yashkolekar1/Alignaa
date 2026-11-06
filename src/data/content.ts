export const siteContent = {
  brand: "Alignaa",
  parentUrl: "https://alignaa.in/",
  references: {
    brand: "https://alignaa.in/",
    layout: "https://smileset.com/",
    patterns: "https://makeo.app/toothsi",
  },
  price: "Starting at ₹39,999",
  heroTitle: "Your smile journey starts with Alignaa",
  heroDescription:
    "Explore clear aligner treatment and share your enquiry. The Alignaa support team will contact you to discuss the next steps.",
  inclusions: [
    {
      title: "Scan at home or an Alignaa centre",
      note: "Availability and any scan fee need confirmation.",
    },
    {
      title: "Treatment planning by a dental professional",
      note: "Final approved wording is pending.",
    },
    {
      title: "Free shipping and handling",
      note: "Applicable conditions need confirmation.",
    },
    {
      title: "Full or phased aligner delivery",
      note: "Delivery terms need operational approval.",
    },
    {
      title: "Retainers included",
      note: "Number and package applicability need confirmation.",
    },
  ],
  steps: [
    {
      number: "01",
      title: "Request a scan",
      description: "Ask the team about a scan at home or at an Alignaa centre.",
    },
    {
      number: "02",
      title: "Get a treatment plan",
      description: "A dental professional creates a plan for your case.",
    },
    {
      number: "03",
      title: "Receive your aligners",
      description: "Aligners are shipped after the plan is prepared.",
    },
    {
      number: "04",
      title: "Begin your journey",
      description: "The Alignaa team coordinates the next steps with you.",
    },
  ],
  concerns: [
    { id: "spacing", title: "Spacing or gaps", mark: "01", description: "Visible spaces between teeth." },
    { id: "crowding", title: "Crowding", mark: "02", description: "Teeth that appear close together or overlap." },
    { id: "forward", title: "Forwardly placed teeth", mark: "03", description: "Teeth that appear positioned forward." },
    { id: "crossbite", title: "Crossbite", mark: "04", description: "A bite concern to discuss with a dental professional." },
    { id: "openbite", title: "Open bite", mark: "05", description: "A bite concern to discuss with a dental professional." },
    { id: "deepbite", title: "Deep bite", mark: "06", description: "A bite concern to discuss with a dental professional." },
  ],
  results: [
    {
      id: "gap-closure",
      category: "Gap closure",
      duration: "8.5 months",
      aligners: "17 aligners",
      beforeImage: "/assets/results/gap-closure-before.svg",
      afterImage: "/assets/results/gap-closure-after.svg",
    },
    {
      id: "forwardly-placed",
      category: "Forwardly placed",
      duration: "10 months",
      aligners: "20 aligners",
      beforeImage: "/assets/results/forward-before.svg",
      afterImage: "/assets/results/forward-after.svg",
    },
    {
      id: "crowding",
      category: "Crowding",
      duration: "8 months",
      aligners: "16 aligners",
      beforeImage: "/assets/results/crowding-before.svg",
      afterImage: "/assets/results/crowding-after.svg",
    },
  ],
  benefits: [
    {
      number: "01",
      title: "Personalised planning",
      description: "Treatment planning is shaped around professional assessment.",
    },
    {
      number: "02",
      title: "Professional involvement",
      description: "A dental professional is involved in creating the treatment plan.",
    },
    {
      number: "03",
      title: "Patient support",
      description: "The Alignaa support team coordinates the next steps after your enquiry.",
    },
  ],
  faqs: [
    { question: "What are clear aligners?", answer: "Answer pending client clinical review." },
    { question: "How is a patient assessed?", answer: "Answer pending client clinical review." },
    { question: "What is the treatment process?", answer: "Answer pending client clinical review." },
    { question: "How much does treatment cost?", answer: "The current brief lists treatment starting at ₹39,999. Final inclusions and conditions need client approval." },
    { question: "Are EMI options available?", answer: "EMI availability is pending confirmation from Alignaa." },
    { question: "Are retainers included?", answer: "The client PDF lists retainers. Number, replacement policy and package applicability need confirmation." },
    { question: "How should aligners be cared for?", answer: "Answer pending client clinical review." },
    { question: "How do I enquire?", answer: "Complete the patient enquiry form on this page. The Alignaa support team will contact you to discuss your requirements and next steps." },
  ],
  partnerBenefits: [
    "A dedicated route for dentists and dental clinic owners to contact Alignaa.",
    "A team follow-up to discuss potential next steps.",
    "A direct link to the Alignaa professional website.",
  ],
} as const;

export type DesignOption = "a" | "b";
