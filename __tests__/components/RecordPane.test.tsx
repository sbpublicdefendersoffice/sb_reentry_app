import { fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'

import {
  renderWithAllContext,
  dummyTranslateRecordResponse,
  blankTranslateRecordResponse,
} from '../../__helpers__/'

import { SPANISH } from '../../constants/language'

import RecordPane, { RecordPaneProps } from '../../components/RecordPane'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const push = jest.fn()
// @ts-ignore
useRouter.mockImplementation(() => ({ push }))

const dummyProps: RecordPaneProps = {
  displayCategory: 'Transportation',
  routeCategory: 'transportation',
  orgInfo: dummyTranslateRecordResponse,
  setRecords: () => {},
}

describe('<RecordPane />', () => {
  it('renders LeafLoader when orgInfo prop is null', () => {
    const { getByRole } = renderWithAllContext(
      <RecordPane {...dummyProps} orgInfo={null} />,
    )

    const leafLoaderNode: HTMLElement = getByRole('none')

    expect(leafLoaderNode).toBeInTheDocument()
  })

  it('renders correctly with data passed down', () => {
    const { getByRole, getAllByRole } = renderWithAllContext(
      <RecordPane {...dummyProps} />,
    )

    const paneNodes: HTMLElement[] = [
      'menu',
      'list',
      'searchbox',
    ].map((role: string) => getByRole(role))
    const orgRecordNodes: HTMLElement[] = getAllByRole('region')
    const titleNode: HTMLElement = getAllByRole('heading')[0]

    paneNodes.forEach((node: HTMLElement) => expect(node).toBeInTheDocument())
    expect(titleNode).toHaveTextContent(dummyProps.displayCategory)
    expect(orgRecordNodes).toHaveLength(2)
    expect(() => getByRole('none')).toThrowError()
  })

  it('does not render other components when data is not passed down', () => {
    const { getByRole } = renderWithAllContext(
      <RecordPane {...dummyProps} orgInfo={blankTranslateRecordResponse} />,
    )

    expect(() => getByRole('region')).toThrowError()
  })

  it('renders english specific content correctly', () => {
    const { getByRole } = renderWithAllContext(<RecordPane {...dummyProps} />)

    const summaryNode: HTMLElement = getByRole('definition')

    const summaryText: string = `${dummyProps.displayCategory} Records`

    expect(summaryNode).toHaveTextContent(summaryText)
  })

  it('renders spanish specific content correctly', () => {
    const { getByRole } = renderWithAllContext(<RecordPane {...dummyProps} />, {
      language: SPANISH,
    })

    const summaryNode: HTMLElement = getByRole('definition')

    const summaryText: string = `${dummyProps.displayCategory} Registros`

    expect(summaryNode).toHaveTextContent(summaryText)
  })

  it('calls push when the requested url and the current url are different', () => {
    const { getAllByRole } = renderWithAllContext(
      <RecordPane {...dummyProps} />,
    )

    const titleNode: HTMLElement = getAllByRole('heading')[0]

    fireEvent.click(titleNode)

    expect(push).toHaveBeenCalled()
  })
})
