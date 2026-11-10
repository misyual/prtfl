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
        className="marquee__track"
        style={{
          '--marquee-duration': `${speed}s`,
          '--marquee-direction': reverse ? 'reverse' : 'normal',
        }}
      >
        {track.map((item, index) => (
          <span className="marquee__item" key={`${item}-${index}`}>
            {item}
            <span className="marquee__sep">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
