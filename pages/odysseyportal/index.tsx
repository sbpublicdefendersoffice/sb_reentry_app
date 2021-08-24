import Head from 'next/head'
import { Title, Paragraph } from '../../ui'
import { siteTitle, useStyles } from '../../constants/'
import { useLanguage } from '../../hooks/'
import { CopyHolder } from '../../types/'
export const copy: CopyHolder = {
  english: {
    description:
      'If you would like to access the Santa Barbara County  Odyssey Portal please click the link below',
  },
  spanish: {
    description:
      'Si desea acceder al portal de la odisea del condado de Santa Bárbara, haga clic en el enlace a continuación',
  },
}
const OdysseyPortal = () => {
  const classes = useStyles()
  const { language } = useLanguage()
  const activeCopy = copy[language]
  return (
    <>
      {' '}
      <Head>
        <title>{`${siteTitle} | Odyssey Portal}`}</title>
      </Head>
      <div className={classes.root}>
        <Title>Odyssey Portal</Title>
        <div style={{ marginTop: '4rem' }}>
          <Paragraph size="med-text">{activeCopy.description}</Paragraph>
          <a
            className={classes.accordDescriptionLink}
            style={{ marginTop: '4rem', textAlign: 'center' }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://portal.sbcourts.org/CASBPORTAL/Home/Dashboard/29#%20or%20https://www.sbprobation.org/sbcprob/index.html"
          >
            <h2 style={{ marginTop: '4rem' }}>Odyssey Portal</h2>
          </a>
        </div>
      </div>
    </>
  )
}
export default OdysseyPortal
