import { fireEvent, waitFor } from '@testing-library/react'

import {
  renderWithAllContext,
  customFetch,
  dummyTranslatedRecordWithLocation,
} from '../../__helpers__/'

import { searchCopy, SPANISH } from '../../constants/'
import LiveDataSearch from '../../components/LiveDataSearch'

// @ts-ignore
window.fetch = customFetch(dummyTranslatedRecordWithLocation)

describe('<LiveDataSearch />', () => {
  it('renders correctly', () => {
    const { getByRole } = renderWithAllContext(<LiveDataSearch />)

    const dataSearchNode: HTMLElement = getByRole('search')

    expect(dataSearchNode).toBeInTheDocument()
  })

  it('renders english contect correctly', async () => {
    const { getByRole } = renderWithAllContext(<LiveDataSearch />)

    const { search, tooltip } = searchCopy.english

    const [inputNode, tooltipNode] = [
      getByRole('searchbox'),
      getByRole('tooltip'),
    ]

    fireEvent.mouseOver(tooltipNode)

    const popUpNode: HTMLElement = await waitFor(() => getByRole('note'))

    expect(inputNode).toHaveAttribute('placeholder', `${search}...`)
    expect(popUpNode).toHaveTextContent(tooltip)
  })

  it('renders spanish contect correctly', async () => {
    const { getByRole } = renderWithAllContext(<LiveDataSearch />, {
      language: SPANISH,
    })

    const { search, tooltip } = searchCopy.spanish

    const [inputNode, tooltipNode] = [
      getByRole('searchbox'),
      getByRole('tooltip'),
    ]

    fireEvent.mouseOver(tooltipNode)

    const popUpNode: HTMLElement = await waitFor(() => getByRole('note'))

    expect(inputNode).toHaveAttribute('placeholder', `${search}...`)
    expect(popUpNode).toHaveTextContent(tooltip)
  })

  it('preforms search as expected', async () => {
    const { getByRole, getAllByRole } = renderWithAllContext(
      <LiveDataSearch testWorkaround />,
    )

    const inputNode: HTMLElement = getByRole('searchbox')

    fireEvent.focus(inputNode)
    fireEvent.change(inputNode, { target: { value: 'food' } })

    const marqueeNodes: HTMLElement[] = await waitFor(() =>
      getAllByRole('listitem'),
    )

    expect(marqueeNodes).toHaveLength(1)
  })
})

// describe('<LiveDataSearch />', () => {
//   it('renders correctly', () => {
//     const { getByRole } = renderWithAllContext(<LiveDataSearch />)

//     const dataSearchNode: HTMLElement = getByRole('search')

//     expect(dataSearchNode).toBeInTheDocument()
//   })

//   it('renders english contect correctly', async () => {
//     const { getByRole } = renderWithAllContext(<LiveDataSearch />)

//     const { search, tooltip } = searchCopy.english

//     const [inputNode, tooltipNode] = [
//       getByRole('searchbox'),
//       getByRole('tooltip'),
//     ]

//     fireEvent.mouseOver(tooltipNode)

//     const popUpNode: HTMLElement = await waitFor(() => getByRole('note'))

//     expect(inputNode).toHaveAttribute('placeholder', `${search}...`)
//     expect(popUpNode).toHaveTextContent(tooltip)
//   })

//   it('renders spanish contect correctly', async () => {
//     const { getByRole } = renderWithAllContext(<LiveDataSearch />, {
//       language: SPANISH,
//     })

//     const { search, tooltip } = searchCopy.spanish

//     const [inputNode, tooltipNode] = [
//       getByRole('searchbox'),
//       getByRole('tooltip'),
//     ]

//     fireEvent.mouseOver(tooltipNode)

//     const popUpNode: HTMLElement = await waitFor(() => getByRole('note'))

//     expect(inputNode).toHaveAttribute('placeholder', `${search}...`)
//     expect(popUpNode).toHaveTextContent(tooltip)
//   })

//   it('preforms search as expected', async () => {
//     const { getByRole, getAllByRole } = renderWithAllContext(
//       <LiveDataSearch testWorkaround />,
//     )

//     const inputNode: HTMLElement = getByRole('searchbox')

//     fireEvent.focus(inputNode)
//     fireEvent.change(inputNode, { target: { value: 'mental health' } })

//     const marqueeNodes: HTMLElement[] = await waitFor(() =>
//       getAllByRole('listitem'),
//     )

//     expect(marqueeNodes).toHaveLength(3)
//   })
// })
