# BNF Piston & Rings – Website

Website for **BNF International Trade**, Ankleshwar, Gujarat. Built with React, Vite, Tailwind CSS, React Router and Framer Motion.

---

## 1. Run it on your computer

You need [Node.js](https://nodejs.org) (version 18 or newer).

```bash
npm install      # only the first time
npm run dev      # starts the site at http://localhost:5173
```

## 2. Add your images

Put all photos inside `public/images/` with these exact names:

`logo.png`, `box-front.jpg`, `box-top.jpg`, `box-back.jpg`, `box-white-bg.jpg`, `carton.jpg`,
`gn5-top.jpg`, `gn5-top-label.jpg`, `gn5-side.jpg`, `piston-inside.jpg`, `piston-4view.jpg`,
`piston-crown-std.jpg`, `piston-crown-50.jpg`, `piston-kit-full.jpg`, `piston-kit-rings.jpg`,
`piston-pin-clips.jpg`, `rings-set.jpg`

If a picture is missing, the site shows a neutral placeholder instead of breaking.

## 3. Add or edit a product

Open `src/data/products.js`. Copy one product block, paste it at the end of the list, and change the values:

```js
{
  id: 15,                              // a new unique number
  slug: 'my-new-piston-kit',           // used in the web address (lowercase, dashes)
  name: 'My New Piston Kit',
  model: 'ABC123',
  category: 'Piston Kits',             // Piston Kits / Piston Rings / Piston Pins & Circlips / Oversize Pistons
  compatibleBrand: 'Honda',            // Honda, Bajaj, Hero, Yamaha, TVS, Suzuki
  compatibleBikes: ['Honda XYZ'],
  sizes,                               // or ['STD', '25', '50']
  images: [img('piston-kit-full.jpg')],// photos from public/images
  description: 'Short description here.',
  features: commonFeatures,
  inKit: standardKit,
  featured: false,                     // true = shown in the home page slider
}
```

Save the file – the site updates by itself. To remove a product, delete its block.
There are no prices on the site; every product shows "Price on Request".

## 4. Change phone, email, address, hours, numbers

Open `src/data/site.js`:

- `phoneDisplay`, `phoneRaw`, `whatsappNumber` – phone / WhatsApp (WhatsApp number has no `+`)
- `email`, `addressLines`, `addressOneLine`
- `hours` – business hours
- `stats` – the counters on the home page (Dealers, Kits Supplied …)
- `url` – set your real domain (used for SEO / sharing)

Other editable files: `src/data/faqs.js` (FAQ) and `src/data/testimonials.js`.
**The testimonials are samples – replace them with real dealer reviews before going live.**

## 5. Build and put it online

```bash
npm run build
```

This creates a `dist` folder – that is your final website.

**Hostinger:** open hPanel → File Manager → `public_html`, upload everything *inside* `dist`.
The file `.htaccess` (already included, copied from `public/.htaccess`) makes page refresh work on links like `/products`.
If you can't see `.htaccess`, turn on "show hidden files" in File Manager.

**Netlify:** drag and drop the `dist` folder on netlify.com/drop (the `_redirects` file is already included).

**Vercel:** import the project; `vercel.json` is already included. Build command `npm run build`, output folder `dist`.

## 6. How the enquiry works

There is no backend. "Add to Enquiry", the dealer form and the contact form open **WhatsApp** (`wa.me/916353610308`)
with the message already written. The enquiry list is saved in the visitor's browser.

## Project structure

```
src/
  components/   Navbar, Footer, ProductCard, EnquiryDrawer, Lightbox, home/ sections …
  pages/        Home, About, Products, ProductDetail, Dealers, Contact, NotFound
  data/         products.js, site.js, testimonials.js, faqs.js
  context/      EnquiryContext.jsx
  hooks/        small helpers
```
