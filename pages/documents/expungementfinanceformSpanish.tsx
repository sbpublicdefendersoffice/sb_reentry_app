import { financePDF, siteTitle, financePDFSpanish } from '../../constants'
import { useLanguage } from '../../hooks'
import { PDFViewer, HeadTags } from '../../components'

const expungementfinanceformSpanish = () => {
  const { language } = useLanguage()

  return (
    <>
      <HeadTags
        title={`${siteTitle} | ${financePDFSpanish[`doc_title_${language}`]}`}
        href="/documents/expungementfinanceformSpanish"
        description="The financial declaration form needed to apply for criminal record expungement through the Santa Barbara County Public Defender's Office"
      />
      <PDFViewer src={financePDFSpanish.file} />
    </>
  )
}

export default expungementfinanceformSpanish
