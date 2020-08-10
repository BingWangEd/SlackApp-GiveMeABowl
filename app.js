const http = require('http');
const { httpsGetRequest } = require('./src/httpsMethods');
const { parse } = require('querystring');

//create a server object:
const server = http.createServer(async (req, res) => {
  if (req.method !== 'POST') return;

  collectRequestData(req, (result) => {
    if (!result) return;
    console.log('result: ', result);
    // send response
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
  });
}); //the server object listens on port 3000

const collectRequestData = (request, callback) => {
  const FORM_URLENCODED = 'application/x-www-form-urlencoded';
  let result = null;
  return new Promise((resolve, reject) => {
    if(request.headers['content-type'] === FORM_URLENCODED) {
      // parse and read data
      let body = [];
      request.on('data', chunk => {
        body.push(chunk);
      });
      request.on('end', () => {
        // request content type: application/x-www-form-urlencoded
        body = Buffer.concat(body).toString();
        result = callback(parse(body));
        resolve(result);
      });
    } else {
      reject(callback(null)); // call error
    }
  });
}

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
