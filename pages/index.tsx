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
        description={`${siteTitle}, A Santa Barbara County tool for the justice-impacted community`}
        otherTags={[
          <meta
            key="_app viewport"
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
          />,
        ]}
      />
      {/* <ResourceHub /> */}
      <HomepageMainBanner>{/* <Newsfeed /> */}</HomepageMainBanner>
      <WhatWeDo />
      {/* <UnsureWhereToStart /> */}
    </>
  )
}

export default Home
