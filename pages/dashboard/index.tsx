import { useRouter } from 'next/router'
import React from 'react'
import WithPrivateRoute from '../../components/WithPrivateRoute'
import NextLink from 'next/link'
const Dashboard = props => {
  //going to change
  return <div>Entering your private dashboard.</div>
}
Dashboard.getInitialProps = async props => {
  console.info('### Congrats? You are authorized', props)
  return {}
}
export default WithPrivateRoute(Dashboard)
