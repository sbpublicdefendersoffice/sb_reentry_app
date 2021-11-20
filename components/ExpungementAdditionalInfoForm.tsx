import { Dispatch, SetStateAction } from 'react'

import { CopyHolder, ExpungementInfo } from '../types'
import { Paragraph } from '../ui'
import { useLanguage } from '../hooks'

import styles from './ExpungementForm.module.css'

const copy: CopyHolder = {
  english: {
    additional: 'Is there anything else we should know?',
    expand:
      'Please write any additional information you would like us to know. This could include specifics about your criminal charges, living situation, info regarding your finances or anything else you feel is not covered by the other fields of this form',
  },
  spanish: {
    additional: '¿Hay algo más que deberíamos saber?',
    expand:
      'Por favor escriba cualquier información adicional que desee que sepamos. Esto podría incluir detalles sobre sus cargos criminales, situación de vida, información sobre sus finanzas o cualquier otra cosa que crea que no está cubierta por los otros campos de este formulario.',
  },
}

interface ExpungementAdditionalInfoFormProps {
  setExpungeInfo: Dispatch<SetStateAction<ExpungementInfo>>
}

const ExpungementAdditionalInfoForm = ({
  setExpungeInfo,
}: ExpungementAdditionalInfoFormProps) => {
  const { language } = useLanguage()
  const { additional, expand } = copy[language]

  return (
    <section className={styles.Field}>
      <Paragraph size="med-text">{additional}</Paragraph>
      <Paragraph color="deselected">{expand}</Paragraph>
      <textarea
        style={{ margin: 'var(--margin-std) var(--margin-sm)' }}
        className={styles.TextField}
        spellCheck
        rows={10}
        name="additionalInfo"
        onChange={e =>
          setExpungeInfo(val => ({ ...val, [e.target.name]: e.target.value }))
        }
      />
    </section>
  )
}

export default ExpungementAdditionalInfoForm
