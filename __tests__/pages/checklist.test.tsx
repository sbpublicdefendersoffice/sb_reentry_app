import { useRouter } from 'next/router'
// import { getPage } from 'next-page-tester'
import { waitFor, screen, fireEvent } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const push = jest.fn()

// @ts-ignore
useRouter.mockImplementation(() => ({ push }))

describe.skip('checklist page', () => {
  it('renders checklist page properly, and calls push', async () => {
    // const { render } = await getPage({
    //   route: '/checklist',
    //   useApp: true,
    // })
    // render()
    // const doc: HTMLElement = await waitFor(() =>
    //   screen.getByTestId('end_of_doc'),
    // )
    // const accordions: HTMLElement[] = await waitFor(() =>
    //   screen.getAllByTestId('accordion'),
    // )
    // accordions.forEach((node: HTMLElement) => fireEvent.click(node))
    // expect(doc).toBeInTheDocument()
    // accordions.forEach((node: HTMLElement) =>
    //   expect(node).toHaveAttribute('class', expect.stringMatching(/expanded/)),
    // )
    // const link: HTMLElement = await waitFor(() =>
    //   screen.getByTestId('test-link'),
    // )
    // fireEvent.click(link)
    // expect(push).toHaveBeenCalledWith('/search', 'search?query=pantry')
  })
})
