import { MouseEvent } from 'react'
import { useRouter } from 'next/router'

import { Button, Title } from '../ui'
import FullPageDecision from './FullPageDecision'
import { CopyHolder } from '../types/language'
import useLanguage from '../hooks/useLanguage'

export const copy: CopyHolder = {
  english: {
    currentClient: 'Are you currently a client of the Public Defender?',
    no: 'No',
    yes: 'Yes',
  },
  spanish: {
    currentClient: '¿Actualmente es cliente de la Defensoría Pública?',
    no: 'No',
    yes: 'Si',
  },
}

interface AreYouAClientProps {
  route: string
}

const AreYouAClient = ({ route }: AreYouAClientProps) => {
  const { push } = useRouter()
  const { language } = useLanguage()

  const { currentClient, no, yes } = copy[language]

  const pushToDecision = ({
    currentTarget,
  }: MouseEvent<HTMLButtonElement>): void => {
    const { name } = currentTarget
    push(name, name)
  }

  return (
    <FullPageDecision>
      <Title role="heading">{currentClient}</Title>
      <div>
        <Button
          role="button"
          light
          name={`/letushelp/${route}/apply`}
          onClick={pushToDecision}
        >
          {no}
        </Button>
        <Button
          role="button"
          name={`/letushelp/${route}`}
          onClick={pushToDecision}
        >
          {yes}
        </Button>
      </div>
    </FullPageDecision>
  )
}

export default AreYouAClient
