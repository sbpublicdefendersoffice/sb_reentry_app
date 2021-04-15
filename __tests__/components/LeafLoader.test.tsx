import { render } from '@testing-library/react'

import LeafLoader from '../../components/LeafLoader'

describe('<LeafLoader />', () => {
  it('displays leaf loader properly', () => {
    const { getByRole } = render(<LeafLoader />)

    const leafLoaderNodes: HTMLElement[] = [getByRole('none'), getByRole('img')]

    leafLoaderNodes.forEach((node: HTMLElement): void =>
      expect(node).toBeInTheDocument(),
    )
  })
})
