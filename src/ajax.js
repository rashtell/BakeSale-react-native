const apiHost = 'https://bakesaleforgood.com'

export default {
  async fetchInitialDeals() {
    try {
      const res = await fetch(apiHost + '/api/deals')
      const resJson = await res.json()
      return resJson
    } catch (error) {
      console.error(error)
    }
  },

  async fetchDealDetail(dealId) {
    try {
      const res = await fetch(`${apiHost}/api/deals/${dealId}`)
      const resJson = await res.json()
      return resJson
    } catch (error) {
      console.error(error)
    }
  },

  async fetchDealsSearchResult(searchTerm) {
    try {
      const res = await fetch(`${apiHost}/api/deals?searchTerm=${searchTerm}`)
      const resJson = await res.json()
      console.log('ajax: fetchDealsSearchResult: resJson: '+JSON.stringify(resJson));
      
      return resJson
    } catch (error) {
      console.error(error)
    }
  }
}
