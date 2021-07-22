import { renderWithLanguage, blankSBCoords as coords } from '../../__helpers__'

import { SPANISH } from '../../constants/language'

import ProximityFilter, {
  ProximityFilterProps,
  copy,
  proximityValues,
} from '../../components/ProximityFilter'

const dummyProps: ProximityFilterProps = {
  coords,
  locationsToFilter: [],
  setLocRecordsToFilter: () => {},
  radiusDistance: 1,
}

describe('<ProximityFilter />', () => {
  it('menu renders correctly', () => {
    const { getByRole } = renderWithLanguage(
      <ProximityFilter {...dummyProps} />,
    )

    const proxFilterNode: HTMLElement = getByRole('menu')

    expect(proxFilterNode).toBeInTheDocument()
  })

  it('select component renders correctly', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(
      <ProximityFilter {...dummyProps} />,
    )

    const selectNode: HTMLElement = getByRole('group')
    const optionNodes: HTMLElement[] = getAllByRole('option')
    const firstOptionNode: HTMLElement = optionNodes.shift()

    expect(selectNode).toHaveValue(String(dummyProps.radiusDistance))

    expect(firstOptionNode).toHaveValue(String(1000))

    optionNodes.forEach((node: HTMLElement, i: number) =>
      expect(node).toHaveValue(String(proximityValues[i])),
    )
  })

  it('renders english content correctly', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(
      <ProximityFilter {...dummyProps} />,
    )

    const labelNode: HTMLElement = getByRole('note')

    const optionNode: HTMLElement = getAllByRole('option')[1]

    const { located, mile } = copy.english

    const optionValue: string = `${dummyProps.radiusDistance} ${mile}`

    expect(labelNode).toHaveTextContent(located)

    expect(optionNode).toHaveTextContent(optionValue)
  })

  it('renders spanish content correctly', () => {
    const { getByRole, getAllByRole } = renderWithLanguage(
      <ProximityFilter {...dummyProps} />,
      SPANISH,
    )

    const labelNode: HTMLElement = getByRole('note')

    const optionNode: HTMLElement = getAllByRole('option')[1]

    const { located, mile } = copy.spanish

    const optionValue: string = `${dummyProps.radiusDistance} ${mile}`

    expect(labelNode).toHaveTextContent(located)

    expect(optionNode).toHaveTextContent(optionValue)
  })
})
