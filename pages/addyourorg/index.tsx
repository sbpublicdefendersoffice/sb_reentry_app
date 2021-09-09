import { CopyHolder } from '../../types'
import { useLanguage } from '../../hooks'

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

  return <span>{org}</span>
}

export default AddYourOrgPage
