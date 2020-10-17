import { ReactElement, FC } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@trussworks/react-uswds'

const BackButton: FC = (): ReactElement => {
  const { back } = useRouter()

  return (
    <Button
      className="margin-left-3"
      type="button"
      onClick={(): void => back()}
    >
      Back
    </Button>
  )
}

export default BackButton
