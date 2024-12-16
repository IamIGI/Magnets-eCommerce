import { format } from 'date-fns/format';

function getDate() {
  return format(new Date(), 'yyyy.MM.dd-HH:mm');
}

export default { getDate };
