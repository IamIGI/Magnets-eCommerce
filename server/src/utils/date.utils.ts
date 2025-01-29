import { format } from 'date-fns/format';

const getDate = () => format(new Date(), 'yyyy.MM.dd-HH:mm');

const oneYearFromNowInMs = () =>
  new Date(Date.now() + 1000 * 60 * 60 * 24 * 365);

const thirtyDaysFromNowInMS = () =>
  new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

const fifteenMinutesFromNowInMS = () => new Date(Date.now() + 1000 * 60 * 15);

const daysInMS = (value: number) => 1000 * 60 * 60 * 24 * value;

export default {
  getDate,
  oneYearFromNowInMs,
  thirtyDaysFromNowInMS,
  fifteenMinutesFromNowInMS,
  daysInMS,
};
