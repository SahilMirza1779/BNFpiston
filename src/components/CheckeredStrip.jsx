export default function CheckeredStrip({ red = false, height = 20, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`${red ? 'checkered-red' : 'checkered'} w-full ${className}`}
      style={{ height, backgroundSize: `${height}px ${height}px` }}
    />
  )
}
