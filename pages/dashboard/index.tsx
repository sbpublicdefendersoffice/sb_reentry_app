import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import WithPrivateRoute from '../../components/WithPrivateRoute'
import NextLink from 'next/link'
import { useToken, useUser } from '../../hooks/'
import { useFormFields } from '../../hooks'
import { POST } from '../../helpers/'
import { Button } from '../../ui'

const Dashboard = props => {
  const admin = null
  const [token, setToken] = useToken()
  const { push } = useRouter()

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
    <div>
      {/* <form
        role="form"
        //  onSubmit={saveChanges}
      > */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <h1>Info for ___</h1>
        {/* {!isVerified && ( */}
        <div className={'fail'}>
          You wont be able to make any changes until you verify your email
        </div>
        {/* )} */}
        {/* <h1>{login}</h1> */}
        {/* {errorMessage && <div className={'fail'}>{errorMessage}</div>} */}
        {/* <input
              value={org}
              name="org"
              onChange={setAdminInfo}
              placeholder="org"
            />
            <input
              value={website}
              name="website"
              onChange={setAdminInfo}
              placeholder={'website'}
            /> */}
        <Button
          type="submit"
          //  disabled={!org || !website}
        >
          Save Changes
        </Button>
        <Button
        //  onClick={resetValues}
        >
          Reset Values
        </Button>
        <Button onClick={logOut}>Logout</Button>
        {/* <Button onClick={getCookie}>Log In To Thrive</Button> */}
      </div>
      {/* </form> */}
    </div>
  )
}

Dashboard.getInitialProps = async props => {
  console.info('### Congrats? You are authorized', props)
  return {}
}
export default WithPrivateRoute(Dashboard)
