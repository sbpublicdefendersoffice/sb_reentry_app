import { useEffect, MutableRefObject } from 'react'

const useIntersectionStyle = (
  node: MutableRefObject<HTMLElement>,
  cssClass: string,
): void => {
  const observeForEffect = (node: HTMLElement): void => {
    const nodeObserver: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void =>
        entries.forEach((entry: IntersectionObserverEntry): void => {
          if (entry.isIntersecting) {
            node.classList.add(cssClass)
            nodeObserver.unobserve(node)
          }
        }),
    )

    nodeObserver.observe(node)
  }

  useEffect((): void => {
    if (node.current) observeForEffect(node.current)
  }, [])
}

export default useIntersectionStyle
