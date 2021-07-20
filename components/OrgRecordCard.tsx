import { Fragment, ReactElement } from 'react'
import { useRouter } from 'next/router'

import useLanguage from '../hooks/useLanguage'
import { PGOrganizationResponse } from '../types/'
import { ENGLISH } from '../constants/language'
import { Card, Paragraph } from '../ui'
export interface OrgRecordCardProps {
  record: PGOrganizationResponse
}
export const urlSlug: string = '/[category]/[id]'
import styles from './OrgRecordCard.module.css'
const OrgRecordCard = ({ record }: OrgRecordCardProps) => {
  const { language } = useLanguage()
  const { push, pathname, query } = useRouter()
  const {
    id,
    categories_english,
    categories_spanish,
    multiple_categories,
    name_english,
    name_spanish,
  } = record

  const activeCategories: string[] =
    language === ENGLISH ? categories_english : categories_spanish
  const categoryTitle: string = multiple_categories
    ? multiple_categories[0].replace(' ', '')
    : 'socialservices'
  const isCategoryPage: boolean = pathname === '/[category]'

  const pushToRecord = (e): Promise<boolean> =>
    push(urlSlug, `/${categoryTitle}/${e.target.title}`)

  return (
    <Card
      data-testid="OrgRecordCard"
      role="region"
      title={String(id)}
      className={styles.OrgRecordCard}
      interactive
      onClick={pushToRecord}
    >
      <img
        role="img"
        title={String(id)}
        className={styles.Image}
        width="4rem"
        height="4rem"
        src={`/icons/${isCategoryPage ? query.category : categoryTitle}.svg`}
        alt={`${categoryTitle}_icon`}
      />
      <div>
        <Paragraph role="heading" title={String(id)} size="med-text">
          {name_english || name_spanish}
        </Paragraph>
        <Paragraph title={String(id)}>
          {activeCategories?.map(
            (category: string, i: number): ReactElement => (
              <Fragment key={i}>
                <em role="term" title={String(id)} className={styles.Category}>
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
