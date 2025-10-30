import { db } from "..";
import { marketItems, type NewMarketItem } from "../schema";

export const QUERIES = {};

// inferred async since they return a promise
export const MUTATIONS = {
  insertMarketItem: function (newItem: NewMarketItem) {
    return db
      .insert(marketItems)
      .values(newItem)
      .onConflictDoUpdate({
        target: marketItems.marketHashName,
        set: {
          name: newItem.name,
          sellListings: newItem.sellListings,
          sellPrice: newItem.sellPrice,
          sellPriceText: newItem.sellPriceText,
          appIcon: newItem.appIcon,
          appName: newItem.appName,
          appId: newItem.appId,
          classId: newItem.classId,
          instanceId: newItem.instanceId,
          backgroundColor: newItem.backgroundColor,
          iconUrl: newItem.iconUrl,
          tradable: newItem.tradable,
          assetName: newItem.assetName,
          nameColor: newItem.nameColor,
          type: newItem.type,
          marketName: newItem.marketName,
          commodity: newItem.commodity,
          salePriceText: newItem.salePriceText,
        },
      })
      .returning();
  },
};
