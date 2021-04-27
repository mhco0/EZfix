import axios from 'axios'

//const CSRF_COOKIE_NAME = 'csrftoken';
//const CSRF_HEADER_NAME = 'X-CSRFToken';

const session = axios.create({
  baseURL: 'http://localhost:3000/'
});

export default session