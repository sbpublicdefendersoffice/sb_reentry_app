import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useState, useEffect } from 'react'
import { JwtPayload, verify } from 'jsonwebtoken'
import timeConverter from '../../helpers/timeConverter'
import { Button, Paper } from '@mui/material'
import { POST } from '../../helpers/'
import { useStyles } from '../../constants'
import { HeadTags } from '../../components'
import { siteTitle } from '../../constants/'

import styles from './index.module.css'
import TabPanel from '../../components/TabPanel/TabPanel'
import DisplayLocations from '../../components/DisplayLocations/DisplayLocations'
import DisplayCBOOrgInfo from '../../components/DisplayCBOUserInfo/DisplayCBOOrgInfo'

import { useLoginStatus } from '../../hooks'

interface DashboardProps {
  userId: number
  orgId: number
  isVerified: boolean
}
const Dashboard = ({ isVerified, orgId }: DashboardProps) => {
  const { push } = useRouter()
  const classes = useStyles()
  const [org, setOrg] = useState(null)
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const postCBOsToPostgres: Response = await fetch('/api/postOrg', {
        method: POST,
        body: JSON.stringify(orgId),
      })
      const apiResponse = await postCBOsToPostgres.json()
      const org = apiResponse.org

      setOrg(apiResponse.org)
      setLocations(apiResponse.org.locations)
    }
    fetchData()
  }, [])

  const { setIsLoggedIn } = useLoginStatus()
  const logout = async () => {
    const loggingOut: Response = await fetch('/api/logout')
    const logoutMessage = await loggingOut.json()
    if (logoutMessage.error) console.log('oh no!')
    else {
      setIsLoggedIn(false)
      push('/login')
    }
  }

  if (!isVerified)
    return (
      <>
        <HeadTags
          title={`${siteTitle} | Organization Not Yet Verified`}
          href="/dashboard"
          description="A handy little place for you to manage your organization's information."
        />
        <span>
          You have not clicked on the verification email we sent you, please do
          so
        </span>
      </>
    )

  if (!orgId)
    return (
      <>
        <HeadTags
          title={`${siteTitle} | Organization Not Yet Connected`}
          href="/dashboard"
          description="A handy little place for you to manage your organization's information."
        />
        <span>
          You have verified your email, but we have not yet connected you to
          your org
        </span>
      </>
    )

  return (
    <>
      <HeadTags
        title={`${siteTitle} | Organization Not Yet Connected`}
        href="/dashboard"
        description="A handy little place for you to manage your organization's information."
      />
      <div className={styles.Container}>
        <div className={styles.TitleHeader}>
          <h1 className={styles.Title}>CBO Dashboard</h1>
          <Button className={styles.GreenButton} onClick={logout}>
            Logout
          </Button>
        </div>
        <div className={styles.DataContainer}>
          <div className={styles.OrgContainer}>
            <DisplayCBOOrgInfo
              orgInfo={org}
              setOrg={setOrg}
            ></DisplayCBOOrgInfo>
          </div>
          <Paper className={styles.LocationContainer}>
            <DisplayLocations
              orgInfo={org}
              orgName={org?.name_english}
              locations={locations}
              setOrg={setOrg}
            ></DisplayLocations>
          </Paper>
        </div>
      </div>
    </>
  )
}
export default Dashboard

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  let token: any
  if (ctx.req.headers.cookie) {
    const headers: { [name: string]: string } = ctx.req.headers.cookie
      .split(';')
      .reduce((obj, str) => {
        const split: string[] = str.split('=')
        obj[split[0].trim()] = split[1].trim()
        return obj
      }, {})
    if (headers['Auth-Token']) {
      const temp = verify(headers['Auth-Token'], process.env.JWT_SIGNATURE)
      const { exp } = temp as JwtPayload
      const expiryTime = exp * 1000
      if (expiryTime > Date.now()) token = temp
    }
  }
  if (!token || token?.type !== 'cbo')
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  else
    return {
      props: {
        userId: token.id,
        isVerified: token.isVerified,
        orgId: token.orgId,
      },
    }
}
