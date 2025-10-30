import { MUTATIONS } from "../db/queries/queries";
import type { MarketItem, NewMarketItem } from "../db/schema";
import type { MarketSearchRenderResponse } from "./types";

const MARKET_SEARCH_URL =
  "https://steamcommunity.com/market/search/render/?appid=730&norender=1&count=100&start=";
const MAX_SEARCH_ITEMS = 26000;

async function main() {
  await gatherMarketItems(0);
  console.log("stink");
}

async function fetchMarketSearchPage(offset: number) {
  let data: MarketSearchRenderResponse;
  try {
    const result = await fetch(`${MARKET_SEARCH_URL}${offset}`, {
      method: "GET",
      headers: {
        "User-Agent": "CS2-Market-Watch/1.0",
      },
    });

    if (!result.ok) {
      console.error(`[NON-OK] ${result.status}: ${result.statusText}`);
      return;
    }

    data = (await result.json()) as MarketSearchRenderResponse;

    if (!data.success) {
      console.error("[error] success field false");
      return;
    }
  } catch (err) {
    console.error(`${(err as Error).message}`);
    return;
  }

  return data;
}

async function gatherMarketItems(offset: number) {
  if (offset > MAX_SEARCH_ITEMS) {
    return;
  }

  const minDelay = 1500; // 1.5 seconds
  const maxDelay = 2500; // 2.5 seconds
  const randomDelay =
    Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

  await new Promise((resolve) => {
    setTimeout(resolve, randomDelay);
  });

  const marketItems = await fetchMarketSearchPage(offset);
  
  marketItems?.results.forEach(async (result) => {
    const newMarketItem: NewMarketItem = {
      name: result.name,
      hashName: result.hash_name,
      sellListings: result.sell_listings,
      sellPrice: result.sell_price,
      sellPriceText: result.sell_price_text,
      appIcon: result.app_icon,
      appName: result.app_name,
      appId: result.asset_description.appid,
      classId: result.asset_description.classid,
      instanceId: result.asset_description.instanceid,
      backgroundColor: result.asset_description.background_color,
      iconUrl: result.asset_description.icon_url,
      tradable: result.asset_description.tradable,
      assetName: result.asset_description.name,
      nameColor: result.asset_description.name_color,
      type: result.asset_description.type,
      marketName: result.asset_description.market_name,
      marketHashName: result.asset_description.market_hash_name,
      commodity: result.asset_description.commodity,
      salePriceText: result.sale_price_text,
    };

    const [addedItem] = await MUTATIONS.insertMarketItem(newMarketItem);
    console.log(addedItem ? `Item added ${addedItem.hashName}` : "Failed to add item");
  })
  await gatherMarketItems(offset + 10);
}

await main();
