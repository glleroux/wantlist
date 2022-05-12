import axios from "axios";
import rateLimit from "axios-rate-limit";

const token = process.env.REACT_APP_DISCOGS_PERSONAL_TOKEN;

const getWantlistPrices = async (wantlist) => {
    const http = rateLimit(axios.create(), {
      maxRequests: 1,
      perMilliseconds: 1000,
      maxRPS: 1
    });
    http.getMaxRPS();
  
    const getPrice = async (releaseID, currency = "GBP") => {
      const response = await http.get(
        `https://api.discogs.com/marketplace/stats/${releaseID}?${currency}&token=${token}`
      );
      const lowestPrice = response.data.lowest_price;
      const releasePrice = lowestPrice ? lowestPrice.value : null;
      console.log(`${releaseID}: ${releasePrice}`);
      return releasePrice;
    };
  
    const pricedReleases = await Promise.all(
      wantlist.map(async (release) => ({
        ...release,
        price: await getPrice(release.id)
      }))
    );
    console.log('finish')
    console.log(pricedReleases)
    return pricedReleases;
  };
  
  export default getWantlistPrices;
  