import { getPage } from 'next-page-tester'

describe('about us', () => {
  it('renders about us', async () => {
    const { render } = await getPage({
      route: '/aboutus',
      useApp: true,
      useDocument: true,
    })

    render()
  })
})
