import { HeadTags } from '../../components'
import { CopyHolder } from '../../types'
import { useLanguage } from '../../hooks'
import { siteTitle } from '../../constants/'

const copy: CopyHolder = {
  english: {
    org: 'This will be the page to add your organization',
  },
  spanish: {
    org: 'Esta será la página para agregar su organización',
  },
}

const AddYourOrgPage = () => {
  const { language } = useLanguage()
  const { org } = copy[language]

  return (
    <>
      <HeadTags
        title={`${siteTitle} | Add Your Organization`}
        href="/addyourorg"
        description="Add your organization to ThriveSBC's growing list of people here to help"
      />
      <span>{org}</span>
    </>
  )
}

export default AddYourOrgPage
