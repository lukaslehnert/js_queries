
// Report: Ads nach Anzahl der Matches

async function run() {
  const matches = db.collection("newMatches").get();
  const ads = db.collection("newAds").get();
  const [matchesQuery, adsQuery] = await Promise.all([matches, ads]);
  let noAdNumberCount = 0;
  let adNumberCount = 0;
  let totalNumberAdsCount = 0;
  let matchCount = 0;

  availableAds = {};
  matchesPerAdList = {};
  specificAds = {};

  // ADS
  for (const adsDoc of adsQuery.docs) {

    const ads = adsDoc.data();

    if(ads.adNumber == "") noAdNumberCount++;
    else adNumberCount++;
    totalNumberAdsCount = adNumberCount + noAdNumberCount;

    var adsWithNumber = _.filter(adsQuery.docs, // return city data
      function(adsDoc){
        const ads = adsDoc.data();
        if(ads.city == "" || ads.adNumber == "") return 0;
        else return ads.city;
      }
    )
  
    var matchesPerAd = _.filter(matchesQuery.docs,
      function(matchDoc){
        const match = matchDoc.data();
        if(match.adReference == ads.id) {
          return true;
        } 
        else {return false};
      }
    ).length;

    if(matchesPerAd in matchesPerAdList) {
      matchesPerAdList[matchesPerAd] +=1;
    } 
    else {matchesPerAdList[matchesPerAd] =1;
    }
  }

  //console.log(matchesPerAd);
  //console.log(matchesPerAdList);

  availableAds = {adsWithNumber};

  // MATCHES
  for (const matchDoc of matchesQuery.docs) {
    const match = matchDoc.data();
    matchCount++;
  }

  var adData = [{"noAdNumberCount":noAdNumberCount, "adNumberCount":adNumberCount,  
                "totalNumberAdsCount":totalNumberAdsCount,  
                "x_avalableAds":availableAds, "matchesPerAdList":matchesPerAdList}]


  return adData;

}


