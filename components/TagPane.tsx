import { Fragment, useState } from 'react'
import LeafLoader from './LeafLoader'
import OrgRecordCard from './OrgRecordCard'
import { Details } from '../ui'
import { categoryCopy } from '../constants/filter'
import { PGOrganizationResponse } from '../types/postgresRecords'
import { ENGLISH } from '../constants/language'
import styles from './RecordPane.module.css'
import useLanguage from '../hooks/useLanguage'
import useView from '../hooks/useView'
import useResizeEvent from '../hooks/useResizeEvent'
import { WindowSize } from '../types/'

import { Modal, Hidden, Grid } from '@mui/material'
import MobileButtonsLandingPage from '../components/MobileButtonsLandingPage'
export interface TagPaneProps {
  orgInfo: PGOrganizationResponse[]
}
const TagPane = ({ orgInfo }: TagPaneProps) => {
  const { language } = useLanguage()
  const { isMapView } = useView()
  const activeCopy = categoryCopy[language]
  const [open, setOpen] = useState<boolean>(false)
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
      <Details
        role="list"
        open
        className={
          !isMapView && windowSize.width < 1275
            ? styles.detailsMobile
            : styles.details
        }
        summary={` ${language === ENGLISH ? 'Records' : 'Registros'}`}
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
export default TagPane
