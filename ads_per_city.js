
///////// Ads pro Stadt /////////////////////////

async function run() {
  const adsPromise = db.collection("newAds").get();
  const matchPromise = db.collection("newMatches").get();
  const [adsQuery, matchQuery] = await Promise.all([adsPromise, matchPromise]);
  const matchDocsById = _.keyBy(adsQuery.docs, (match) => match.id);
  let countWien = 0;
  let countGraz = 0;
  let countLinz = 0;
  let countOther = 0;
  let countAdNumberEmpty = 0;
  let countCityEmpty = 0;
  let countNumberOrCityEmpty = 0;
  let countNumberAndCityEmpty = 0;
  let totalNumber = 0;
  let countRelevantTotal = 0;

  let testing = 0;

  let otherCity;
  let wienCity;

const matchesPerCityList = {};

  for (const adsDoc of adsQuery.docs) {
    const ads = adsDoc.data();
    //const matchDoc = matchDocsById[ads.id];

    totalNumber++;

    if(ads.adNumber == ""){
      countAdNumberEmpty++;
    }
    if(ads.city == ""){
      countCityEmpty++;
    }
    if(ads.city == "" || ads.adNumber == ""){
      countNumberOrCityEmpty++;
    }
    if(ads.city == "" && ads.adNumber == ""){
      countNumberAndCityEmpty++;
    }
    if(ads.city != "" && ads.adNumber != ""){
      countRelevantTotal++;
    }
    if(ads.adNumber != "" && ads.city == "Wien"){
      countWien++;
    }  
    if(ads.adNumber != "" && ads.city == "Graz"){
      countGraz++;
    } 
    if(ads.adNumber != "" && ads.city == "Linz"){
      countLinz++;
    } 
    //else {countOther++;}

    var matchesPerCity = _.filter(matchQuery.docs,
      function(matchDoc){
        const match = matchDoc.data();

        if(match.adReference == ads.id){              //match adReference with id

          if (matchDoc != null && ads.city != "") {   // filter null and empty city 

            if(ads.city == "Wien"){                   // if else statement = working
              console.log("value in Wien");
              wienCity = ads.city;
              //matchesPerCityList[wienCity]++;         /*TODO*/ // UNEXPECTED BEHAVIOUR
              matchesPerCityList[wienCity] = testing++;
              return true;
            }
            else {                                    // works fine
              console.log("value in Other");
              otherCity = ads.city;
              //matchesPerCityList[otherCity]++;        /*TODO*/ // UNEXPECTED BEHAVIOUR
              matchesPerCityList[otherCity] = testing++;
              return false;
            }
          }
        }
      }
    );
  }

  if(matchesPerCity in matchesPerCityList) {
    console.log("IF");
    matchesPerCityList[matchesPerCity] += 1;
  } 
  else { 
    console.log("ELSE");
    matchesPerCityList[matchesPerCity];           /*TODO*/ //How to add counted data to specific city 
  }


  console.log(matchesPerCityList[matchesPerCity]);
  console.log(matchesPerCityList);

  console.log(countOther);
  console.log(countWien);
  console.log(countGraz);

  var reportData = [{AdsTotal:totalNumber,RelevantTotal:countRelevantTotal,Wien:countWien,Graz:countGraz,Linz:countLinz,CountAdNumberEmpty:countAdNumberEmpty,CountNumberAndCityEmpty:countNumberAndCityEmpty,CountCityEmpty:countCityEmpty,CountNumberOrCityEmpty:countNumberOrCityEmpty,"x_matchesPerCityList":matchesPerCityList}];

  return reportData;
}
