
// Report: Ads nach Anzahl der Matches

async function run() {
  const matches = db.collection("newMatches").get();                    // get match data
  const ads = db.collection("newAds").get();                            // get ad data
  const [matchesQuery, adsQuery] = await Promise.all([matches, ads]);   
  let matched = false;
  let myArray = {};

  // ADS
  for (const adsDoc of adsQuery.docs) {                 // for all ads

    const ads = adsDoc.data();
  
    var matchesPerAd = _.filter(matchesQuery.docs,      
      function(matchDoc){
        const match = matchDoc.data();
        if(match.adReference == ads.id) {               // if id = id
          console.log("Matched");
          matched = true;
          return ads.id;                                 
        } 
      }
    );

    console.log(matched);                              // matched true OR matched false

    if(matched == true) {                              // if true
        console.log(matchesPerAd);
        myArray[matchesPerAd]=matchesPerAd;            // list all objects that matched within the ad
    } 
    matched = false;                                   // set matched false
  }

  var adData = {"adData":myArray};                     
  return adData;
}
