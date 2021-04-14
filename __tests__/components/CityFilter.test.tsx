import { fireEvent } from '@testing-library/dom'

import { renderWithLanguage } from '../../__helpers__'
import { allRegionsVisible, SPANISH } from '../../constants'

import CityFilter, { CityFilterProps, copy } from '../../components/CityFilter'

const cityFilterProps: CityFilterProps = {
  locationsToFilter: [{}],
  setLocRecordsToFilter: () => {},
  regionVisibility: allRegionsVisible,
}

describe('<CityFilter />', () => {
  it('renders form and checkboxes', () => {
    const { getAllByRole, getByRole } = renderWithLanguage(
      <CityFilter {...cityFilterProps} />,
    )

    const formNode: HTMLElement = getByRole('form')
    const checkboxNodes: HTMLElement[] = getAllByRole('checkbox')

    expect(formNode).toBeInTheDocument()
    expect(checkboxNodes).toHaveLength(3)
  })

  it('renders all checkboxes as checked when all regionVisibility prop attributes are true', () => {
    const { getAllByRole } = renderWithLanguage(
      <CityFilter {...cityFilterProps} />,
    )

    const checkboxNodes: HTMLElement[] = getAllByRole('checkbox')

    checkboxNodes.forEach((node: HTMLElement): void =>
      expect(node).toHaveAttribute('checked'),
    )
  })

  it('displays checkboxes as checked only when corresponding regionVisibility prop is passed down', () => {
    const { getAllByRole } = renderWithLanguage(
      <CityFilter
        {...cityFilterProps}
        regionVisibility={{
          ...allRegionsVisible,
          southCounty: false,
        }}
      />,
    )

    const [southCounty, centralCounty, northCounty] = getAllByRole('checkbox')

    expect(southCounty).not.toHaveAttribute('checked')
    expect(centralCounty).toHaveAttribute('checked')
    expect(northCounty).toHaveAttribute('checked')
  })

  it('displays labels properly in english', () => {
    const { getAllByRole } = renderWithLanguage(
      <CityFilter {...cityFilterProps} />,
    )

    const countyLabels: HTMLElement[] = getAllByRole('label')
    const textValues: string[] = Object.values(copy.english)

    countyLabels.forEach((node: HTMLElement, i: number): void =>
      expect(node).toHaveTextContent(textValues[i]),
    )
  })

  it('displays labels properly in spanish', () => {
    const { getAllByRole } = renderWithLanguage(
      <CityFilter {...cityFilterProps} />,
      SPANISH,
    )

    const countyLabels: HTMLElement[] = getAllByRole('label')
    const textValues: string[] = Object.values(copy.spanish)

    countyLabels.forEach((node: HTMLElement, i: number): void =>
      expect(node).toHaveTextContent(textValues[i]),
    )
  })

  it('changes checked attribute status when checkbox is clicked', () => {
    const { getAllByRole } = renderWithLanguage(
      <CityFilter {...cityFilterProps} />,
    )

    const checkboxToClick: HTMLElement = getAllByRole('checkbox')[0]

    expect(checkboxToClick).toHaveAttribute('checked')

    fireEvent.click(checkboxToClick)

    expect(checkboxToClick).toHaveAttribute('checked', '')
  })
})
