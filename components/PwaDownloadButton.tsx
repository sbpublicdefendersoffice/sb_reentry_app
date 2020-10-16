import { ReactElement, FC } from 'react'
import { Button } from '@trussworks/react-uswds'

import { BeforeInstallPromptEvent } from '../pages/index'

interface PwaDownloadProps {
  PwaDownloadEvent: BeforeInstallPromptEvent
}

const PwaDownloadButton: FC<PwaDownloadProps> = ({
  PwaDownloadEvent,
}: PwaDownloadProps): ReactElement => (
  <Button
    type="button"
    onClick={(): Promise<void> => PwaDownloadEvent.prompt()}
  >
    Download Santa Barbara Reentry
  </Button>
)

export default PwaDownloadButton
