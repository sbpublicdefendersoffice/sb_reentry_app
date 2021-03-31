import { useEffect, useState, useRef, MutableRefObject } from 'react'

import { Language, OrgRecord, CopyHolder } from '../types'
import { Paragraph } from '../ui'

import styles from './SearchTermsMarquee.module.css'

interface SearchTermsMarqueeProps {
  searchRecords: OrgRecord[]
  language: Language
  recordNumberToScroll: number | null
  formRef: MutableRefObject<HTMLFormElement> | null
}

const copy: CopyHolder = {
  english: {
    allRecords: 'Matches in this search:',
    singleRecord: 'Matches in this record:',
  },
  spanish: {
    allRecords: 'Coincidencias en esta búsqueda:',
    singleRecord: 'Coincidencias en este registro:',
  },
}

const delimiter: string = ', '

const SearchTermsMarquee = ({
  searchRecords,
  language,
  recordNumberToScroll,
  formRef,
}: SearchTermsMarqueeProps) => {
  const tagsRef: MutableRefObject<HTMLParagraphElement> | null = useRef(null)
  const [isScrolling, setIsScrolling] = useState<boolean>(false)
  const [singleRecordSearchTerms, setSingleRecordSearchTerms] = useState<
    string[][] | null
  >(null)
  const [searchTermsToScroll, setSearchTermsToScroll] = useState<
    string[] | null
  >(null)

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

    setSingleRecordSearchTerms(mappedSearchTerms)

    const searchTermsDeDupe: string[] = [...new Set(mappedSearchTerms.flat(1))]

    setSearchTermsToScroll(searchTermsDeDupe)
  }, [searchRecords])

  const readyToScrollRecords: boolean =
    Boolean(searchTermsToScroll?.length) &&
    Boolean(singleRecordSearchTerms?.length)

  useEffect(() => {
    if (tagsRef.current && formRef.current) {
      setScrollingEffect()
    }
  }, [readyToScrollRecords, formRef, tagsRef])

  return (
    readyToScrollRecords && (
      <div className={styles.SearchTermsMarquee}>
        <Paragraph size="med-text">
          {recordNumberToScroll !== null ? (
            <>
              {activeCopy.singleRecord}
              <Paragraph size="med-text" className={styles.Tags}>
                {singleRecordSearchTerms[recordNumberToScroll].join(delimiter)}
              </Paragraph>
            </>
          ) : (
            <>
              {activeCopy.allRecords}
              <Paragraph
                size="med-text"
                className={`${styles.Tags} ${isScrolling ? styles.Scroll : ''}`}
              >
                <span ref={tagsRef}>{searchTermsToScroll.join(delimiter)}</span>
                {isScrolling && (
                  <span className={styles.Tags}>
                    {`, ${searchTermsToScroll.join(delimiter)}`}
                  </span>
                )}
              </Paragraph>
            </>
          )}
        </Paragraph>
      </div>
    )
  )
}

export default SearchTermsMarquee
