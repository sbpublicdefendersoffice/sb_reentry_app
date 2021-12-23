import { intakePDF, siteTitle } from '../../constants/'
import { useLanguage } from '../../hooks'
import { PDFViewer, HeadTags } from '../../components/'

const ExpungementIntakeFormLanding = () => {
  const { language } = useLanguage()

  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${intakePDF[`doc_title_${language}`]}`}
        href="/documents/expungementintakeform"
        description="The intake form needed to apply for criminal record expungement through the Santa Barbara County Public Defender's Office"
      />
      <PDFViewer src={intakePDF.file} />
    </>
  )
}

export default ExpungementIntakeFormLanding
