import { howToApplyIntakePDF, siteTitle } from '../../constants/'
import { useLanguage } from '../../hooks'
import { PDFViewer, HeadTags } from '../../components/'

const HowToApplyIntakePDFLanding = () => {
  const { language } = useLanguage()

  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${howToApplyIntakePDF[`doc_title_${language}`]}`}
        href="/documents/expungementquickstartguide"
        description="The intake form needed to apply for criminal record expungement through the Santa Barbara County Public Defender's Office"
      />
      <PDFViewer src={howToApplyIntakePDF.file} />
    </>
  )
}

export default HowToApplyIntakePDFLanding
