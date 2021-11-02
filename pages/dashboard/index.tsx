import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React, { useState, useEffect } from 'react'

// import NextLink from 'next/link'

import { verify } from 'jsonwebtoken'
import { Button, TextField } from '@mui/material'
import { useStyles } from '../../constants'
interface DashboardProps {
  userLoggedIn: boolean
}
const Dashboard = ({ userLoggedIn }: DashboardProps) => {
  const admin = null

  const { push } = useRouter()
  const classes = useStyles()

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)

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
    props: token === undefined ? {} : { userLoggedIn: token?.userLoggedIn },
  }
}
