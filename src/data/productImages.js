const views = ['three-quarter', 'side profile', 'top view']
const escapeXml = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

function pistonArtwork(modelCode, index) {
  const sideWidth = index === 1 ? 106 + modelCode % 38 : 154 + modelCode % 42
  const left = 300 - sideWidth / 2
  const right = 300 + sideWidth / 2
  const isTop = index === 2
  const ringGrooves = Array.from({ length: 2 + modelCode % 3 }, (_, groove) => {
    const y = 228 + groove * 12
    return `<path d="M${left + 5} ${y} Q300 ${y + 18} ${right - 5} ${y}" fill="none" stroke="#475569" stroke-width="6" />`
  }).join('')

  return isTop
    ? `
      <ellipse cx="300" cy="292" rx="${142 + modelCode % 30}" ry="${162 + modelCode % 27}" fill="url(#metal)" filter="url(#shadow)" />
      <ellipse cx="300" cy="274" rx="${142 + modelCode % 30}" ry="${162 + modelCode % 27}" fill="url(#metal)" stroke="#64748b" stroke-width="3" />
      <ellipse cx="300" cy="274" rx="${118 + modelCode % 22}" ry="${136 + modelCode % 20}" fill="#dbe2e9" stroke="#f8fafc" stroke-width="6" />
      <ellipse cx="300" cy="274" rx="${86 + modelCode % 28}" ry="${101 + modelCode % 24}" fill="url(#crown)" stroke="#94a3b8" stroke-width="4" />
      <ellipse cx="300" cy="274" rx="34" ry="38" fill="#64748b" stroke="#f8fafc" stroke-width="8" />
      <ellipse cx="300" cy="274" rx="14" ry="16" fill="#263241" />
      <path d="M${300 - 140 - modelCode % 30} 154a${142 + modelCode % 30} ${162 + modelCode % 27} 0 0 1 ${280 + (modelCode % 30) * 2} 0" fill="none" stroke="#fff" stroke-width="8" opacity=".65" />
      <text x="300" y="283" text-anchor="middle" class="engraving">${index === 2 ? 'STD' : 'BNF'}</text>
    `
    : `
      <path d="M${left} 196 Q300 169 ${right} 196 L${right - 9} 385 Q300 431 ${left + 9} 385 Z" fill="url(#metal)" stroke="#64748b" stroke-width="3" filter="url(#shadow)" />
      <ellipse cx="300" cy="196" rx="${sideWidth / 2}" ry="35" fill="url(#crown)" stroke="#64748b" stroke-width="3" />
      <ellipse cx="300" cy="196" rx="${sideWidth / 2 - 18}" ry="22" fill="#cbd5df" stroke="#f8fafc" stroke-width="4" />
      ${ringGrooves}
      <path d="M${left + 16} 278 L${left + 23} 366 Q300 396 ${right - 23} 366 L${right - 16} 278" fill="url(#skirt)" opacity=".8" />
      <ellipse cx="300" cy="331" rx="${sideWidth / 2 - 10}" ry="27" fill="#718096" stroke="#475569" stroke-width="4" />
      <ellipse cx="300" cy="331" rx="${sideWidth / 2 - 24}" ry="13" fill="#263241" stroke="#dbe2e9" stroke-width="4" />
      <ellipse cx="300" cy="331" rx="${sideWidth / 2 - 43}" ry="7" fill="#94a3b8" />
      <path d="M${left + 20} 210 L${left + 27} 377" stroke="#fff" stroke-width="5" opacity=".5" />
      <text x="300" y="310" text-anchor="middle" class="engraving">B${modelCode % 97}</text>
      ${index === 0 ? `<path d="M${left + 32} 201 Q300 176 ${right - 32} 201" fill="none" stroke="#fff" stroke-width="5" opacity=".8" />` : ''}
    `
}

function ringsArtwork(index) {
  return [0, 1, 2].map((ring) => {
    const y = 190 + ring * 54
    const gap = 24 + index * 9 + ring * 7
    return `<ellipse cx="300" cy="${y}" rx="${190 - ring * 10}" ry="${38 - ring * 2}" fill="none" stroke="${ring === 1 ? '#475569' : '#aab4bf'}" stroke-width="${ring === 1 ? 17 : 13}" stroke-dasharray="${450 - gap} ${gap}" transform="rotate(${-12 + index * 7} 300 ${y})" />`
  }).join('')
}

function pinArtwork(index) {
  const rotation = [-12, 0, 14][index % 3] + Math.floor(index / 3) * 5
  return `
    <g transform="rotate(${rotation} 300 275)" filter="url(#shadow)">
      <rect x="118" y="226" width="364" height="98" rx="48" fill="url(#metal)" stroke="#64748b" stroke-width="4" />
      <ellipse cx="150" cy="275" rx="31" ry="48" fill="#64748b" stroke="#f8fafc" stroke-width="6" />
      <ellipse cx="150" cy="275" rx="15" ry="29" fill="#273342" stroke="#cbd5e1" stroke-width="4" />
      <ellipse cx="450" cy="275" rx="31" ry="48" fill="#9aa6b3" stroke="#f8fafc" stroke-width="6" />
      <ellipse cx="450" cy="275" rx="15" ry="29" fill="#273342" stroke="#64748b" stroke-width="4" />
      <path d="M183 238h220M183 312h220" stroke="#fff" stroke-width="5" opacity=".55" />
    </g>
    <g fill="none" stroke="#64748b" stroke-width="12">
      <path d="M180 393c-30-31 8-74 40-46 26 23-13 60-35 34" />
      <path d="M422 393c-30-31 8-74 40-46 26 23-13 60-35 34" />
    </g>
  `
}

