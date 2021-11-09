import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import { POST } from '../../helpers/'
import { FormEvent, Fragment, ChangeEvent } from 'react'
import { PGOrganizationResponse } from '../../types'
import { JwtPayload, verify } from 'jsonwebtoken'
import { Button, TextField } from '@mui/material'
import { useStyles } from '../../constants'
import { info } from 'console'

interface DashboardProps {
  userId: number
  orgId: number
  isVerified: boolean
}
const Dashboard = ({ userId, isVerified, orgId }: DashboardProps) => {
  const { push } = useRouter()
  const classes = useStyles()
  const [orgInfo, setOrgInfo] = useState(null)

  const logOut = async () => {
    const loggingOut: Response = await fetch('/api/logout')
    const logoutMessage = await loggingOut.json()
    if (logoutMessage.error) console.log('oh no!')
    else {
      console.log('oh yeah')
      push('/')
    }
  }

  const fetchOrgInfo = async (): Promise<void> => {
    const postCBOsToPostgres: Response = await fetch('/api/postOrg', {
      method: POST,
      body: JSON.stringify(orgId),
    })

    const apiResponse = await postCBOsToPostgres.json()

    setOrgInfo(apiResponse.org)
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
    <div>
      <Button className={classes.greenButton} onClick={logOut}>
        <h3 style={{ padding: '1rem' }}>Logout</h3>
      </Button>
      <Button className={classes.greenButton} onClick={fetchOrgInfo}>
        <h3 style={{ padding: '1rem' }}>I would like to change my info</h3>
      </Button>
      <form>
        <h3>Org</h3>
        {orgInfo &&
          Object.entries(orgInfo).map(([key, value], i) => {
            if (typeof value !== 'object')
              return (
                <Fragment key={i}>
                  <p>{key}</p>
                  <input
                    value={value as string}
                    id={key}
                    name="org"
                    onChange={handleChange}
                  />
                </Fragment>
              )
            else if (value instanceof Array) {
              if (key !== 'locations')
                return (
                  <Fragment key={i}>
                    <p>{key}</p>
                    <input
                      id={key}
                      value={value.map(val => val)}
                      name="org-tags"
                      onChange={handleChange}
                    />
                  </Fragment>
                )
              else
                return (
                  <div>
                    <h3>{key}</h3>
                    {value.map((lVal, lkey) =>
                      Object.entries(lVal).map(([locKey, locVal], i) => {
                        if (typeof locVal !== 'object')
                          return (
                            <Fragment key={i}>
                              <p>{locKey}</p>
                              <input
                                value={locVal as string}
                                id={`${locKey};${lkey}`}
                                name="loc"
                                onChange={handleChange}
                              />
                            </Fragment>
                          )
                        else if (locVal !== null && locVal !== undefined)
                          //@ts-ignore
                          return (
                            <>
                              <h3>{locKey}</h3>
                              {Object.values(locVal).map((srvOrSchVal, i) => {
                                const finalVals = Object.entries(srvOrSchVal)

                                return finalVals.map(([fKey, fVal], fI) => (
                                  <Fragment key={fI}>
                                    <p>{fKey}</p>
                                    <input
                                      value={fVal as string}
                                      id={`${fKey};${i};${locKey};${lkey}`}
                                      name="other"
                                      onChange={handleChange}
                                    />
                                  </Fragment>
                                ))
                              })}
                            </>
                          )
                      }),
                    )}
                  </div>
                )
            }
          })}
      </form>
    </div>
  )

  // const [stateValues, setStateValues] = useState(orgResponse.org)
  // const [locationStateValues, setLocationStateValues] = useState(
  //   orgResponse.org.locations,
  // )
  // const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  // const [showErrorMessage, setShowErrorMessage] = useState(false)
  // const handleChange = e => {
  //   const { name, value } = e.target
  //   setStateValues(() => ({
  //     ...stateValues,
  //     [name]: value,
  //   }))
  // }
  // const handleLocationStateChange = e => {
  //   const { name, value } = e.target
  //   setLocationStateValues(() => ({
  //     ...locationStateValues,
  //     [name]: value,
  //   }))
  // }
  // const logOut = async () => {
  //   const loggingOut: Response = await fetch('/api/logout')
  //   const logoutMessage = await loggingOut.json()
  //   if (logoutMessage.error) console.log('oh no!')
  //   else {
  //     console.log('oh yeah')
  //     push('/')
  //   }
  // }
  // const saveChanges = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
  //   e.preventDefault()
  //   const postCBOToPostgres: Response = await fetch(`/api/postUpdateCBOInfo`, {
  //     method: POST,
  //     body: JSON.stringify(stateValues),
  //   })
  //   const apiResponse = await postCBOToPostgres.json()
  //   if (apiResponse.message == 'error') {
  //     console.log('there was an error')
  //   } else {
  //     console.log('successful update')
  //   }
  // }
  // const {
  //   website,
  //   name_english,
  //   languages_spoken_english,
  //   customers_served_english,
  //   notes_english,
  //   services,
  //   // schedules,
  //   locations,
  // } = stateValues
  // const { schedules } = locations
  // return (
  //   <div style={{ margin: 'auto', textAlign: 'center' }}>
  //     <form role="form" onSubmit={saveChanges}>
  //       <div
  //         style={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //           justifyContent: 'center',
  //         }}
  //       >
  //         <h1>Dashboard Information for: {name_english}</h1>
  //         {/* {Object.keys(newState).map((key, index) => {
  //           console.log(key, 'keyssss')
  //           if (
  //             key == 'id' ||
  //             +key == +key ||
  //             key.includes('spanish') ||
  //             key.includes('multiple')
  //           ) {
  //             console.log(key)
  //             return
  //           }
  //           return (
  //             <TextField
  //               style={{ margin: '2rem 0 1rem 0' }}
  //               name={key}
  //               helperText={key}
  //               inputProps={{ style: { fontSize: '.8rem' } }}
  //               InputLabelProps={{
  //                 style: { fontSize: '.9rem', fontWeight: 'bold' },
  //               }}
  //               value={stateValues[key]}
  //               onChange={handleChange}
  //             />
  //           )
  //         })} */}
  //         <TextField
  //           style={{ margin: '2rem 0 1rem 0' }}
  //           name="name_english"
  //           helperText="Organization"
  //           inputProps={{ style: { fontSize: '1.6rem' } }}
  //           InputLabelProps={{
  //             style: { fontSize: '1.5rem', fontWeight: 'bold' },
  //           }}
  //           value={name_english}
  //           onChange={handleChange}
  //         />
  //         <TextField
  //           helperText={'Website'}
  //           value={website}
  //           style={{ marginBottom: '2rem' }}
  //           name="website"
  //           inputProps={{ style: { fontSize: '1.6rem' } }}
  //           InputLabelProps={{
  //             style: { fontSize: '1.5rem', fontWeight: 'bold' },
  //           }}
  //           onChange={handleChange}
  //           placeholder={'website'}
  //         />
  //         <TextField
  //           helperText={'Customers Served'}
  //           value={languages_spoken_english}
  //           style={{ marginBottom: '2rem' }}
  //           name="languages_spoken_english"
  //           inputProps={{ style: { fontSize: '1.6rem' } }}
  //           InputLabelProps={{
  //             style: { fontSize: '1.5rem', fontWeight: 'bold' },
  //           }}
  //           onChange={handleChange}
  //           placeholder={'languages_spoken_english'}
  //         />
  //         <TextField
  //           helperText={'Customers Served'}
  //           value={customers_served_english}
  //           style={{ marginBottom: '2rem' }}
  //           name="customers_served_english"
  //           inputProps={{ style: { fontSize: '1.6rem' } }}
  //           InputLabelProps={{
  //             style: { fontSize: '1.5rem', fontWeight: 'bold' },
  //           }}
  //           onChange={handleChange}
  //           placeholder={'customers_served'}
  //         />
  //         <TextField
  //           helperText={'Notes'}
  //           value={notes_english}
  //           style={{ marginBottom: '2rem' }}
  //           name="notes_english"
  //           inputProps={{ style: { fontSize: '1.6rem' } }}
  //           InputLabelProps={{
  //             style: { fontSize: '1.5rem', fontWeight: 'bold' },
  //           }}
  //           onChange={handleChange}
  //           placeholder={'notes'}
  //         />
  //         {locations.map((location, key) => {
  //           const { address, address2, city, state, zip } = location
  //           return (
  //             <>
  //               <TextField
  //                 key={key}
  //                 helperText={'Address'}
  //                 value={address}
  //                 style={{ marginBottom: '2rem' }}
  //                 name="address"
  //                 inputProps={{ style: { fontSize: '1.6rem' } }}
  //                 InputLabelProps={{
  //                   style: { fontSize: '1.5rem', fontWeight: 'bold' },
  //                 }}
  //                 onChange={handleChange}
  //                 placeholder={'Address'}
  //               />
  //               <TextField
  //                 key={key}
  //                 helperText={'Address 2'}
  //                 value={address2}
  //                 style={{ marginBottom: '2rem' }}
  //                 name="address2"
  //                 inputProps={{ style: { fontSize: '1.6rem' } }}
  //                 InputLabelProps={{
  //                   style: { fontSize: '1.5rem', fontWeight: 'bold' },
  //                 }}
  //                 onChange={handleChange}
  //                 placeholder={'Address2'}
  //               />
  //               <TextField
  //                 key={key}
  //                 helperText={'City'}
  //                 value={city}
  //                 style={{ marginBottom: '2rem' }}
  //                 name={'city'}
  //                 inputProps={{ style: { fontSize: '1.6rem' } }}
  //                 InputLabelProps={{
  //                   style: { fontSize: '1.5rem', fontWeight: 'bold' },
  //                 }}
  //                 onChange={handleChange}
  //                 placeholder={'City'}
  //               />
  //               <TextField
  //                 key={key}
  //                 helperText={'State'}
  //                 value={state}
  //                 style={{ marginBottom: '2rem' }}
  //                 name={'state'}
  //                 inputProps={{ style: { fontSize: '1.6rem' } }}
  //                 InputLabelProps={{
  //                   style: { fontSize: '1.5rem', fontWeight: 'bold' },
  //                 }}
  //                 onChange={handleChange}
  //                 placeholder={'State'}
  //               />
  //               <TextField
  //                 helperText={'Zip'}
  //                 key={key}
  //                 value={zip}
  //                 style={{ marginBottom: '2rem' }}
  //                 name={'zip'}
  //                 inputProps={{ style: { fontSize: '1.6rem' } }}
  //                 InputLabelProps={{
  //                   style: { fontSize: '1.5rem', fontWeight: 'bold' },
  //                 }}
  //                 onChange={handleChange}
  //                 placeholder={'Zip'}
  //               />
  //               {Boolean(locations.schedules?.length) &&
  //                 locations.schedules.map((schedule, key) => {
  //                   const { open_time, close_time, days } = schedule
  //                   return (
  //                     <>
  //                       {' '}
  //                       <TextField
  //                         key={key}
  //                         helperText={'Open Time'}
  //                         value={open_time}
  //                         style={{ marginBottom: '2rem' }}
  //                         name={'open_time'}
  //                         inputProps={{ style: { fontSize: '1.6rem' } }}
  //                         InputLabelProps={{
  //                           style: { fontSize: '1.5rem', fontWeight: 'bold' },
  //                         }}
  //                         onChange={handleChange}
  //                         placeholder={'Open Time'}
  //                       />
  //                       <TextField
  //                         key={key}
  //                         helperText={'Close Time'}
  //                         value={close_time}
  //                         style={{ marginBottom: '2rem' }}
  //                         name={'close_time'}
  //                         inputProps={{ style: { fontSize: '1.6rem' } }}
  //                         InputLabelProps={{
  //                           style: { fontSize: '1.5rem', fontWeight: 'bold' },
  //                         }}
  //                         onChange={handleChange}
  //                         placeholder={'Close Time'}
  //                       />
  //                       <TextField
  //                         helperText={
  //                           'Days Open: Sun, Mon, Tue, Wed, Thur, Fri, Sat'
  //                         }
  //                         key={key}
  //                         value={days}
  //                         style={{ marginBottom: '2rem' }}
  //                         name={'days'}
  //                         inputProps={{ style: { fontSize: '1.6rem' } }}
  //                         InputLabelProps={{
  //                           style: { fontSize: '1.5rem', fontWeight: 'bold' },
  //                         }}
  //                         onChange={handleChange}
  //                         placeholder={'Days'}
  //                       />
  //                     </>
  //                   )
  //                 })}
  //             </>
  //           )
  //         })}
  //         <Button
  //           className={classes.greenButton}
  //           type="submit"
  //           //  disabled={!org || !website}
  //         >
  //           <h3 style={{ padding: '1rem' }}>Save Changes</h3>
  //         </Button>
  //         <Button
  //           className={classes.greenButton}
  //           //  onClick={resetValues}
  //         >
  //           <h3 style={{ padding: '1rem' }}> Reset Values</h3>
  //         </Button>
  //         <Button className={classes.greenButton} onClick={logOut}>
  //           <h3 style={{ padding: '1rem' }}>Logout</h3>
  //         </Button>
  //       </div>
  //     </form>
  //   </div>
  // )
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

      if (Date.now() > exp) token = temp
    }
  }

  if (!token)
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
