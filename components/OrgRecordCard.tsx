import { Fragment, ReactElement } from 'react'
import { useRouter } from 'next/router'

import { OrgRecord } from '../types/records'
import { Card, Paragraph } from '../ui'

export interface OrgRecordCardProps {
  record: OrgRecord
  category: string
  url: string
}

export const urlSlug: string = '/[category]/[id]'

import styles from './OrgRecordCard.module.css'

const OrgRecordCard = ({ record, category, url }: OrgRecordCardProps) => {
  const { push } = useRouter()

  const { id, fields } = record
  const { org_categories, org_name } = fields

  const pushToRecord = (e): Promise<boolean> =>
    push(urlSlug, `${url}/${e.target.title}`)

  return (
    <Card
      role="region"
      title={id}
      className={styles.OrgRecordCard}
      interactive
      onClick={pushToRecord}
    >
      <img
        role="img"
        title={id}
        className={styles.Image}
        width="4rem"
        height="4rem"
        src={`./icons/${category}.svg`}
        alt={`${category}_icon`}
      />
      <div>
        <Paragraph role="heading" title={id} size="med-text">
          {org_name}
        </Paragraph>
        <Paragraph title={id}>
          {org_categories?.map(
            (category: string, i: number): ReactElement => (
              <Fragment key={i}>
                <em role="term" title={id} className={styles.Category}>
                  {i !== 0 && ', '}
                  {category}
                </em>
              </Fragment>
            ),
          )}
        </Paragraph>
      </div>
    </Card>
  )
}

export default OrgRecordCard
