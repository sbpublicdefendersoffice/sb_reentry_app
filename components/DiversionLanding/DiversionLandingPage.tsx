import * as React from 'react'

import { Title, Paragraph, CallToAction } from '../../ui'
import useLanguage from '../../hooks/useLanguage'
import { CopyHolder } from '../../types/language'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import NextLink from 'next/link'

import styles from './DiversionLandingPage.module.css'

export const src: string = '/icons/diversion.svg'

export const copy: CopyHolder = {
  english: {
    title: 'Diversion',
    whatIs: 'What is Diversion?',
    explain:
      'CREDO-47 is a diversion program that links individuals with substance use and mental health problems to treatment and provides assistance with housing, jobs, education and other resources. If you are accepted in the program and participate in treatment, you are able to get your criminal case dismissed.',
    howWill: 'How will I know if I am eligible?',
    caseByCase:
      'Diversion eligibility is determined by the District Attorney’s Office on a case by case basis.',
    qualify: 'Not all cases will qualify.',
    contact: 'Who can I contact?',
    talkTo:
      'If you would like to learn more about diversion, please contact Julia Lara at the Santa Barbara County Public Defender’s Office.',
    holistic: 'Holistic Defense Advocate',
    defender: 'Office of the Public Defender of Santa Barbara',
    credo47lbl: 'Credo-47',
  },
  spanish: {
    title: 'Desviación',
    whatIs: '¿Qué es el desvío?',
    explain:
      'CREDO-47 es un programa alternativo que vincula a las personas con problemas de salud mental y uso de sustancias con el tratamiento y brinda asistencia con vivienda, trabajo, educación y otros recursos. Si es aceptado en el programa y participa en el tratamiento, puede hacer que se desestime su caso penal.',
    howWill: '¿Cómo sabré si soy elegible?',
    caseByCase:
      'La elegibilidad para la desviación la determina la Oficina del Fiscal de Distrito caso por caso.',
    qualify: 'No todos los casos calificarán.',
    contact: '¿A quién puedo contactar?',
    talkTo:
      'Si desea obtener más información sobre la desviación, comuníquese con Julia Lara en la Oficina del Defensor Público del Condado de Santa Bárbara.',
    holistic: 'Defensor de la defensa holística',
    defender: 'Oficina del Defensor Público de Santa Bárbara',
    credo47lbl: 'Credo-47',
  },
}

const DiversionLandingPage = () => {
  const { language } = useLanguage()
  const { title, whatIs, credo47lbl, explain } = copy[language]

  const [isOpen, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <Title className={styles.HeaderText}>{title}</Title>
      </div>
      <div className={styles.About}>
        <Paragraph role="title" size="large-text">
          {whatIs}
        </Paragraph>
        <br />
        <Paragraph role="title" size="med-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          interdum dignissim aliquet. Morbi varius volutpat dolor, sed imperdiet
          quam mattis et. Pellentesque vitae arcu dolor. Donec lacus sem, rutrum
          ut fermentum id, molestie id dolor. Nulla id sem ac dui vehicula
          dictum vitae quis quam. Nulla dictum dolor diam, eu euismod leo luctus
          vel. Cras lobortis et est luctus dictum. Fusce sed aliquam lorem.
        </Paragraph>
      </div>
      <div className={styles.Programs}>
        <div role="listitem" className={styles.Tile}>
          <Button onClick={handleOpen}>
            <img
              role="img"
              className={styles.Image}
              src={src}
              alt={`${title} image`}
            />
          </Button>
          <Paragraph role="term" size="med-text">
            {credo47lbl}
          </Paragraph>
          <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Card className={styles.Modal}>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Credo-47
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {explain}
              </Typography>
              <br />
              <NextLink href={'/letushelp/diversion/credo47'}>
                {/* <Paragraph role="term" size="med-text">
                  {title}
                </Paragraph> */}
                <Button size="medium">Learn More</Button>
              </NextLink>
            </Card>
          </Modal>
        </div>
        <div role="listitem" className={styles.Tile}>
          <img
            role="img"
            className={styles.Image}
            src={src}
            alt={`${title} image`}
          />
          <Paragraph role="term" size="med-text">
            {credo47lbl}
          </Paragraph>
        </div>
        <div role="listitem" className={styles.Tile}>
          <img
            role="img"
            className={styles.Image}
            src={src}
            alt={`${title} image`}
          />
          <Paragraph role="term" size="med-text">
            {credo47lbl}
          </Paragraph>
        </div>
        <div role="listitem" className={styles.Tile}>
          <img
            role="img"
            className={styles.Image}
            src={src}
            alt={`${title} image`}
          />
          <Paragraph role="term" size="med-text">
            {credo47lbl}
          </Paragraph>
        </div>
      </div>
      <div className={styles.Programs}>
        <div role="listitem" className={styles.Tile}>
          <Button onClick={handleOpen}>
            <img
              role="img"
              className={styles.Image}
              src={src}
              alt={`${title} image`}
            />
          </Button>
          <Paragraph role="term" size="med-text">
            {credo47lbl}
          </Paragraph>
          <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Card className={styles.Modal}>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Credo-47
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {explain}
              </Typography>
              <br />
              <NextLink href={'/letushelp/diversion/credo47'}>
                {/* <Paragraph role="term" size="med-text">
                  {title}
                </Paragraph> */}
                <Button size="medium">Learn More</Button>
              </NextLink>
            </Card>
          </Modal>
        </div>
        <div role="listitem" className={styles.Tile}>
          <img
            role="img"
            className={styles.Image}
            src={src}
            alt={`${title} image`}
          />
          <Paragraph role="term" size="med-text">
            {credo47lbl}
          </Paragraph>
        </div>
        <div role="listitem" className={styles.Tile}>
          <img
            role="img"
            className={styles.Image}
            src={src}
            alt={`${title} image`}
          />
          <Paragraph role="term" size="med-text">
            {credo47lbl}
          </Paragraph>
        </div>
        <div role="listitem" className={styles.Tile}>
          <img
            role="img"
            className={styles.Image}
            src={src}
            alt={`${title} image`}
          />
          <Paragraph role="term" size="med-text">
            {credo47lbl}
          </Paragraph>
        </div>
      </div>
    </div>
  )
}

export default DiversionLandingPage
