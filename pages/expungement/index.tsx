import { GetServerSideProps } from 'next'

import { HeadTags, ExpungementForm } from '../../components'
import { siteTitle, isDev } from '../../constants'

const ExpungementPage = () => (
  <>
    <HeadTags
      title={`${siteTitle} | Record Expungement`}
      href={`/expungement`}
      description={`Thrive SBC Record Expungement`}
    />
    <ExpungementForm />
  </>
)

export default ExpungementPage

export const getServerSideProps: GetServerSideProps = async () => {
  if (!isDev)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  return {
    props: {},
  }
}
