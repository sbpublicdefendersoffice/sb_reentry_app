import { CopyHolder } from '../../../types'
import { useLanguage } from '../../../hooks'

const copy: CopyHolder = {
  english: {
    category: 'This category does not exist yet',
  },
  spanish: {
    category: 'Esta categoría aún no existe',
  },
}

const CategoryPlaceHolder = () => {
  const { language } = useLanguage()
  const { category } = copy[language]

  return <span>{category}</span>
}
export default CategoryPlaceHolder
