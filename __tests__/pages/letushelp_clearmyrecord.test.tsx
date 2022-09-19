import { useRouter } from 'next/router'
// import { getPage } from 'next-page-tester'
import { waitFor, screen, fireEvent } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const back = jest.fn()

// @ts-ignore
useRouter.mockImplementation(() => ({ back }))

describe.skip('clear my record page', () => {
  it('renders clear my record page and calls back method', async () => {
    // const { render } = await getPage({
    //   route: '/letushelp/clearmyrecord',
    //   useApp: true,
    // })
    // render()
    // const [docNode, backButtonNode] = [
    //   await waitFor(() => screen.getByTestId('end_of_doc')),
    //   await waitFor(() => screen.getByTestId('BackButton')),
    // ]
    // fireEvent.click(backButtonNode)
    // expect(docNode).toBeInTheDocument()
    // expect(back).toHaveBeenCalled()
  })
})
