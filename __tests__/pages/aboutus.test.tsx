import { getPage } from 'next-page-tester'

describe('category', () => {
  it('renders a category page', async () => {
    const { render } = await getPage({
      route: '/food',
      useApp: true,
      useDocument: true,
    })

    render()
  })
})
