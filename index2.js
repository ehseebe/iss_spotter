const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => { printPassTimes(passTimes);
  })
  // .catch((error) => {
  //   console.log("It didn't work:", error.message);
  // });




// fetchMyIP()
//   .then(fetchCoordsByIP) //this line returns the object coordinates from ip vigilante, next we have to parse the coords
//   .then(fetchISSFlyOverTimes) //this line will return the object with the flyover times
//   .then(fet)
//   .then(body => console.log(body)); 
