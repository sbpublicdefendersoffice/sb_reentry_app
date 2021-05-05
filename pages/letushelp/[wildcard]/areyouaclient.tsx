import { useRouter } from 'next/router'
import AreYouAClient from '../../../components/AreYouAClient'

const AreYouAClientLanding = () => (
  <AreYouAClient route={useRouter().query.wildcard as string} />
)

export default AreYouAClientLanding
