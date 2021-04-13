export const resizeWindow = (width: number, height?: number): void => {
  // @ts-ignore
  window.innerWidth = width
  if (height)
    // @ts-ignore
    window.innerHeight = height
  window.dispatchEvent(new Event('resize'))
}
