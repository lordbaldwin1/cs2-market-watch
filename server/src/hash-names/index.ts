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
  console.log(marketItems?.start);
  await gatherMarketItems(offset + 10);
}

await main();
