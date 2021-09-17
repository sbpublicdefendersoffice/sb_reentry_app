import {
  HomepageMainBanner,
  WhatWeDo,
  UnsureWhereToStart,
  ResourceHub,
  HeadTags,
  // Quotes,
} from '../components'
import { siteTitle } from '../constants'

const Home = () => (
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
    <WhatWeDo />
    <UnsureWhereToStart />
    <ResourceHub />
    {/* <Quotes /> */}
  </>
)

export default Home
