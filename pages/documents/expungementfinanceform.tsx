import { financePDF, siteTitle } from '../../constants/'
import { useLanguage } from '../../hooks'
import { PDFViewer, HeadTags } from '../../components/'

const ExpungementFinanceFormLanding = () => {
  const { language } = useLanguage()

  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${financePDF[`doc_title_${language}`]}`}
        href="/documents/expungementfinanceform"
        description="The financial declaration form needed to apply for criminal record expungement through the Santa Barbara County Public Defender's Office"
      />
      <PDFViewer src={financePDF.file} />
    </>
  )
}

export default ExpungementFinanceFormLanding
