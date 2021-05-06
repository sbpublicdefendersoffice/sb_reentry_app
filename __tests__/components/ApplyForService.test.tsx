import { renderWithLanguage } from '../../__helpers__/contexts'

import { SPANISH } from '../../constants/language'

import { applicationPageData } from '../../constants/copy'
import ApplyForService, { copy } from '../../components/ApplyForService'

const route: string = 'diversion'
const testCopy = applicationPageData[route]

describe('<ApplyForService />', () => {
  it('Renders english content', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(
      <ApplyForService parentCopy={testCopy.english} route={route} />,
    )

    const { submit, click, disclaimer } = copy.english
    const { apply, learn } = testCopy.english

    const [titleNode, buttonNode] = [getByRole('heading'), getByRole('button')]
    const [clickHereNode, disclaimerNode] = getAllByRole('article')

    expect(titleNode).toHaveTextContent(apply)
    expect(buttonNode).toHaveTextContent(submit)
    expect(clickHereNode).toHaveTextContent(`${learn} ${click}`)
    expect(disclaimerNode).toHaveTextContent(disclaimer)
  })

  it('Renders spanish content', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(
      <ApplyForService parentCopy={testCopy.spanish} route={route} />,
      SPANISH,
    )

    const { submit, click, disclaimer } = copy.spanish
    const { apply, learn } = testCopy.spanish

    const [titleNode, buttonNode] = [getByRole('heading'), getByRole('button')]
    const [clickHereNode, disclaimerNode] = getAllByRole('article')

    expect(titleNode).toHaveTextContent(apply)
    expect(buttonNode).toHaveTextContent(submit)
    expect(clickHereNode).toHaveTextContent(`${learn} ${click}`)
    expect(disclaimerNode).toHaveTextContent(disclaimer)
  })
})
