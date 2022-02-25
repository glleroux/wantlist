const {wantlist} = require("./rtbWantlist");

const records = wantlist.map(record => ({title: record.basic_information.title, price: record.price, rank: 1500}))

const monthlyAmount = 30

const buyHighestRankedRecords = (records, monthlyAmount) => {
    let recordListPreferenceRanked = records.sort((a, b) => a.rank - b.rank);
    console.log(recordListPreferenceRanked)
    let budget = monthlyAmount
    let buyList = []
  
    for (const record of recordListPreferenceRanked) {
        if (record.price <= budget) {
            console.log(record.name, 'added to buyList')
            buyList.push(record.name)
            budget = parseFloat((budget - record.price).toFixed(2))
            console.log('budget now', budget)
            recordListPreferenceRanked = recordListPreferenceRanked.filter(r => r.name !== record.name)
            console.log(recordListPreferenceRanked.length, 'records remaining')
        }

    }
    console.log(buyList)
    return buyList
}

const buyMostRecords = (records, monthlyAmount) => {
    let recordListPriceRanked = records.sort((a, b) => a.price - b.price);
    console.log(recordListPriceRanked)
    let budget = monthlyAmount
    let buyList = []
  
    for (const record of recordListPriceRanked) {
      if (record.price === null) {
        continue
      } else if (record.price <= budget) {
            console.log(record.title, 'added to buyList')
            buyList.push(record.title)
            budget = parseFloat((budget - record.price).toFixed(2))
            console.log('-- Budget remaining:', budget)
            recordListPriceRanked = recordListPriceRanked.filter(r => r.title !== record.title)
        }

    }
    console.log('You can buy', buyList.length, "records")
    console.log(buyList)
    return buyList
}

// buyHighestRankedRecords(records, monthlyAmount)
buyMostRecords(records, monthlyAmount)
