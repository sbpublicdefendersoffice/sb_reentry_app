import Head from 'next/head'
import Typography from '@material-ui/core/Typography'
import { ENGLISH } from '../../constants/language'
import { siteTitle } from '../../constants/copy'
import useLanguage from '../../hooks/useLanguage'
import HrefAccordian from '../../components/HrefAccord'
import MainAccordian from '../../components/MainAccordian'
import TipsAccordian from '../../components/TipsAccordian'
const Checklist = () => {
  const { language } = useLanguage()
  return (
    <div>
      <Head>
        <title>{`${siteTitle} | ${
          language === ENGLISH
            ? '72 hour checklist'
            : 'Lista de verificación de 72 horas'
        }`}</title>
      </Head>
      <Typography
        style={{ marginTop: '3rem' }}
        align="center"
        variant="h2"
        component="h2"
      >
        {language === ENGLISH
          ? '72 Hour Checklist'
          : 'Lista de verificación de 72 horas'}
      </Typography>
      <Typography
        style={{
          marginTop: '2rem',
          marginBottom: '2rem',
          padding: '2rem',
          textAlign: 'justify',
        }}
        align="center"
        variant="h5"
        component="h5"
      >
        {language === ENGLISH
          ? 'Welcome back. We are wishing you a successful transition back into Santa Barbara County. The first 72 hours can be an important part of your transitions. This guide will help you have a better understanding on some of the resources that you might need in those first days being out. We hope that these resources can help you in your transition needs and quality of life.'
          : 'Bienvenido de nuevo. Le deseamos una exitosa transición de regreso al condado de Santa Bárbara. Las primeras 72 horas pueden ser una parte importante de sus transiciones. Esta guía lo ayudará a comprender mejor algunos de los recursos que podría necesitar durante los primeros días de publicación. Esperamos que estos recursos puedan ayudarlo en sus necesidades de transición y calidad de vida.'}
      </Typography>
      <div>
        <HrefAccordian data-testid="accordion" />
        <MainAccordian data-testid="accordion" />
        <TipsAccordian data-testid="accordion" />
      </div>
    </div>
  )
}
export default Checklist
