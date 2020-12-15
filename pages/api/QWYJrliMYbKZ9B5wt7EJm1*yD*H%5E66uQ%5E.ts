// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  const { host, authorization } = req.headers
  res.json([host, authorization])
}
