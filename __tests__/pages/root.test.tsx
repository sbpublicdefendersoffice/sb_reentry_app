import { getPage } from 'next-page-tester'

describe('home', () => {
  it('renders home page', async () => {
    const { render } = await getPage({
      route: '/',
      useApp: true,
      useDocument: true,
    })

    render()
  })
})
