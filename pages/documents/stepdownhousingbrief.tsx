import { stepdownHousingBriefPDF, siteTitle } from '../../constants'
import { useLanguage } from '../../hooks'
import { PDFViewer, HeadTags } from '../../components'

const StepdownHousingBriefLanding = () => {
  const { language } = useLanguage()

  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${
          stepdownHousingBriefPDF[`doc_title_${language}`]
        }`}
        href="/documents/stepdownhousingbrief"
        description="Brochure for Credo 47 Stabalization Center"
      />
      <PDFViewer src={stepdownHousingBriefPDF.file} />
    </>
  )
}

export default StepdownHousingBriefLanding
