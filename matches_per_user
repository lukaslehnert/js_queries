
async function run() {
  const matchesPromise = db.collection("newMatches").get();
  const usersPromise = db.collection("newUsers").get();
  const [matchesQuery, usersQuery] = await Promise.all([matchesPromise, usersPromise]);
  let noMatches = 0;
  let noMatchesPercentage = 0;
  let matches = 0;
  let matchesPercentage = 0;
  let userCount = 0;
  let landlordCount = 0;
  let tenantCount = 0;
  let supplyDemandRatio = 0;
  //const matchesByTenantIds = _.keyBy(matchesQuery.docs, (doc) => doc.tenantReference);
  //console.log( _.countBy(matchesQuery.docs, 'tentantReference') );

/*for (const matchDoc of matchesQuery.docs) {
  const match = matchDoc.data();
  console.log(match.tenantReference);
}*/

numberOfUsersPerMatchCount = {};

  //console.log(matchesByTenantIds);
  for (const userDoc of usersQuery.docs) {

    const user = userDoc.data();

    userCount++;
    if(user.userType == "tenant") tenantCount++;
    if(user.userType == "landlord") landlordCount++;

    supplyDemandRatio = landlordCount/tenantCount;

    //console.log(user.firstName + ' ' + user.lastName + ' ' + user.id);

    //user.id -> tenantReference or landlordReference
    var matchesOfThisUser = _.filter(matchesQuery.docs, 
          function(matchDoc){ 
            const match = matchDoc.data();
            if(match.tenantReference == user.id)
              return true;
            else if(match.landlordReference == user.id)
              return true;
            return false;
          }).length;
    if(matchesOfThisUser in numberOfUsersPerMatchCount) {
      numberOfUsersPerMatchCount[matchesOfThisUser] += 1;

      var matchData = [{"id":1,"name":"matches","counter":0,"percentage":0}, 
                      {"id":2,"name":"noMatches","counter":0,"percentage":0}, 
                      {"id":3,"totalUsers":userCount,"landlordCount":landlordCount,"tenantCount":tenantCount,
                      "supplyDemandRatio":supplyDemandRatio,"x_numberOfMatchesPerMatchCount":numberOfUsersPerMatchCount}];

      if(matchesOfThisUser > 0) {
        matches++;
      }
      matchesPercentage = matches/userCount;
      matchData[0].counter = matches;
      matchData[0].percentage = matchesPercentage;

      if(matchesOfThisUser < 1) {
        noMatches++;
      }
      noMatchesPercentage = noMatches/userCount;
      matchData[1].counter = noMatches;
      matchData[1].percentage = noMatchesPercentage;
    }
    else {
      numberOfUsersPerMatchCount[matchesOfThisUser] = 1;
    }
  } // for

  return matchData;

//console.log('Total number of elements are:', {userCount});
//console.log(matchData);
//console.log(numberOfUsersPerMatchCount);
//return numberOfUsersPerMatchCount;
} // async function

