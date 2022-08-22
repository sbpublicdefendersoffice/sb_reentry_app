import { intakeSpanishPDF, siteTitle } from '../../constants'
import { useLanguage } from '../../hooks'
import { PDFViewer, HeadTags } from '../../components'

const ExpungementIntakeFormSpanishLanding = () => {
  const { language } = useLanguage()

  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${intakeSpanishPDF[`doc_title_${language}`]}`}
        href="/documents/expungementintakeformSpanish"
        description="The intake form needed to apply for criminal record expungement through the Santa Barbara County Public Defender's Office"
      />
      <PDFViewer src={intakeSpanishPDF.file} />
    </>
  )
}

export default ExpungementIntakeFormSpanishLanding
