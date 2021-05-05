import { renderWithLanguage } from '../../__helpers__/contexts'

import { SPANISH } from '../../constants/language'

import {
  copy as parentCopy,
  route,
} from '../../pages/letushelp/diversion/apply'
import ApplyForService, { copy } from '../../components/ApplyForService'

describe('<ApplyForService />', () => {
  it('Renders english content', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(
      <ApplyForService parentCopy={parentCopy.english} route={route} />,
    )

    const { submit, click, disclaimer } = copy.english
    const { apply, learn } = parentCopy.english

    const [titleNode, buttonNode] = [getByRole('heading'), getByRole('button')]
    const [clickHereNode, disclaimerNode] = getAllByRole('article')

    expect(titleNode).toHaveTextContent(apply)
    expect(buttonNode).toHaveTextContent(submit)
    expect(clickHereNode).toHaveTextContent(`${learn} ${click}`)
    expect(disclaimerNode).toHaveTextContent(disclaimer)
  })

  it('Renders spanish content', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(
      <ApplyForService parentCopy={parentCopy.spanish} route={route} />,
      SPANISH,
    )

    const { submit, click, disclaimer } = copy.spanish
    const { apply, learn } = parentCopy.spanish

    const [titleNode, buttonNode] = [getByRole('heading'), getByRole('button')]
    const [clickHereNode, disclaimerNode] = getAllByRole('article')

    expect(titleNode).toHaveTextContent(apply)
    expect(buttonNode).toHaveTextContent(submit)
    expect(clickHereNode).toHaveTextContent(`${learn} ${click}`)
    expect(disclaimerNode).toHaveTextContent(disclaimer)
  })
})
