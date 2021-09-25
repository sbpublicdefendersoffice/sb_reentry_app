import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'

const secret: string = 'Super Secret, Secret Squirrel!'

const test = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const headers: { [name: string]: string } = req.headers.cookie
    .split(';')
    .reduce((obj, str) => {
      const split: string[] = str.split('=')
      obj[split[0].trim()] = split[1]

      return obj
    }, {})

  const token = verify(headers['Auth-Token'], secret)

  res.send({})
  try {
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}

export default test
