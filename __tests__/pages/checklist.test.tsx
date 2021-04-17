import { getPage } from 'next-page-tester'

describe('know your rights', () => {
  it('renders know your rights', async () => {
    const { render } = await getPage({
      route: '/knowyourrights',
      useApp: true,
      useDocument: true,
    })

    render()
  })
})
