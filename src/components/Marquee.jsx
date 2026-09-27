import './Marquee.css'

export default function Marquee({
  items = [],
  separator = '\u2022',
  speed = 34,
  reverse = false,
  className = '',
}) {
  const track = [...items, ...items]

  return (
    <div className={`marquee ${className}`.trim()} aria-hidden="true">
      <div
        className="marquee-track"
        style={{
          '--marquee-duration': `${speed}s`,
          '--marquee-direction': reverse ? 'reverse' : 'normal',
        }}
      >
        {track.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
            <span className="marquee-sep">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
