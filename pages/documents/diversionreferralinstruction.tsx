import { diversionReferralInstructionPDF, siteTitle } from '../../constants'
import { useLanguage } from '../../hooks'
import { PDFViewer, HeadTags } from '../../components'

const DiversionReferralInstructionLanding = () => {
  const { language } = useLanguage()

  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${
          diversionReferralInstructionPDF[`doc_title_${language}`]
        }`}
        href="/documents/diversionreferralinstruction"
        description="Brochure for Credo 47 Stabalization Center"
      />
      <PDFViewer src={diversionReferralInstructionPDF.file} />
    </>
  )
}

export default DiversionReferralInstructionLanding
