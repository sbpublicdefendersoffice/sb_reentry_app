import { NextApiRequest, NextApiResponse } from 'next'

const logout = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    res.setHeader(
      'Set-Cookie',
      'Auth-Token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
    )
    res.json({ logOut: 'You have been signed out' })
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}

export default logout
