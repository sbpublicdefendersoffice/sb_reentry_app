import { ReactNodeArray } from 'react'
import Head from 'next/head'

interface HeadTagsProps {
  title: string
  href: string
  description: string
  otherTags?: ReactNodeArray
}

const HeadTags = ({ title, href, description, otherTags }: HeadTagsProps) => {
  const url: string = `https://www.thrivesbc.com${href}`

  return (
    <Head>
      <title key="title">{title}</title>
      <meta
        key="og:title"
        name="og:title"
        property="og:title"
        content={title}
      />
      <meta key="twitter:title" name="twitter:title" content={title} />

      <link key="canonical" rel="canonical" href={url} />
      <meta key="og:url" property="og:url" content={url} />

      <meta key="description" name="description" content={description} />
      <meta
        key="og:description"
        name="og:description"
        property="og:description"
        content={description}
      />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={description}
      />

      {otherTags}
    </Head>
  )
}

export default HeadTags
