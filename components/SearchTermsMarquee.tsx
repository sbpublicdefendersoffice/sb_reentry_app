import { useEffect, useState, useRef, MutableRefObject } from 'react'

import { Language, OrgRecord, CopyHolder } from '../types'
import { Paragraph } from '../ui'

import styles from './SearchTermsMarquee.module.css'

interface SearchTermsMarqueeProps {
  searchRecords: OrgRecord[]
  language: Language
  formRef: MutableRefObject<HTMLFormElement> | null
  delimiter: string
}

const copy: CopyHolder = {
  english: {
    records: 'Matches in this search:',
  },
  spanish: {
    records: 'Coincidencias en esta búsqueda:',
  },
}

const SearchTermsMarquee = ({
  searchRecords,
  language,
  formRef,
  delimiter,
}: SearchTermsMarqueeProps) => {
  const tagsRef: MutableRefObject<HTMLParagraphElement> | null = useRef(null)
  const [isScrolling, setIsScrolling] = useState<boolean>(false)
  const [searchTermsToScroll, setSearchTermsToScroll] =
    useState<string[] | null>(null)

  const setScrollingEffect = (): void =>
    tagsRef.current?.getClientRects()[0].width >
    formRef.current?.getClientRects()[0].width
      ? setIsScrolling(true)
      : setIsScrolling(false)

  const activeCopy = copy[language]

  useEffect(() => {
    if (tagsRef.current && formRef.current) {
      addEventListener('resize', setScrollingEffect)
      return () => removeEventListener('resize ', setScrollingEffect)
    }
  }, [
    tagsRef.current?.getClientRects()[0].width,
    formRef.current?.getClientRects()[0].width,
    searchRecords,
  ])

  useEffect(() => {
    const mappedSearchTerms: string[][] = searchRecords.map(
      (record: OrgRecord) =>
        record.fields.org_tags || record.fields.org_tags_spanish,
    )
    const searchTermsDeDupe: string[] = [...new Set(mappedSearchTerms.flat(1))]

    setSearchTermsToScroll(searchTermsDeDupe)
  }, [searchRecords])

  const readyToScrollRecords: boolean = Boolean(searchTermsToScroll?.length)

  useEffect(() => {
    if (tagsRef.current && formRef.current) setScrollingEffect()
  }, [readyToScrollRecords, formRef, tagsRef, searchRecords])

  return (
    readyToScrollRecords && (
      <div className={styles.SearchTermsMarquee}>
        <Paragraph size="med-text">
          {
            <>
              {activeCopy.records}
              <Paragraph
                className={`${styles.Tags} ${isScrolling && styles.Scroll}`}
              >
                <em ref={tagsRef}>{searchTermsToScroll.join(delimiter)}</em>
                {isScrolling && (
                  <em>{`, ${searchTermsToScroll.join(delimiter)}`}</em>
                )}
              </Paragraph>
            </>
          }
        </Paragraph>
      </div>
    )
  )
}

export default SearchTermsMarquee
