const request = require('request');

const fetchMyIP = function(callback) {
  const iPv4 = `https://api.ipify.org?format=json`;
  //use request to fetch IP address from JSON API
  
  request(iPv4, (error, response, body) => {
    console.log('error:', error);
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const ipData = JSON.parse(body);
    const ip = ipData.ip;
    
    if (ip) {
      callback(null, ip);
    } else {
      callback(null, 'No IP was found');
    }
  
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const getCoords = `https://ipvigilante.com/${ip}`;

  request(getCoords, (error, response, body) => {
    console.log('error:', error);
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const coords = JSON.parse(body);
    const { latitude: lat, longitude: lon } = coords.data;
    
    callback(null, { lat, lon });

  });
};

const fetchISSFlyOverTimes = function(coordinates, callback) {
  const flyOver = `http://api.open-notify.org/iss-pass.json?lat=${coordinates.lat}&lon=${coordinates.lon}`;

  request(flyOver, (error, response, body) => {
    console.log('error:', error);
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover times with coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const flyOverTimes = JSON.parse(body).response;

    callback(null, flyOverTimes); //returns array of 5 {duration: num, risetime: num}

  });
};

const nextISSTimesForMyLocation = (callback) => {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);


      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };











