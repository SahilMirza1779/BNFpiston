// ============================================================
//  SITE SETTINGS – edit phone, email, address, stats here.
// ============================================================
export const site = {
  brand: 'BNF PISTON & RINGS',
  shortBrand: 'BNF',
  tagline: 'Motorcycle Spare Parts — Extra Heavy Duty / High Quality',
  company: 'BNF International Trade',
  contactPerson: 'Bilal Bhai',
  phoneDisplay: '+91 63536 10308',
  phoneRaw: '+916353610308',
  whatsappNumber: '916353610308',
  email: 'Bnfinternationaltrade78@gmail.com',
  addressLines: [
    '1st Floor, D-1/104, Gulshan-e-Faiz Residency,',
    'Opp. Lords Plaza, Ankleshwar – 393002,',
    'Gujarat, India',
  ],
  addressOneLine:
    '1st Floor, D-1/104, Gulshan-e-Faiz Residency, Opp. Lords Plaza, Ankleshwar – 393002, Gujarat, India',
  city: 'Ankleshwar, Gujarat',
  mapEmbed: 'https://www.google.com/maps?q=Lords+Plaza+Ankleshwar&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Lords+Plaza+Ankleshwar',
  url: 'https://www.bnfpistonrings.com', // change to the real domain
  defaultWhatsAppMessage: 'Hello Bilal bhai, I want to enquire about BNF Piston & Rings.',
  hours: [
    { day: 'Monday – Saturday', time: '10:00 AM – 7:00 PM' },
    { day: 'Sunday', time: 'Closed (WhatsApp replies available)' },
  ],
}

// Animated counters on the home page
export const stats = [
  { value: 100, suffix: '+', label: 'Models Covered' },
  { value: 500, suffix: '+', label: 'Dealers' },
  { value: 10000, suffix: '+', label: 'Kits Supplied' },
  { value: 100, suffix: '%', label: 'Quality Checked' },
]

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/#why-bnf', label: 'Why BNF' },
  { to: '/dealers', label: 'Dealers' },
  { to: '/contact', label: 'Contact' },
]

export const bikeBrands = ['Honda', 'Bajaj', 'Hero', 'Yamaha', 'TVS', 'Suzuki']
export const sizeOptions = ['STD', '25', '50', '75', '100']

export const waLink = (message = site.defaultWhatsAppMessage) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
