import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useState } from 'react'

// import NextLink from 'next/link'

import { verify } from 'jsonwebtoken'
import { Button, TextField } from '@mui/material'
import { useStyles } from '../../constants'
interface DashboardProps {
  userId: number
  isVerified: boolean
}
const Dashboard = ({ userId, isVerified }: DashboardProps) => {
  // if !isVerified we could present info showing that you have not been verified yet, please wait
  // if !isVerfied and userId === 0 we could tell them to sign up
  // if there is both we could institute a request to fetch all the info
  console.log(userId, isVerified)
  const admin = null

  const { push } = useRouter()
  const classes = useStyles()

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const logOut = async () => {
    const loggingOut: Response = await fetch('/api/logout')
    const logoutMessage = await loggingOut.json()

    if (logoutMessage.error) console.log('oh no!')
    else {
      console.log('oh yeah')
      push('/')
    }
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

          <TextField
            style={{ margin: '2rem 0 1rem 0' }}
            name="org"
            label="Organization"
            inputProps={{ style: { fontSize: '1.6rem' } }}
            InputLabelProps={{
              style: { fontSize: '1.5rem', fontWeight: 'bold' },
            }}
            value={'thrivesbc'}
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
    props: {
      userId: Number(token?.id),
      isVerified: Boolean(token?.isVerified),
    },
  }
}
