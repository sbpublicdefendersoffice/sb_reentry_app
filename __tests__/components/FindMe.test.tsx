import { fireEvent, waitFor } from '@testing-library/react'
import { renderWithAllContext } from '../__helpers__'

import FindMe, { copy } from '../../components/FindMe'
import { SPANISH } from '../../constants/language'

it('renders correctly', async () => {
  const { getByRole } = renderWithAllContext(<FindMe />)

  const [buttonNode, imgNode] = [getByRole('button'), getByRole('img')]

  fireEvent.mouseOver(buttonNode)

  const popUpNode: HTMLElement = await waitFor(() => getByRole('note'))

  expect(buttonNode).toBeInTheDocument()
  expect(imgNode).toBeInTheDocument()
  expect(popUpNode).toBeInTheDocument()
})

it('renders english popup content correctly', async () => {
  const { getByRole } = renderWithAllContext(<FindMe />)
  const { popup } = copy.english

  const buttonNode: HTMLElement = getByRole('button')

  fireEvent.mouseOver(buttonNode)

  const popUpNode: HTMLElement = await waitFor(() => getByRole('note'))

  expect(popUpNode).toHaveTextContent(popup)
})

it('renders spanish popup content correctly', async () => {
  const { getByRole } = renderWithAllContext(<FindMe />, { language: SPANISH })
  const { popup } = copy.spanish

  const buttonNode: HTMLElement = getByRole('button')

  fireEvent.mouseOver(buttonNode)

  const popUpNode: HTMLElement = await waitFor(() => getByRole('note'))

  expect(popUpNode).toHaveTextContent(popup)
})
