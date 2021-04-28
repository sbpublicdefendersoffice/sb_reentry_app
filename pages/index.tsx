import {
  AAMeetingsCta,
  AccessLineCta,
  // AddYourOrg,
  PwaDownload,
  ResourceHub,
  PRRCcta,
  LetUsHelpCta,
  MostUsedResourcesCta,
  // TopThreeCta,
} from '../components'

const Home = () => (
  <>
    <MostUsedResourcesCta />
    <ResourceHub />
    <LetUsHelpCta />
    <PRRCcta />
    <AccessLineCta />
    {/* <AddYourOrg />
    <TopThreeCta /> */}
    <PwaDownload />
    <AAMeetingsCta />
  </>
)

export default Home
