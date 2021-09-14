import { fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'

import { renderWithAllContext, dummyPGOrgRecord } from '../../__helpers__'

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
  record: dummyPGOrgRecord,
}

describe('<OrgRecordCard />', () => {
  it('renders correctly', () => {
    const { getByRole, getAllByRole } = renderWithAllContext(
      <OrgRecordCard {...dummyProps} />,
    )

    const { categories_english, name_english, id } = dummyProps.record

    const category: string = categories_english[0]

    const [cardNode, imgNode, titleNode, categoryNodes] = [
      getByRole('region'),
      getByRole('img'),
      getByRole('heading'),
      getAllByRole('term'),
    ]

    expect(cardNode).toBeInTheDocument()

    expect(imgNode).toHaveAttribute('title', String(id))
    expect(imgNode).toHaveAttribute('src', `/icons/${category}.svg`)
    expect(imgNode).toHaveAttribute('alt', `${category}_icon`)

    expect(titleNode).toHaveTextContent(name_english)

    expect(categoryNodes).toHaveLength(categories_english.length)
  })

  it('pushes to correct record', () => {
    const { getByRole } = renderWithAllContext(
      <OrgRecordCard {...dummyProps} />,
    )

    const cardNode: HTMLElement = getByRole('region')

    const { id } = dummyProps.record

    const pushUrl: string = `/orgs/${id}`

    fireEvent.click(cardNode)

    expect(push).toHaveBeenCalledWith(urlSlug, pushUrl)
  })
})

// describe('<OrgRecordCard />', () => {
//   it('renders correctly', () => {
//     const { getByRole, getAllByRole } = renderWithAllContext(
//       <OrgRecordCard {...dummyProps} />,
//     )

//     const { categories_english, name_english, id } = dummyProps.record

//     const category: string = categories_english[0]

//     const [cardNode, imgNode, titleNode, categoryNodes] = [
//       getByRole('region'),
//       getByRole('img'),
//       getByRole('heading'),
//       getAllByRole('term'),
//     ]

//     expect(cardNode).toBeInTheDocument()

//     expect(imgNode).toHaveAttribute('title', id)
//     expect(imgNode).toHaveAttribute('src', `/icons/${category}.svg`)
//     expect(imgNode).toHaveAttribute('alt', `${category}_icon`)

//     expect(titleNode).toHaveTextContent(name_english)

//     expect(categoryNodes).toHaveLength(org_categories.length)
//   })

//   it('pushes to correct record', () => {
//     const { getByRole } = renderWithAllContext(
//       <OrgRecordCard {...dummyProps} />,
//     )

//     const cardNode: HTMLElement = getByRole('region')

//     const { record } = dummyProps
//     const { id, fields } = record
//     const { org_categories } = fields

//     const pushUrl: string = `/${org_categories[0]}/${id}`

//     fireEvent.click(cardNode)

//     expect(push).toHaveBeenCalledWith(urlSlug, pushUrl)
//   })
// })
