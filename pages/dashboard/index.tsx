import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { FormEvent, Fragment, ChangeEvent, useState } from 'react'
import { JwtPayload, verify } from 'jsonwebtoken'
import { Button, TextField } from '@mui/material'

import { POST } from '../../helpers/'
import { useStyles } from '../../constants'
import { HeadTags } from '../../components'
import { useLanguage } from '../../hooks'
import { siteTitle } from '../../constants/'

interface DashboardProps {
  userId: number
  orgId: number
  isVerified: boolean
}

const Dashboard = ({ userId, isVerified, orgId }: DashboardProps) => {
  const { push } = useRouter()
  const classes = useStyles()
  const { language } = useLanguage()
  const [orgInfo, setOrgInfo] = useState(null)
  const [dashboardButtonClicked, setDashboardButtonClicked] = useState(false)

  const logOut = async () => {
    const loggingOut: Response = await fetch('/api/logout')
    const logoutMessage = await loggingOut.json()
    if (logoutMessage.error) console.log('oh no!')
    else {
      console.log('oh yeah')
      push('/login')
    }
  }

  const fetchOrgInfo = async (): Promise<void> => {
    const postCBOsToPostgres: Response = await fetch('/api/postOrg', {
      method: POST,
      body: JSON.stringify(orgId),
    })

    const apiResponse = await postCBOsToPostgres.json()
    setDashboardButtonClicked(!dashboardButtonClicked)
    setOrgInfo(apiResponse.org)
  }
  const saveChanges = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const postCBOToPostgres: Response = await fetch(`/api/postUpdateCBOInfo`, {
      method: POST,
      body: JSON.stringify(orgInfo),
    })
    const apiResponse = await postCBOToPostgres.json()
    if (apiResponse.message == 'error') {
      console.log('there was an error')
    } else {
      console.log('successful update')
    }
  }

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, id } = target

    if (name === 'org') setOrgInfo(info => ({ ...info, [id]: value }))
    else if (name === 'org-tags') {
      const temp = value.split(',')
      setOrgInfo(info => ({ ...info, [id]: [...temp] }))
    } else if (name === 'loc') {
      const [locProperty, locIdx] = id.split(';')

      setOrgInfo(info => {
        const tempLocValues = [...info.locations]

        tempLocValues[locIdx] = {
          ...tempLocValues[locIdx],
          [locProperty]: value,
        }

        return { ...info, locations: [...tempLocValues] }
      })
    } else if (name === 'other') {
      const [finalKey, finalIdx, locProperty, locIdx] = id.split(';')

      const temp = orgInfo

      temp.locations[locIdx][locProperty][finalIdx][finalKey] = value

      setOrgInfo({ ...temp })
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
        title={`${siteTitle} | Organization Dashboard`}
        href="/dashboard"
        description="A handy little place for you to manage your organization's information."
      />
      <div style={{ margin: 'auto', textAlign: 'center', width: '100%' }}>
        {!orgInfo && (
          <Button
            style={{ width: '45rem', margin: 'auto' }}
            className={classes.greenButton}
            onClick={fetchOrgInfo}
          >
            <h3 style={{ padding: '1rem' }}>View Dashboard</h3>
          </Button>
        )}

        <form role="form" onSubmit={saveChanges}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                marginTop: '6rem',
              }}
            >
              {orgInfo && <h3>Welcome to your dashboard</h3>}

              {orgInfo &&
                Object.entries(orgInfo).map(([key, value], i) => {
                  if (
                    key == 'id' ||
                    key.includes('tags') ||
                    key.includes('tags') ||
                    key.includes('multiple')
                  )
                    return
                  if (typeof value !== 'object')
                    return (
                      <div>
                        <Fragment key={i}>
                          <TextField
                            style={{ margin: '2rem 0 1rem 0', width: '45rem' }}
                            name="org"
                            id={key}
                            helperText={key}
                            inputProps={{ style: { fontSize: '1.6rem' } }}
                            InputLabelProps={{
                              style: { fontSize: '1.5rem', fontWeight: 'bold' },
                            }}
                            value={value as string}
                            onChange={handleChange}
                          />
                        </Fragment>
                      </div>
                    )
                  else if (value instanceof Array) {
                    return (
                      <div
                        style={{
                          display: 'inline-flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}
                      >
                        <h3>{key}</h3>
                        {value.map((lVal, lkey) =>
                          Object.entries(lVal).map(([locKey, locVal], i) => {
                            if (locKey.includes('id')) return
                            if (typeof locVal !== 'object')
                              return (
                                <Fragment key={i}>
                                  <TextField
                                    style={{
                                      margin: '2rem 0 1rem 0',
                                      width: '45rem',
                                    }}
                                    name="loc"
                                    id={`${locKey};${lkey}`}
                                    helperText={locKey}
                                    inputProps={{
                                      style: { fontSize: '1.6rem' },
                                    }}
                                    value={locVal as string}
                                    onChange={handleChange}
                                  />
                                </Fragment>
                              )
                            else if (locVal !== null && locVal !== undefined)
                              //@ts-ignore
                              return (
                                <>
                                  <h3>{locKey}</h3>
                                  {Object.values(locVal).map(
                                    (srvOrSchVal, i) => {
                                      console.log('ser', srvOrSchVal)

                                      const finalVals =
                                        Object.entries(srvOrSchVal)

                                      return finalVals.map(
                                        ([fKey, fVal], fI) => {
                                          if (fKey === 'id') return
                                          return (
                                            <Fragment key={fI}>
                                              <TextField
                                                style={{
                                                  margin: '2rem 0 1rem 0',
                                                }}
                                                name="other"
                                                id={`${fKey};${i};${locKey};${lkey}`}
                                                helperText={fKey as string}
                                                inputProps={{
                                                  style: { fontSize: '1.6rem' },
                                                }}
                                                value={fVal as string}
                                                onChange={handleChange}
                                              />
                                            </Fragment>
                                          )
                                        },
                                      )
                                    },
                                  )}
                                </>
                              )
                          }),
                        )}
                      </div>
                    )
                  }
                })}
            </div>
          </div>
          <div>
            {orgInfo && (
              <>
                {' '}
                <Button
                  style={{
                    display: 'block',
                    width: '45rem',
                    margin: 'auto',
                  }}
                  className={classes.greenButton}
                  type="submit"
                  //  disabled={!org || !website}
                >
                  <h3 style={{ padding: '1rem' }}>Save Changes</h3>
                </Button>
                <br />
                <Button
                  style={{ display: 'block', width: '45rem', margin: 'auto' }}
                  className={classes.greenButton}
                  //  onClick={resetValues}
                >
                  <h3 style={{ padding: '1rem' }}> Reset Values</h3>
                </Button>
              </>
            )}

            <Button
              style={{ display: 'block', width: '45rem', margin: 'auto' }}
              className={classes.greenButton}
              onClick={logOut}
            >
              <h3 style={{ padding: '1rem' }}>Logout</h3>
            </Button>
          </div>
        </form>
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
