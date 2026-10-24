import { Mail, MapPin, Phone } from 'lucide-react'
import { site } from '../data/site'

export default function TopBar() {
  return (
    <div className="hidden border-b border-gray-200 bg-gray-50 text-sm text-gray-600 md:block">
      <div className="container-x flex h-9 items-center justify-between">
        <div className="flex items-center gap-6">
          <a href={`tel:${site.phoneRaw}`} className="flex items-center gap-2 transition hover:text-brand">
            <Phone size={14} className="text-brand" /> {site.phoneDisplay}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition hover:text-brand">
            <Mail size={14} className="text-brand" /> {site.email}
          </a>
        </div>
        <span className="flex items-center gap-2">
          <MapPin size={14} className="text-brand" /> {site.city}
        </span>
      </div>
    </div>
  )
}
