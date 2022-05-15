
// Report: Ads nach Anzahl der Matches

async function run() {
  const matches = db.collection("newMatches").get();                    // get match data
  const ads = db.collection("newAds").get();                            // get ad data
  const [matchesQuery, adsQuery] = await Promise.all([matches, ads]);   
  let matched = false;
  let myArray = {};

  // ADS
  for (const adsDoc of adsQuery.docs) {

    const ads = adsDoc.data();
  
    var matchesPerAd = _.filter(matchesQuery.docs,
      function(matchDoc){
        const match = matchDoc.data();
        if(match.adReference == ads.id) {
          console.log("Matched");
          matched = true;
          return ads.id;
        } 
      }
    );
    
  console.log(matched);

  if(matched == true) {
    console.log(matchesPerAd);
    var adData = {"adData":matchesPerAd};
    return adData;
  }

  matched = false;
  myArray = {matchesPerAd};

  //var adData = {"adData":myArray, "matchesPerAd":matchesPerAd}
  //return adData;
  }
}
