export interface MarketSearchRenderResponse {
    success: boolean
    start: number
    pagesize: number
    total_count: number
    searchdata: Searchdata
    results: Result[]
  }
  
  export interface Searchdata {
    query: string
    search_descriptions: boolean
    total_count: number
    pagesize: number
    prefix: string
    class_prefix: string
  }
  
  export interface Result {
    name: string
    hash_name: string
    sell_listings: number
    sell_price: number
    sell_price_text: string
    app_icon: string
    app_name: string
    asset_description: AssetDescription
    sale_price_text: string
  }
  
  export interface AssetDescription {
    appid: number
    classid: string
    instanceid: string
    background_color: string
    icon_url: string
    tradable: number
    name: string
    name_color: string
    type: string
    market_name: string
    market_hash_name: string
    commodity: number
  }
  