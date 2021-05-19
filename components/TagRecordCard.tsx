import { Fragment, ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useGlobalSearch } from '../hooks/'
import { OrgRecord } from '../types/records'
import { Card, Paragraph } from '../ui'

export interface TagRecordCardProps {
  record: OrgRecord
  category?: string
  url: string
}

export const urlSlug: string = '/[category]/[id]'

import styles from './OrgRecordCard.module.css'

const TagRecordCard = ({ record, category, url }: TagRecordCardProps) => {
  const { push } = useRouter()
  const { setSearchResults } = useGlobalSearch()
  const { id, fields } = record
  const { org_categories, org_name } = fields
  const categoryTitle: string = org_categories[0].replace(' ', '')
  const pushToSearch = e => {
    const { title } = e.target
    if (title) {
      setSearchResults(null)
      push(urlSlug, `${categoryTitle}/${title}`)
    }
  }

  return (
    <Card
      role="region"
      title={id}
      className={styles.OrgRecordCard}
      interactive
      onClick={pushToSearch}
    >
      <img
        role="img"
        title={id}
        className={styles.Image}
        width="4rem"
        height="4rem"
        src={`../../icons/${categoryTitle}.svg`}
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

export default TagRecordCard
