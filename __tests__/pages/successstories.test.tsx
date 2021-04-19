import { getPage } from 'next-page-tester'

describe('success stories', () => {
  it('renders success stories', async () => {
    const { render } = await getPage({
      route: '/successstories',
      useApp: true,
      useDocument: true,
    })

    render()
  })
})
