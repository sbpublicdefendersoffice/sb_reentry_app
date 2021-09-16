import Head from 'next/head'

import { specialCourtReqsPDF, siteTitle } from '../../constants/'
import { useLanguage } from '../../hooks'
import PDFViewer from '../../components/PDFViewer'

const SpecialtyCourtsRequirementsLanding = () => {
  const { language } = useLanguage()

  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${
          specialCourtReqsPDF[`doc_title_${language}`]
        }`}</title>
      </Head>
      <PDFViewer src={specialCourtReqsPDF.file} />
    </>
  )
}

export default SpecialtyCourtsRequirementsLanding
