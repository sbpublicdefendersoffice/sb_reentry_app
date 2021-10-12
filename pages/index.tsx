import { useState } from 'react'

import {
  HomepageMainBanner,
  WhatWeDo,
  UnsureWhereToStart,
  ResourceHub,
  HeadTags,
  Newsfeed,
  // Quotes,
} from '../components'
import { useResizeEvent } from '../hooks/'

import { siteTitle } from '../constants'

const Home = () => {
  const [isBelow500px, setIsBelow500px] = useState<boolean>(innerWidth < 500)
  useResizeEvent(() => setIsBelow500px(innerWidth < 500))

  return (
    <>
      <HeadTags
        title={siteTitle}
        href="/"
        description={`${siteTitle}, A Santa Barbara County client tool for the justice-impacted`}
        otherTags={[
          <meta
            key="_app viewport"
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
          />,
        ]}
      />
      <HomepageMainBanner />
      <div
        style={{ display: isBelow500px ? 'block' : 'none', overflow: 'scroll' }}
      >
        <Newsfeed />
      </div>
      <WhatWeDo />
      <UnsureWhereToStart />
      <ResourceHub />
      {/* <Quotes /> */}
    </>
  )
}

export default Home
