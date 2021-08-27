import { fireEvent } from '@testing-library/react'

import { renderWithAllContext, customFetch } from '../../__helpers__/'

import { copy as parentCopy } from '../../components/IsThisUsefulTag'
import IsThisUsefulForm, {
  copy,
  IsThisUsefulFormProps,
} from '../../components/IsThisUsefulForm'

import { Feedback } from '../../types/records'
import { SPANISH, ENGLISH } from '../../constants/language'

const blankFeedback: Feedback = {
  is_useful: 0,
  route: '/',
  language: ENGLISH,
  comment: '',
}

const defaultProps: IsThisUsefulFormProps = {
  feedbackInfo: blankFeedback,
  setFeedbackInfo: () => {},
  activeParentCopy: parentCopy.english,
}

describe('<IsThisUsefulForm />', () => {
  it('renders correctly and calls blank submit function', () => {
    const { getByRole } = renderWithAllContext(
      <IsThisUsefulForm {...defaultProps} />,
    )

    const formNode: HTMLElement = getByRole('form')
    const textboxNode: HTMLElement = getByRole('textbox')

    expect(formNode).toBeInTheDocument()
    expect(textboxNode).toBeInTheDocument()
  })

  it('renders static english content correctly', () => {
    const { getByRole, getAllByRole } = renderWithAllContext(
      <IsThisUsefulForm {...defaultProps} />,
    )

    const { useful, yes, no } = parentCopy.english
    const { buttonCopy } = copy.english

    const buttonNode: HTMLElement = getByRole('button')
    const articleNode: HTMLElement = getAllByRole('article')[0]
    const [yesNode, noNode] = getAllByRole('aria-label')

    expect(buttonNode).toHaveTextContent(buttonCopy)
    expect(articleNode).toHaveTextContent(useful)
    expect(yesNode).toHaveTextContent(yes)
    expect(noNode).toHaveTextContent(no)
  })

  it('renders static spanish content correctly', () => {
    const { getByRole, getAllByRole } = renderWithAllContext(
      <IsThisUsefulForm
        {...defaultProps}
        feedbackInfo={{ ...blankFeedback, language: SPANISH }}
        activeParentCopy={parentCopy.spanish}
      />,
      { language: SPANISH },
    )

    const { useful, yes, no } = parentCopy.spanish
    const { buttonCopy } = copy.spanish

    const buttonNode: HTMLElement = getByRole('button')
    const articleNode: HTMLElement = getAllByRole('article')[0]
    const [yesNode, noNode] = getAllByRole('aria-label')

    expect(buttonNode).toHaveTextContent(buttonCopy)
    expect(articleNode).toHaveTextContent(useful)
    expect(yesNode).toHaveTextContent(yes)
    expect(noNode).toHaveTextContent(no)
  })

  it('calls submit function sucessfully', () => {
    // @ts-ignore
    window.fetch = customFetch({ approval: 'okay' })

    const { getByRole } = renderWithAllContext(
      <IsThisUsefulForm {...defaultProps} />,
    )

    const buttonNode: HTMLElement = getByRole('button')

    fireEvent.click(buttonNode)

    expect(window.fetch).toHaveBeenCalled()
  })

  it('displays error when error returns from api call', () => {
    // @ts-ignore
    window.fetch = customFetch({ error: "that's messed up" })

    const { getByRole } = renderWithAllContext(
      <IsThisUsefulForm {...defaultProps} />,
    )

    const buttonNode: HTMLElement = getByRole('button')

    fireEvent.click(buttonNode)

    expect(window.fetch).toHaveBeenCalled()
  })
})
