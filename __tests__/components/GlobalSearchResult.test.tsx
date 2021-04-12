import { render } from '@testing-library/react'

import {
  englishDummyOrgData,
  spanishDummyOrgData,
} from '../__helpers__/dummyData'
import GlobalSearchResult, {
  GlobalSearchResultProps,
} from '../../components/GlobalSearchResult'

const globalSearchResultTestProps: GlobalSearchResultProps = {
  record: englishDummyOrgData,
  delimiter: ', ',
  setIsFocused: () => {},
}

describe('<GlobalSearchResult />', () => {
  it('renders language agnostic content correctly', () => {
    const { getByRole } = render(
      <GlobalSearchResult {...globalSearchResultTestProps} />,
    )

    const imgSrc: string =
      globalSearchResultTestProps.record.fields.org_categories[0]

    const [liNode, imgNode] = [getByRole('listitem'), getByRole('img')]

    expect(liNode).toBeInTheDocument()
    expect(imgNode).toHaveAttribute(
      'src',
      `./icons/${imgSrc.replace(' ', '')}.svg`,
    )
    expect(imgNode).toHaveAttribute('alt', `${imgSrc}_icon`)
  })

  it('renders english specific content correctly', () => {
    const { getByRole } = render(
      <GlobalSearchResult {...globalSearchResultTestProps} />,
    )
    const { record, delimiter } = globalSearchResultTestProps
    const { fields } = record
    const { org_name, org_tags } = fields

    const [nameNode, termsNode] = [getByRole('heading'), getByRole('term')]

    expect(nameNode).toHaveTextContent(org_name)
    expect(termsNode).toHaveTextContent(org_tags.join(delimiter))
  })

  it('renders spanish specific content correctly', () => {
    const { getByRole } = render(
      <GlobalSearchResult
        {...globalSearchResultTestProps}
        record={spanishDummyOrgData}
      />,
    )
    const { delimiter } = globalSearchResultTestProps
    const { fields } = spanishDummyOrgData
    const { org_name_spanish, org_tags_spanish } = fields

    const [nameNode, termsNode] = [getByRole('heading'), getByRole('term')]

    expect(nameNode).toHaveTextContent(org_name_spanish)
    expect(termsNode).toHaveTextContent(org_tags_spanish.join(delimiter))
  })
})
