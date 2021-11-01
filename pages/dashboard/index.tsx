import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React, { useState } from 'react'
import { useToken } from '../../hooks/'
import { verify } from 'jsonwebtoken'
import { Button, TextField } from '@mui/material'
import { useStyles } from '../../constants'
interface DashboardProps {
  userLoggedIn: boolean
}
const Dashboard = ({ userLoggedIn }: DashboardProps) => {
  const admin = null
  const [token, setToken] = useToken()
  const { push } = useRouter()
  const classes = useStyles()

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

    if (headers['Auth-Token'])
      token = verify(headers['Auth-Token'], process.env.JWT_SIGNATURE)
  }

  return {
    props: token === undefined ? {} : { userLoggedIn: token?.userLoggedIn },
  }
}
