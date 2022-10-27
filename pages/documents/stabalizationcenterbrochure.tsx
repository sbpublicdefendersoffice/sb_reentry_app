import { stabalizationPDF, siteTitle } from '../../constants/'
import { useLanguage } from '../../hooks'
import { PDFViewer, HeadTags } from '../../components/'

const StabalizationBrochureLanding = () => {
  const { language } = useLanguage()

  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${stabalizationPDF[`doc_title_${language}`]}`}
        href="/documents/stabalizationcenterbrochure"
        description="Brochure for Credo 47 Stabalization Center"
      />
      <PDFViewer src={stabalizationPDF.file} />
    </>
  )
}

export default StabalizationBrochureLanding
