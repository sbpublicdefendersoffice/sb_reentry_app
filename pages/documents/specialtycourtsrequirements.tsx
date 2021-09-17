import { specialCourtReqsPDF, siteTitle } from '../../constants/'
import { useLanguage } from '../../hooks'
import { PDFViewer, HeadTags } from '../../components/'

const SpecialtyCourtsRequirementsLanding = () => {
  const { language } = useLanguage()

  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${specialCourtReqsPDF[`doc_title_${language}`]}`}
        href="/documents/specialtycourtsrequirements"
        description="Additional information about Specialty Courts in Santa Barbara County"
      />
      <PDFViewer src={specialCourtReqsPDF.file} />
    </>
  )
}

export default SpecialtyCourtsRequirementsLanding
