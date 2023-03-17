import { diversionReferralFormPDF, siteTitle } from '../../constants'
import { useLanguage } from '../../hooks'
import { PDFViewer, HeadTags } from '../../components'

const DiversionReferralFormLanding = () => {
  const { language } = useLanguage()

  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${
          diversionReferralFormPDF[`doc_title_${language}`]
        }`}
        href="/documents/diversionreferralform"
        description="Brochure for Credo 47 Stabalization Center"
      />
      <PDFViewer src={diversionReferralFormPDF.file} />
    </>
  )
}

export default DiversionReferralFormLanding
