const https = require('https');

const httpsGetRequest = (requestUrl) => {
  return new Promise((resolve, reject) => {
    https.get(requestUrl, (res) => {
      console.log('Get request response status code: ', res.statusCode);

      if (res.statusCode < 200 || res.statusCode >= 300) {
        reject(res.statusCode);
      }

      let data = '';
    
      // A chunk of data has been recieved.
      res.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received. Print out the result.
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    }).on('error', (error) => {
      console.error(`Get request error: ${error.message}`);
      reject(error);
    }).end();
  });
};

module.exports = { 
  httpsGetRequest,
};
