export const wrModalAnimate = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
    },
  },
  final: {
    opacity: 0,
    duration: 1,
    when: 'afterChildren',
  },
}

export const innerModalVariants = {
  start: {
    opacity: 0,
    y: -300,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
  final: {
    scale: 0,
    opacity: 0,
    duration: 0.5,
  },
}
