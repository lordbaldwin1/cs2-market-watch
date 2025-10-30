import { integer, pgTable, real, text, uuid } from "drizzle-orm/pg-core";

export const marketItems = pgTable("market_items", {
  id: uuid().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  hashName: text("hash_name").notNull().unique(),
  sellListings: real("sell_listings").notNull(),
  sellPrice: real("sell_price").notNull(),
  sellPriceText: text("sell_price_text").notNull(),
  appIcon: text("app_icon").notNull(),
  appName: text("app_name").notNull(),
  appId: integer("app_id").notNull(),
  classId: text("class_id").notNull(),
  instanceId: text("instance_id").notNull(),
  backgroundColor: text("background_color").notNull(),
  iconUrl: text("icon_url").notNull(),
  tradable: integer("tradable").notNull(),
  assetName: text("asset_name").notNull(),
  nameColor: text("name_color").notNull(),
  type: text("type").notNull(),
  marketName: text("market_name").notNull(),
  marketHashName: text("market_hash_name").notNull().unique(),
  commodity: integer("commodity").notNull(),
  salePriceText: text("sale_price_text").notNull(),
});

export type NewMarketItem = typeof marketItems.$inferInsert;
export type MarketItem = typeof marketItems.$inferSelect;