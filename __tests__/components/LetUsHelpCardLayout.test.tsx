import { fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'

import { renderWithAllContext } from '../../__helpers__'

import LetUsHelpCardLayout, {
  LetUsHelpCardLayoutProps,
} from '../../components/LetUsHelpCardLayout'

import { url } from '../../constants/cards'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const push = jest.fn()

// @ts-ignore
useRouter.mockImplementation(() => ({ push }))

const cardProps: LetUsHelpCardLayoutProps = {
  heading: 'Hey, you need some help?',
  cards: [
    {
      title_english: 'Organization 1',
      title_spanish: 'Organización 1',
      copy_english: "We're here to help",
      copy_spanish: 'Nosotros estamos aqui para ayudar',
      category_english: 'Food',
      category_spanish: 'Comida',
      id: '123456',
    },
    {
      title_english: 'Organization 2',
      title_spanish: 'Organización 2',
      copy_english: 'We are also here',
      category_english: 'Transportation',
      category_spanish: 'Transporte',
      copy_spanish: 'Nosotros tambien estamos aqui',
      id: '789123',
    },
  ],
}

describe('<LetUpHelpCardLayout />', () => {
  it('renders correctly', () => {
    const { getByRole } = renderWithAllContext(
      <LetUsHelpCardLayout {...cardProps} />,
    )

    const CTANode: HTMLElement = getByRole('main')

    expect(CTANode).toBeInTheDocument()
  })

  it('calls push method correctly', () => {
    const { getAllByRole } = renderWithAllContext(
      <LetUsHelpCardLayout {...cardProps} />,
    )
    const linkNode: HTMLElement[] = getAllByRole('link')

    fireEvent.click(linkNode[0])

    expect(push).toHaveBeenCalledWith(url, `/orgs/${cardProps.cards[0].id}`)
  })
})
