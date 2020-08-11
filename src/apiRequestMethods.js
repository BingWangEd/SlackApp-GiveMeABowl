const { httpsGetRequest } = require('./httpsMethods');
const config = require('../config');

const fetchCoordsData = async (location) => {
  // get area longitude and latitude based on location name
  const locationNoSpace = location.replace(/ /g, "+");
  const OPEN_CAGE_API_KEY = config('OPEN_CAGE_API_KEY');
  const coordsRequestUrl = `https://api.opencagedata.com/geocode/v1/geojson?q=${locationNoSpace}&key=${OPEN_CAGE_API_KEY}&pretty=1`;

  try {
    const coordsData = await httpsGetRequest(coordsRequestUrl);
    const [ long, lat ] = coordsData.features[0].geometry.coordinates;
    return { lat, long }; 
  } catch (error) {
    console.log('get coords error: ', error);
    throw ERROR_TYPE.COORDS;
  }
}

module.exports = {
  fetchCoordsData
};
