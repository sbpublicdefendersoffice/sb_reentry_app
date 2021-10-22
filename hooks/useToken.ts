import { useState } from 'react'
const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem('token')
  })
  console.log(
    '🚀 ~ file: useToken.ts ~ line 6 ~ const[token,setTokenInternal]=useState ~ token',
    token,
  )
  const setToken = newToken => {
    console.log('newToken:', newToken)

    localStorage.setItem('token', newToken)
    setTokenInternal(newToken)
  }
  return [token, setToken]
}
export default useToken