function artwork(model, category, index) {
  const modelCode = [...model].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const safeModel = escapeXml(model)
  let object

  if (category === 'Piston Rings') {
    object = ringsArtwork(index)
  } else if (category === 'Piston Pins & Circlips') {
    object = pinArtwork(index + modelCode % 3)
  } else {
    object = pistonArtwork(modelCode, index)
  }

  if (category === 'Piston Kits') {
    object += `
      <g transform="translate(${modelCode % 17 - 8} 148) rotate(${modelCode % 25 - 12} 300 351) scale(.55)">
        <rect x="145" y="330" width="310" height="42" rx="21" fill="url(#metal)" stroke="#64748b" stroke-width="5" />
        <ellipse cx="158" cy="351" rx="18" ry="21" fill="#475569" stroke="#e2e8f0" stroke-width="4" />
        <ellipse cx="442" cy="351" rx="18" ry="21" fill="#475569" stroke="#e2e8f0" stroke-width="4" />
      </g>
      <g fill="none" stroke="#94a3b8" stroke-width="9">
        <ellipse cx="465" cy="444" rx="28" ry="12" transform="rotate(-25 465 444)" />
        <ellipse cx="465" cy="444" rx="15" ry="7" transform="rotate(-25 465 444)" />
      </g>
    `
  }

  const sizeMark = category === 'Oversize Pistons' ? ['+25', '+50', '+75'][index] : 'BNF'
  const subtitle = category === 'Piston Rings'
    ? ['Compression + oil rings', 'Precision ring profile', 'Ring set detail'][index]
    : category === 'Piston Pins & Circlips'
      ? ['Hardened pin set', 'Ground pin profile', 'Circlip detail'][index]
      : category === 'Oversize Pistons'
        ? [`Oversize ${sizeMark}`, `Oversize ${sizeMark}`, `Crown mark ${sizeMark}`][index]
        : ['Complete piston kit', 'Precision side profile', 'Piston crown detail'][index]

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" role="img">
      <defs>
        <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#fff" />
          <stop offset="1" stop-color="#e9eef3" />
        </linearGradient>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2=".15">
          <stop stop-color="#687584" />
          <stop offset=".2" stop-color="#eef2f5" />
          <stop offset=".42" stop-color="#9aa6b3" />
          <stop offset=".68" stop-color="#f8fafc" />
          <stop offset="1" stop-color="#647180" />
        </linearGradient>
        <linearGradient id="crown" x1="0" y1="0" x2=".8" y2="1">
          <stop stop-color="#f8fafc" />
          <stop offset=".5" stop-color="#bac4ce" />
          <stop offset="1" stop-color="#798694" />
        </linearGradient>
        <linearGradient id="skirt" x1="0" y1="0" x2="1" y2="0">
          <stop stop-color="#647180" />
          <stop offset=".5" stop-color="#dbe2e9" />
          <stop offset="1" stop-color="#647180" />
        </linearGradient>
        <filter id="shadow" x="-.3" y="-.3" width="1.6" height="1.8">
          <feDropShadow dx="0" dy="16" stdDeviation="13" flood-color="#334155" flood-opacity=".23" />
        </filter>
        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0v24" fill="none" stroke="#64748b" stroke-opacity=".08" />
        </pattern>
        <style>
          .label { font: 700 20px system-ui, sans-serif; letter-spacing: 2px; fill: #d7262b; }
          .model { font: 800 27px system-ui, sans-serif; letter-spacing: 1px; fill: #172033; }
          .subtitle { font: 500 14px system-ui, sans-serif; letter-spacing: 2px; fill: #64748b; }
          .engraving { font: 800 16px system-ui, sans-serif; letter-spacing: 2px; fill: #526070; }
        </style>
      </defs>
      <rect width="600" height="600" fill="url(#background)" />
      <rect width="600" height="600" fill="url(#grid)" />
      <circle cx="490" cy="102" r="68" fill="#d7262b" opacity=".045" />
      <path d="M36 80h92M36 91h56" stroke="#d7262b" stroke-width="3" opacity=".45" />
      <ellipse cx="300" cy="452" rx="190" ry="23" fill="#334155" opacity=".09" />
      ${object}
      <path d="M36 488h528" stroke="#cbd5e1" stroke-width="2" />
      <text x="38" y="526" class="label">BNF  /  ${category === 'Piston Kits' ? 'PISTON KIT' : category === 'Piston Rings' ? 'RING SET' : category === 'Piston Pins & Circlips' ? 'PIN + CIRCLIPS' : 'OVERSIZE PISTON'}</text>
      <text x="38" y="563" class="model">${safeModel}</text>
      <text x="562" y="559" text-anchor="end" class="subtitle">${subtitle.toUpperCase()}</text>
      <text x="562" y="584" text-anchor="end" class="subtitle">VIEW 0${index + 1}</text>
    </svg>
  `
}

export function createProductImages(model, category) {
  return views.map((_, index) => {
    const svg = artwork(model, category, index)
    return `data:image/svg+xml,${encodeURIComponent(svg)}`
  })
}

export function createPackagingImages() {
  const views = [
    { name: 'BNF Piston Kit', detail: 'FRONT OF TIN BOX', view: 'FRONT' },
    { name: 'Genuine Parts', detail: 'MODEL LABEL + SEAL', view: 'BACK' },
    { name: 'Precision Packed', detail: 'LID DETAIL', view: 'TOP' },
    { name: 'Dealer Supply', detail: 'WHOLESALE CARTON', view: 'CARTON' },
  ]

  return views.map(({ name, detail, view }, index) => {
    const illustration = index === 3
      ? `
        <path d="M120 226 300 158l180 68-180 76z" fill="#c68a48" stroke="#8d5b2b" stroke-width="5" />
        <path d="M120 226v150l180 86V302z" fill="#dca45f" stroke="#8d5b2b" stroke-width="5" />
        <path d="M480 226v150l-180 86V302z" fill="#ba7b3c" stroke="#8d5b2b" stroke-width="5" />
        <path d="m300 158 0 144m-180-76 180 76 180-76" fill="none" stroke="#8d5b2b" stroke-width="4" />
        <rect x="232" y="317" width="136" height="54" rx="4" fill="#fff" stroke="#cbd5e1" stroke-width="3" />
        <text x="300" y="341" text-anchor="middle" class="brand">BNF</text>
        <text x="300" y="359" text-anchor="middle" class="small">PISTON KITS</text>
      `
      : index === 2
        ? `
          <g filter="url(#shadow)">
            <rect x="155" y="170" width="290" height="250" rx="30" fill="url(#metal)" stroke="#64748b" stroke-width="5" />
            <rect x="174" y="190" width="252" height="210" rx="23" fill="#f8fafc" stroke="#94a3b8" stroke-width="4" />
            <path d="M197 235h205" stroke="#d7262b" stroke-width="8" />
            <text x="300" y="305" text-anchor="middle" class="brand">BNF</text>
            <text x="300" y="342" text-anchor="middle" class="mid">PISTON KIT</text>
            <text x="300" y="370" text-anchor="middle" class="small">PRECISION ENGINEERED</text>
          </g>
        `
        : `
          <g filter="url(#shadow)">
            <path d="M184 208h232v194q0 22-22 22H206q-22 0-22-22z" fill="url(#metal)" stroke="#64748b" stroke-width="5" />
            <path d="M174 190h252v43H174z" fill="#d7262b" stroke="#a51c20" stroke-width="4" />
            <path d="M190 247h220v151H190z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3" />
            <text x="300" y="302" text-anchor="middle" class="brand">BNF</text>
            <text x="300" y="337" text-anchor="middle" class="mid">${name}</text>
            <text x="300" y="365" text-anchor="middle" class="small">${index === 0 ? 'EXTRA HEAVY DUTY' : 'CHECK MODEL BEFORE FITTING'}</text>
            <path d="M204 388h192" stroke="#d7262b" stroke-width="5" />
          </g>
        `

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="#e9eef3"/></linearGradient>
          <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#7b8794"/><stop offset=".25" stop-color="#f8fafc"/><stop offset=".65" stop-color="#cbd5df"/><stop offset="1" stop-color="#718096"/></linearGradient>
          <filter id="shadow" x="-.3" y="-.3" width="1.6" height="1.8"><feDropShadow dx="0" dy="14" stdDeviation="12" flood-color="#334155" flood-opacity=".2"/></filter>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0v24" fill="none" stroke="#64748b" stroke-opacity=".07"/></pattern>
          <style>
            .brand{font:900 44px system-ui,sans-serif;letter-spacing:5px;fill:#d7262b}
            .mid{font:800 20px system-ui,sans-serif;letter-spacing:1px;fill:#172033}
            .small{font:600 12px system-ui,sans-serif;letter-spacing:2px;fill:#64748b}
            .label{font:800 20px system-ui,sans-serif;letter-spacing:2px;fill:#172033}
          </style>
        </defs>
        <rect width="600" height="600" fill="url(#bg)"/><rect width="600" height="600" fill="url(#grid)"/>
        <circle cx="490" cy="105" r="68" fill="#d7262b" opacity=".045"/>
        <ellipse cx="300" cy="452" rx="190" ry="20" fill="#334155" opacity=".09"/>
        ${illustration}
        <path d="M36 488h528" stroke="#cbd5e1" stroke-width="2"/>
        <text x="38" y="533" class="label">${detail}</text>
        <text x="562" y="570" text-anchor="end" class="small">BNF INTERNATIONAL TRADE · ${view}</text>
      </svg>
    `

    return `data:image/svg+xml,${encodeURIComponent(svg)}`
  })
}
