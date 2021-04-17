import { getPage } from 'next-page-tester'

describe('search', () => {
  it('renders search', async () => {
    const { render } = await getPage({
      route: '/search',
      useApp: true,
      useDocument: true,
    })

    render()
  })
})
