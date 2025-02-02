import { Resend } from 'resend';
import envConstants from '../constants/env.constants';

const resend = new Resend(envConstants.RESEND_API_KEY);

export default resend;
