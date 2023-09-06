export const useScroll: (elementSelector?: string, offset?: number) => void = (
  elementSelector,
  offset
) => {
  const scrollOptions: ScrollToOptions = {
    top: 0 + (offset || 0),
    behavior: 'smooth'
  }

  if (elementSelector && document.querySelector(`${elementSelector}`)) {
    const element = document.querySelector(`${elementSelector}`)
    scrollOptions.top =
      window.scrollY +
      (element?.getBoundingClientRect().top || 0) +
      (offset || 0)
  }

  if (process.client) {
    window.scrollTo(scrollOptions)
  }
}
