import { howToApplyIntakeSpanishPDF, siteTitle } from '../../constants'
import { useLanguage } from '../../hooks'
import { PDFViewer, HeadTags } from '../../components'

const ExpungementQuickstartGuideSpanishLanding = () => {
  const { language } = useLanguage()

  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${
          howToApplyIntakeSpanishPDF[`doc_title_${language}`]
        }`}
        href="/documents/expungementquickstartguideSpanish"
        description="The intake form needed to apply for criminal record expungement through the Santa Barbara County Public Defender's Office"
      />
      <PDFViewer src={howToApplyIntakeSpanishPDF.file} />
    </>
  )
}

export default ExpungementQuickstartGuideSpanishLanding
