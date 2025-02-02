import resend from '../config/resendEmail.config';
import envConstants from '../constants/env.constants';

interface Params {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const getFromEmail = () =>
  envConstants.PROD === 'false'
    ? 'onboarding@resend.dev'
    : envConstants.EMAIL_SENDER; //TODO: https://resend.com/domains

const getToEmail = (to: string) =>
  envConstants.PROD === 'false' ? 'delivered@resend.dev' : to;

export async function sendEmail({ to, subject, text, html }: Params) {
  return await resend.emails.send({
    from: getFromEmail(),
    to: getToEmail(to),
    subject,
    text,
    html,
  });
}
