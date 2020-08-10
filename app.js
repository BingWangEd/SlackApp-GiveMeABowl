const http = require('http');
const { httpsGetRequest } = require('./src/httpsMethods');

//create a server object:
http.createServer(async (req, res) => {
  const requestUrl = 'https://next.json-generator.com/api/json/get/VkM--CPgY';
  const result = await httpsGetRequest(requestUrl);
  console.log('result: ', result);

  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
  
}).listen(3000); //the server object listens on port 3000
