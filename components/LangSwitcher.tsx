import useLanguage from '../hooks/useLanguage'
import { Button } from '../ui'

const LangSwitcher = () => {
  const { language, setLanguage } = useLanguage()

  const switchLang = () => {
    if (language === 'english') setLanguage('spanish')
    else setLanguage('english')
  }

  return (
    <Button onClick={switchLang}>
      Switch To {language === 'english' ? 'Spanish' : 'English'}
    </Button>
  )
}

export default LangSwitcher
