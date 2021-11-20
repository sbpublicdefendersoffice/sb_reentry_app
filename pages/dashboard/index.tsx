import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import { FormEvent, Fragment, ChangeEvent } from 'react'
import { JwtPayload, verify } from 'jsonwebtoken'
import {
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import { POST } from '../../helpers/'
import { useStyles } from '../../constants'
import { ExpandMore } from '@mui/icons-material'
interface DashboardProps {
  userId: number
  orgId: number
  isVerified: boolean
}

const Dashboard = ({ isVerified, orgId }: DashboardProps) => {
  const { push } = useRouter()
  const classes = useStyles()
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
  const translateInfo = async (q, id, name): Promise<void> => {
    let splicer = id.slice(0, -7)
    const postTranslate: Response = await fetch(
      'https://libretranslate.de/translate',
      {
        method: POST,
        body: JSON.stringify({ q: q, source: 'en', target: 'es' }),
        headers: { 'Content-Type': 'application/json' },
      },
    )

    const apiResponse = await postTranslate.json()
    if (name == 'org') {
      setOrgInfo(info => ({
        ...info,
        //@ts-ignore
        [`${splicer}spanish`]: apiResponse.translatedText,
      }))
    }
    if (name == 'other') {
      const [finalKey, finalIdx, locProperty, locIdx] = id.split(';')
      let serviceSplicer = finalKey.slice(0, -7)
      const temp = orgInfo
      temp.locations[locIdx][locProperty][finalIdx][
        `${serviceSplicer}spanish`
      ] = apiResponse.translatedText
      setOrgInfo({ ...temp })
    }

    return apiResponse
  }
  const handleBlur = e => {
    const { name, value, id } = e.target
    let isEnglishKey = id.includes('english')
    if (isEnglishKey) {
      if (name === 'org') {
        translateInfo(value, id, name)
      } else if (name === 'other') {
        translateInfo(value, id, name)
      }
    }
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
  const handleChange = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = target
    if (name === 'org') {
      setOrgInfo(info => ({ ...info, [id]: value }))
    } else if (name === 'org-tags') {
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
      <span>
        You have not clicked on the verification email we sent you, please do so
      </span>
    )

  if (!orgId)
    return (
      <span>
        You have verified your email, but we have not yet connected you to your
        org
      </span>
    )

  return (
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
              margin: '6rem',
            }}
          >
            {orgInfo && <h2>Welcome to your dashboard</h2>}

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
                          onBlur={handleBlur}
                        />
                      </Fragment>
                    </div>
                  )
                else if (value instanceof Array) {
                  return (
                    <div
                      style={{
                        width: '47rem',
                        margin: 'auto',
                      }}
                    >
                      {/* <Button>Add a location</Button>
                      <Button>Delete this location</Button> */}
                      <h3 style={{ margin: '2rem' }}>Locations</h3>
                      {value.map((lVal, lkey) => {
                        return (
                          <Accordion
                            style={{
                              margin: '1.5rem 0',
                              padding: '1rem',
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMore />}
                              aria-controls="panel3a-content"
                              data-testid="accordion"
                              id="panel3a-header"
                            >
                              <h3>{`Location: ${lVal.name}`}</h3>
                            </AccordionSummary>

                            {Object.entries(lVal)
                            .map(([locKey, locVal], i) => {
                              if (
                                locKey.includes('id') ||
                                locKey.includes('tude')
                              )
                                return
                              if (typeof locVal !== 'object')
                                return (
                                  <>
                                    <AccordionDetails>
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
                                    </AccordionDetails>
                                  </>
                                )
                              else if (locVal !== null && locVal !== undefined)
                                //@ts-ignore
                                return (
                                  <Accordion
                                    style={{
                                      display: 'block',
                                      flexDirection: 'column',
                                      justifyContent: 'center',
                                      margin: '1.5rem',
                                      padding: '1rem',
                                    }}
                                  >
                                    <AccordionSummary
                                      expandIcon={<ExpandMore />}
                                      aria-controls="panel3a-content"
                                      data-testid="accordion"
                                      id="panel3a-header"
                                    >
                                      <h3>
                                        {locKey == 'services'
                                          ? 'Services'
                                          : 'Schedules'}
                                      </h3>
                                    </AccordionSummary>
                                    {Object.values(locVal).map(
                                      (srvOrSchVal, i) => {
                                        const finalVals =
                                          Object.entries(srvOrSchVal)

                                        return finalVals.map(
                                          ([fKey, fVal], fI) => {
                                            if (fKey === 'id') return
                                            return (
                                              <AccordionDetails>
                                                <Fragment key={fI}>
                                                  <TextField
                                                    style={{
                                                      margin: '2rem 0 1rem 0',
                                                      width: '41rem',
                                                    }}
                                                    name="other"
                                                    id={`${fKey};${i};${locKey};${lkey}`}
                                                    helperText={fKey as string}
                                                    inputProps={{
                                                      style: {
                                                        fontSize: '1.6rem',
                                                      },
                                                    }}
                                                    value={fVal as string}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                  />
                                                </Fragment>
                                              </AccordionDetails>
                                            )
                                          },
                                        )
                                      },
                                    )}
                                  </Accordion>
                                )
                            })}
                          </Accordion>
                        )
                      })}
                    </div>
                  )
                }
              })}
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
        </div>
      </form>
    </div>
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
