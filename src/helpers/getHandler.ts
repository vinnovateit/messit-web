import axios from 'axios';
import Cookies from 'js-cookie';

const getHandler = async (URL: string, protect: boolean) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: '',
  };
  const token = Cookies.get('token');
  if (protect) headers.Authorization = `Bearer ${token}`;

  const response: any = {
    status: 0,
    data: '',
    statusCode: 500,
  };
  await axios
    .get(URL, { headers })
    .then(res => {
      response.status = 1;
      response.data = res.data;
      response.statusCode = res.status;
    })
    .catch(err => {
      response.status = 0;
      response.data = err.response.data;
      response.statusCode = 500;
      return response;
    });
  return response;
};

export default getHandler;