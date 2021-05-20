import { Fragment, ReactElement } from 'react'
import { useRouter } from 'next/router'
import { OrgRecord } from '../types/records'
import { Card, Paragraph } from '../ui'
export interface OrgRecordCardProps {
  record: OrgRecord
}
export const urlSlug: string = '/[category]/[id]'
import styles from './OrgRecordCard.module.css'
const OrgRecordCard = ({ record }: OrgRecordCardProps) => {
  const { push } = useRouter()
  const { id, fields } = record
  const { org_categories, org_name } = fields
  const categoryTitle: string = org_categories[0].replace(' ', '')
  const pushToRecord = (e): Promise<boolean> =>
    push(urlSlug, `${categoryTitle}/${e.target.title}`)
  return (
    <Card
      data-testid="OrgRecordCard"
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
        src={`./icons/${categoryTitle}.svg`}
        alt={`${categoryTitle}_icon`}
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
