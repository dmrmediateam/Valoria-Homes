export type FloorPlan = {
  id: string;
  name: string;
  beds: number;
  baths: number;
  sqFt: number;
  image: string;
  description: string;
};

export type BuildStep = {
  step: number;
  title: string;
  icon: "chat" | "blueprint" | "hammer" | "checklist" | "key";
  description: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export const floorPlans: FloorPlan[] = [
  {
    id: "meadowbrook-2140",
    name: "Meadowbrook 2140",
    beds: 3,
    baths: 2,
    sqFt: 2140,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    description:
      "Open-concept living with a generous kitchen island and private owner suite designed for growing families."
  },
  {
    id: "pine-ridge-1885",
    name: "Pine Ridge 1885",
    beds: 3,
    baths: 2,
    sqFt: 1885,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80",
    description:
      "Efficient single-story layout with practical storage, mudroom access, and durable finishes throughout."
  },
  {
    id: "heritage-2420",
    name: "Heritage 2420",
    beds: 4,
    baths: 2.5,
    sqFt: 2420,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    description:
      "A spacious two-level design with defined living spaces, ideal for entertaining and multi-generational needs."
  },
  {
    id: "oakview-2010",
    name: "Oakview 2010",
    beds: 3,
    baths: 2,
    sqFt: 2010,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=80",
    description:
      "Balanced layout with dedicated office flex room and natural-light dining area for everyday comfort."
  },
  {
    id: "prairie-classic-1760",
    name: "Prairie Classic 1760",
    beds: 3,
    baths: 2,
    sqFt: 1760,
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80",
    description:
      "Cost-conscious plan with dependable materials, ideal for first-time buyers wanting long-term value."
  },
  {
    id: "timberline-2285",
    name: "Timberline 2285",
    beds: 4,
    baths: 3,
    sqFt: 2285,
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1400&q=80",
    description:
      "Large family-forward design with guest suite option, oversized pantry, and spacious main living zone."
  }
];

export const buildSteps: BuildStep[] = [
  {
    step: 1,
    title: "Consultation",
    icon: "chat",
    description:
      "We begin with a practical conversation about your land, budget, timeline, and household needs."
  },
  {
    step: 2,
    title: "Design & Planning",
    icon: "blueprint",
    description:
      "Select a floor plan and personalize key details while we finalize engineering, permitting, and site coordination."
  },
  {
    step: 3,
    title: "Construction",
    icon: "hammer",
    description:
      "Your home is built with quality-controlled modular methods and carefully selected materials for long-term durability."
  },
  {
    step: 4,
    title: "Completion",
    icon: "checklist",
    description:
      "Modules are delivered, set, and finished on-site with detailed inspections to ensure everything meets our standards."
  },
  {
    step: 5,
    title: "Move In",
    icon: "key",
    description:
      "We complete your final walkthrough, hand over documentation, and welcome your family into a ready-to-live home."
  }
];

export const faqs: FAQItem[] = [
  {
    question: "How long does the modular home process usually take?",
    answer:
      "Most projects are completed in 4 to 8 months depending on permitting, site readiness, weather, and plan complexity."
  },
  {
    question: "Can I customize the floor plan?",
    answer:
      "Yes. We offer practical customization options for layout, finishes, and features while keeping your budget and timeline in focus."
  },
  {
    question: "Do modular homes meet local building codes?",
    answer:
      "Absolutely. Every Valoria home is engineered and inspected to meet or exceed applicable state and local code requirements."
  },
  {
    question: "Do you help with financing and site preparation?",
    answer:
      "We can connect you with trusted lending and site-work partners to support a smooth, coordinated project from start to finish."
  }
];
