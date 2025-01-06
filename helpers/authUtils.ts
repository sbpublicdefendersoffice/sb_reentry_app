import { JwtPayload, verify } from 'jsonwebtoken'

/**
 * Verifies and decodes a JWT-signed auth token from cookies.
 * @param cookie - The raw cookie string from the request headers.
 * @returns The decoded JWT payload if valid, otherwise undefined.
 */
export const getVerifiedAuthToken = (
  cookie: string,
): JwtPayload | undefined => {
  if (!cookie || typeof cookie !== 'string') {
    console.warn('Invalid or empty cookie string provided.')
    return undefined
  }

  try {
    // Manually parse cookies
    const headers: { [name: string]: string } = cookie
      .split(';')
      .reduce((obj, str) => {
        const split: string[] = str.split('=')
        obj[split[0].trim()] = split[1].trim()

        return obj
      }, {})

    const authToken = headers['Auth-Token']
    if (!authToken) {
      console.warn('Auth-Token not found.')
      return undefined
    }

    // If verification fails it will throw an error
    const verifiedToken = verify(
      authToken,
      process.env.JWT_SIGNATURE,
    ) as JwtPayload

    if (!verifiedToken.exp || Date.now() >= verifiedToken.exp * 1000) {
      console.warn('Auth-Token is expired.')
      return undefined
    }

    return verifiedToken
  } catch (error) {
    console.error('Failed to verify Auth-Token')
    return undefined
  }
}

/**
 * Checks if a user is authorized to access a resource based on their JWT token
 *  user ID and the request body's client ID.
 * @param verifiedAuthToken - Decoded JWT payload containing the user's ID.
 * @param clientId - The client ID from the request body.
 * @returns True if authorized, otherwise false.
 */
export const isAuthorizedUserForId = (
  verifiedAuthToken: JwtPayload | undefined,
  clientId: number,
): boolean => {
  if (!verifiedAuthToken || !clientId || typeof clientId !== 'number') {
    return false
  }

  const tokenId = verifiedAuthToken['id']
  if (!tokenId || typeof tokenId !== 'number') {
    return false
  }

  return tokenId === clientId
}
