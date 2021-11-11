import sendGrid from '@sendgrid/mail'

sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

export const sendEmail = ({ to, from, subject, text, html }) => {
  const msg = { to, from, subject, text, html }
  return sendGrid.send(msg)
}
