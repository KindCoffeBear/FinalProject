// Анимация всей модалки
export const modalWrapperVariants = {
  start: {
    opacity: 0,
  },
  view: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
    },
  },
  end: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
}

// анимация формы в модалке
export const modalInnerVariants = {
  start: {
    scale: 0,
    opacity: 0,
    rotate: 360,
  },
  view: {
    scale: 1,
    opacity: 1,
    rotate: 0,
  },
  end: {
    scale: 0,
    opacity: 0,
    rotate: 360,
  },
}
