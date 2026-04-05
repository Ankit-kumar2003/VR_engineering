import { Factory, Settings, Wrench, Target, Cog, Shield, Zap } from 'lucide-react';

export const NAV_LINKS = ["Home", "Services", "Gallery", "About", "Quote", "Contact"];

export const TICKER_ITEMS = [
  "Industrial Fabrication","Die Making","Fixture Work","Gauge Manufacturing",
  "Tool Room Jobs","Precision Engineering","GST Registered","Alwar Rajasthan",
  "Zero Compromise Quality","24/7 Support"
];

export const SERVICES_DATA = [
  {
    id: "fab",
    icon: <Factory size={22} />,
    name: "Industrial Fabrication",
    short: "Heavy-duty steel and metal fabrication for industrial applications.",
    desc: "Comprehensive metal fabrication solutions for the most demanding industrial requirements. From structural steel frameworks to precision machined components, our workshop handles every fabrication challenge with unmatched precision.",
    features: ["Custom steel structure fabrication","Heavy-duty plate cutting & bending","MIG/TIG welding","Surface grinding & finishing","Material: MS, SS, Alloy Steel"],
    industries: ["Automotive","Agriculture","Defence","Infrastructure"],
  },
  {
    id: "die",
    icon: <Settings size={22} />,
    name: "Die Making",
    short: "Custom die manufacturing for stamping, forging and forming.",
    desc: "State-of-the-art die manufacturing for progressive dies, compound dies, and complex forming tooling. Precision ground cavities with surface finishes that ensure millions of consistent parts.",
    features: ["Progressive & compound dies","Stamping die sets","Forging die blocks","EDM wire cut accuracy","Hardening & heat treatment"],
    industries: ["Automotive","Sheet Metal","Electronics","Consumer Goods"],
  },
  {
    id: "fix",
    icon: <Wrench size={22} />,
    name: "Fixture Work",
    short: "Precision jigs and fixtures for accurate machining and assembly.",
    desc: "Engineering-grade jigs and fixtures designed to hold, locate, and guide your workpieces with micro-level precision. We design from scratch or replicate existing tooling to exact specifications.",
    features: ["Welding fixtures","Inspection jigs","Assembly fixtures","Modular fixture systems","CMM verified accuracy"],
    industries: ["Automotive","Aerospace","General Engineering","OEM Suppliers"],
  },
  {
    id: "gau",
    icon: <Target size={22} />,
    name: "Gauge Manufacturing",
    short: "Go/No-Go gauges and measuring aids for quality control.",
    desc: "Precision gauging instruments manufactured to DIN and IS standards. Our gauges ensure your production maintains dimensional accuracy at every step — from incoming inspection to final quality control.",
    features: ["Go/No-Go plug gauges","Ring & snap gauges","Thread gauges","Profile gauges","Calibration certificates"],
    industries: ["Quality Control","Automotive","Defence","Medical Devices"],
  },
  {
    id: "tool",
    icon: <Cog size={22} />,
    name: "Tool Room Jobs",
    short: "Complete tool room services including repair and modification.",
    desc: "Your one-stop tool room partner for repair, reconditioning, modification, and custom tooling. Our experienced tool makers bring decades of expertise to every job — emergency repairs to complex custom projects.",
    features: ["Tool repair & reconditioning","Punch & die regrinding","CNC turning & milling","Spark erosion (EDM)","Reverse engineering"],
    industries: ["All Industries","OEM Toolrooms","Maintenance Depts.","Startups"],
  },
];

export const GALLERY_ITEMS = [
  { id:1,  name:"Steel Frame Fabrication",    cat:"Fabrication", col:"#1E2A1E" },
  { id:2,  name:"Progressive Die Set",         cat:"Dies",        col:"#1E1E2A" },
  { id:3,  name:"Welding Fixture Assembly",    cat:"Fixtures",    col:"#2A1E1E" },
  { id:4,  name:"Go/No-Go Gauge Set",          cat:"Gauges",      col:"#1E2A2A" },
  { id:5,  name:"CNC Turned Components",       cat:"Tool Room",   col:"#2A2A1E" },
  { id:6,  name:"Compound Die Tooling",        cat:"Dies",        col:"#1E1E2A" },
  { id:7,  name:"Assembly Jig System",         cat:"Fixtures",    col:"#2A1E1E" },
  { id:8,  name:"Heavy Plate Cutting",         cat:"Fabrication", col:"#1E2A1E" },
  { id:9,  name:"Thread Ring Gauges",          cat:"Gauges",      col:"#1E2A2A" },
  { id:10, name:"EDM Wire Cut Parts",          cat:"Tool Room",   col:"#2A2A1E" },
  { id:11, name:"Structural Weldment",         cat:"Fabrication", col:"#1E2A1E" },
  { id:12, name:"Snap Gauge Set",              cat:"Gauges",      col:"#1E2A2A" },
];

export const TESTIMONIALS = [
  { text:"VR Engineering delivered our progressive die tooling ahead of schedule. The precision is exceptional — our press rejection rate dropped to near zero.", author:"Rajesh Sharma", company:"AutoParts Mfg, Gurgaon", stars:5 },
  { text:"We've been sourcing fixtures from VR Engineering for 3 years. Consistent quality, fair pricing, and they always understand exactly what we need.", author:"Mukesh Agarwal", company:"Precision Components Pvt Ltd", stars:5 },
  { text:"Needed emergency repair on a critical die. VR Engineering had it running within 48 hours. Saved us from huge production loss.", author:"Dinesh Kumar", company:"Sheet Metal Works, Bhiwadi", stars:5 },
  { text:"The gauge sets from VR Engineering are calibrated perfectly. Our quality auditors were impressed. Highly recommend for any precision tooling.", author:"Priya Verma", company:"QC Manager, Defence Supplier", stars:5 },
  { text:"Best tool room in Alwar region. They fabricated our entire machine frame from scratch based on our rough sketches. Outstanding work.", author:"Suresh Meena", company:"Agricultural Equipment Co.", stars:5 },
  { text:"Competitive rates, never compromise on quality. Our go-to partner for all fixture and jig requirements. Trusted for years.", author:"Amit Singh", company:"OEM Supplier, Rajasthan", stars:5 },
];

export const VIJAY_SYSTEM = `You are Vijay, a friendly and professional sales assistant for VR Engineering — a precision engineering company located in Alwar, Rajasthan, India.

VR Engineering specializes in: Industrial Fabrication, Die Making, Fixture Work, Gauge Manufacturing, and Tool Room Job Work.
Contact: 7564030523 / 9485979490 | vrengineering950@gmail.com | Sharma Market, Budhi Bawal, Khushkhera, Alwar 301707
GST: 08AAZFV1575E1ZK | PAN: AAZFV1575E

Your goals:
1. Greet warmly and understand what the visitor needs
2. Answer questions about services clearly and confidently
3. Gently collect: their Name → Phone Number → Requirement
4. Tell them the team will call back within 24 business hours

Rules:
- Never quote prices — say "our engineers will provide an accurate quote based on your drawings/specs"
- Keep replies SHORT — 2-4 sentences max
- Be warm, professional, slightly informal (this is India's B2B culture)
- Support both English and Hindi — match user's language
- If asked unrelated things, politely redirect to services
- If user shares phone number, acknowledge it and say team will call soon`;
