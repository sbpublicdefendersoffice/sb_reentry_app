import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import LeafLoader from './LeafLoader'
import OrgRecordCard from './OrgRecordCard'
import { Details, Paragraph } from '../ui'
import { useLanguage, useView, useResizeEvent } from '../hooks/'
import withWidth from '@material-ui/core/withWidth'
import { PGOrganizationResponse, WindowSize } from '../types/'
import { ENGLISH } from '../constants/language'
import styles from './RecordPane.module.css'
import DesktopFilterView from './DesktopFilterView'
import { Hidden } from '@material-ui/core'

export interface RecordPaneProps {
  displayCategory: string
  routeCategory: string
  orgInfo: PGOrganizationResponse[]
  fields?: any
  handleFieldsSelected?: any
  activeCopy?: any
  displayDescription?: string
}
const RecordPane = ({
  displayCategory,
  routeCategory,
  orgInfo,
  fields,
  handleFieldsSelected,
  activeCopy,
}: RecordPaneProps) => {
  const { push, route } = useRouter()
  const { language } = useLanguage()
  const { isMapView } = useView()
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: innerWidth,
    height: innerHeight,
  })

  useResizeEvent(() =>
    setWindowSize({
      width: innerWidth,
      height: innerHeight,
    }),
  )

  const categoryTitle: string = routeCategory.replace(' ', '')
  const url: string = `/${categoryTitle}`
  const pushToCategory = () => {
    if (url !== route) push(url, url)
  }
  if (!orgInfo) return <LeafLoader />
  const recordsReady: boolean = Boolean(orgInfo?.length)
  return (
    <div
      className={
        !isMapView && windowSize.width < 1275
          ? styles.RecordPaneMobile
          : styles.RecordPane
      }
      role="menu"
    >
      <Paragraph
        role="heading"
        size="heading-text"
        className={
          !isMapView && windowSize.width < 1275
            ? styles.titleMobile
            : styles.title
        }
        onClick={pushToCategory}
      >
        {displayCategory}
      </Paragraph>
      <Hidden mdDown>
        <DesktopFilterView
          fields={fields}
          handleFieldsSelected={handleFieldsSelected}
          routeCategory={routeCategory}
          activeCopy={activeCopy}
        />
      </Hidden>
      <Details
        role="list"
        open
        className={
          !isMapView && windowSize.width < 1275
            ? styles.detailsMobile
            : styles.details
        }
        summary={`${displayCategory} ${
          language === ENGLISH ? 'Records' : 'Registros'
        }`}
      >
        {recordsReady &&
          orgInfo.map((record: PGOrganizationResponse, i: number) => (
            <Fragment key={i}>
              <OrgRecordCard record={record} />
            </Fragment>
          ))}
      </Details>
    </div>
  )
}
export default withWidth()(RecordPane)
