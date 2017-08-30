import createHttpResponse from './createHttpResponse';


export default (error, statusCode = 500, headers) => createHttpResponse({
  message: error.message,
}, statusCode, headers);
