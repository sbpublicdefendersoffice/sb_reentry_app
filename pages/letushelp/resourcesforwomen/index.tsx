import useLanguage from '../../../hooks/useLanguage'
import { PictureWithOval } from '../../../components'
import { CopyHolder } from '../../../types/language'

const copy: CopyHolder = {
  english: {},
  spanish: {},
}

const ResourcesForWomenLanding = () => {
  return (
    <>
      <div style={{ width: '100%', display: 'flex' }}>
        <PictureWithOval
          color="var(--peri)"
          pic="resourcesforwomen_placeholder.png"
        />
        <div>howdy</div>
      </div>
    </>
  )
}

export default ResourcesForWomenLanding
