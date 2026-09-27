import { motion } from 'motion/react'

export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  y = 26,
  x = 0,
  duration = 0.7,
  once = true,
  amount = 0.25,
  ...rest
}) {
  const MotionTag = motion[Tag] ?? motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
