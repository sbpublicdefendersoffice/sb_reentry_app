import { fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'

import { renderWithRouter, englishDummyOrgData } from '../../__helpers__'

import OrgRecordCard, {
  OrgRecordCardProps,
  urlSlug,
} from '../../components/OrgRecordCard'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const push = jest.fn()

// @ts-ignore
useRouter.mockImplementation(() => ({ push }))

const dummyProps: OrgRecordCardProps = {
  record: englishDummyOrgData,
}

describe('<OrgRecordCard />', () => {
  it('renders correctly', () => {
    const { getByRole, getAllByRole } = renderWithRouter(
      <OrgRecordCard {...dummyProps} />,
    )

    const { record } = dummyProps
    const { id, fields } = record
    const { org_categories, org_name } = fields

    const category: string = org_categories[0]

    const [cardNode, imgNode, titleNode, categoryNodes] = [
      getByRole('region'),
      getByRole('img'),
      getByRole('heading'),
      getAllByRole('term'),
    ]

    expect(cardNode).toBeInTheDocument()

    expect(imgNode).toHaveAttribute('title', id)
    expect(imgNode).toHaveAttribute('src', `./icons/${category}.svg`)
    expect(imgNode).toHaveAttribute('alt', `${category}_icon`)

    expect(titleNode).toHaveTextContent(org_name)

    expect(categoryNodes).toHaveLength(org_categories.length)
  })

  it('pushes to correct record', () => {
    const { getByRole } = renderWithRouter(<OrgRecordCard {...dummyProps} />)

    const cardNode: HTMLElement = getByRole('region')

    const { record } = dummyProps
    const { id, fields } = record
    const { org_categories } = fields

    const pushUrl: string = `${org_categories[0]}/${id}`

    fireEvent.click(cardNode)

    expect(push).toHaveBeenCalledWith(urlSlug, pushUrl)
  })
})
