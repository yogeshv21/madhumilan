export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh Mehta",
    role: "VP - Projects",
    company: "Apex PEB Structures",
    feedback: "Madhu Ratna's Standing Seam clips are the best in the market. The sliding action is exceptionally smooth, which resolved our panel buckle issues on a 120-meter warehouse project. Their pull-out testing records gave our consultants full peace of mind.",
    rating: 5
  },
  {
    id: "2",
    name: "Arun K. Sharma",
    role: "Senior Procurement Officer",
    company: "Metro Infrastructure Pvt Ltd",
    feedback: "We have been sourcing Class-4 fasteners and ridge caps from Madhu Ratna Industry for 5+ years. Their logistics scheduling is impeccable. Even for custom RAL colors, they deliver within the promised timeframes. Quality is consistently outstanding.",
    rating: 5
  },
  {
    id: "3",
    name: "Vikram R. Singhania",
    role: "Structural Consultant",
    company: "VRS Associates",
    feedback: "The foam closer strips from Madhu Ratna match the profiles of our trapezoidal sheets perfectly. The closed-cell material prevents any rainwater ingress, which is crucial for the pharmaceutical factory roofs we design.",
    rating: 5
  },
  {
    id: "4",
    name: "David D'Souza",
    role: "Lead Engineer",
    company: "Apex Warehousing Solutions",
    feedback: "In heavy industrial environments, vibration is a massive problem. Madhu Ratna's high-tensile components and specialized fasteners have provided reliable fastening that doesn't loosen. Highly recommended for commercial roof engineering.",
    rating: 5
  }
];
