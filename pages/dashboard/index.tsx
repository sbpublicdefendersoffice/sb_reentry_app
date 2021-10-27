import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import WithPrivateRoute from '../../components/WithPrivateRoute'
import NextLink from 'next/link'
import { useToken, useUser } from '../../hooks/'
import { useFormFields } from '../../hooks'
import { POST } from '../../helpers/'
import { Button, TextField } from '@mui/material'
import { useStyles } from '../../constants'
const Dashboard = props => {
  const admin = null
  const [token, setToken] = useToken()
  const { push } = useRouter()
  const classes = useStyles()
  //might have to check how im pulling this in
  // const initialForm = {
  //   org: admin.org || '',
  //   website: admin.website || '',
  // }
  // const [adminInfo, setAdminInfo] = useFormFields(initialForm)
  // const { org, website } = adminInfo
  // const { id, org, website, isVerified } = admin

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  // useEffect(() => {
  //   if (showSuccessMessage || showErrorMessage) {
  //     setTimeout(() => {
  //       setShowSuccessMessage(false)
  //       setShowErrorMessage(false)
  //       // setAdminInfo({ ...props })
  //     }, 3000)
  //   }
  // }, [showSuccessMessage, showErrorMessage, org, website])
  // const saveChanges = async () => {
  //   try {
  //     const updateAdminInfo: Response = await fetch(`api/admins/${id}`, {
  //       method: POST,
  //       body: JSON.stringify(adminInfo),
  //       headers: { Authorization: `Bearer ${token}` },

  //       // org,
  //       // website
  //     })
  //   const apiResponse = await updateAdminInfo.json()
  //   const { token: newToken } = apiResponse
  //   //@ts-ignore
  //   setToken(newToken)
  //   setShowSuccessMessage(true)
  // } catch (error) {
  //   setShowErrorMessage(true)
  // }
  // const resetValues = () => {
  //   initialForm
  // }
  const logOut = () => {
    push('/')
  }
  //going to change
  return (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
      <form
        role="form"
        //  onSubmit={saveChanges}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h1>Dashboard Information for: {'ThriveSBC'}</h1>
          {/* {!isVerified && ( */}
          {/* <div className={'fail'}>
        You wont be able to make any changes until you verify your email
      </div> */}
          {/* )} */}
          {/* <h1>{login}</h1> */}
          {/* {errorMessage && <div className={'fail'}>{errorMessage}</div>} */}
          <TextField
            style={{ margin: '2rem 0 1rem 0' }}
            name="org"
            label="Organization"
            inputProps={{ style: { fontSize: '1.6rem' } }}
            InputLabelProps={{
              style: { fontSize: '1.5rem', fontWeight: 'bold' },
            }}
            // helperText="Organization"
            value={'thrivesbc'}
            // size="lg"
          />

          <TextField
            label={'Website'}
            value={'www.thrivesbc.com'}
            style={{ marginBottom: '2rem' }}
            name="website"
            inputProps={{ style: { fontSize: '1.6rem' } }}
            InputLabelProps={{
              style: { fontSize: '1.5rem', fontWeight: 'bold' },
            }}
            // onChange={setAdminInfo}
            placeholder={'website'}
          />
          <Button
            className={classes.greenButton}
            type="submit"
            //  disabled={!org || !website}
          >
            <h3 style={{ padding: '1rem' }}>Save Changes</h3>
          </Button>
          <Button
            className={classes.greenButton}
            //  onClick={resetValues}
          >
            <h3 style={{ padding: '1rem' }}> Reset Values</h3>
          </Button>
          <Button className={classes.greenButton} onClick={logOut}>
            <h3 style={{ padding: '1rem' }}>Logout</h3>
          </Button>
          {/* <Button onClick={getCookie}>Log In To Thrive</Button> */}
        </div>
      </form>
    </div>
  )
}

Dashboard.getInitialProps = async props => {
  console.info('### Congrats? You are authorized', props)
  return {}
}
export default WithPrivateRoute(Dashboard)
