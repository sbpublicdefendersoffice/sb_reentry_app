import { SetStateAction, Dispatch, Fragment, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { LeafLoader, OrgRecordCard } from './'
import { Details, Paragraph } from '../ui'
import { useLanguage, ViewContext, useResizeEvent } from '../hooks/'
import withWidth from '@material-ui/core/withWidth'
import { PGOrganizationResponse, WindowSize } from '../types/'
import { ENGLISH } from '../constants/language'
import styles from './RecordPane.module.css'
import {
  DesktopFilterView,
  DisplayCategoryImage,
  CategoryDescription,
} from '../components'
import { Hidden } from '@material-ui/core'

export interface RecordPaneProps {
  displayCategory: string
  routeCategory: string
  orgInfo: PGOrganizationResponse[]
  setRecords: Dispatch<SetStateAction<PGOrganizationResponse[]>>
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
  displayDescription,
  setRecords,
}: RecordPaneProps) => {
  const { push, route } = useRouter()
  const { language } = useLanguage()
  const { state } = useContext(ViewContext)
  const { isListView, isMapView } = state
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
        isListView && !isMapView && windowSize.width < 1275
          ? styles.RecordPaneMobile
          : styles.RecordPane
      }
      role="menu"
    >
      <Paragraph
        role="heading"
        size="heading-text"
        className={
          isListView && !isMapView && windowSize.width < 1275
            ? styles.titleMobile
            : styles.title
        }
        onClick={pushToCategory}
      >
        {displayCategory}
      </Paragraph>
      <DisplayCategoryImage
        displayCategory={displayCategory}
        routeCategory={routeCategory}
      />
      <CategoryDescription
        displayDescription={displayDescription}
        activeCopy={activeCopy}
      />
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
          isListView && !isMapView && windowSize.width < 1275
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
