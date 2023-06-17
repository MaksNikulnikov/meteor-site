const { LiveMysql, LiveMysqlSelect } = require("meteor/vlasky:mysql");
const LiveMysqlKeySelector = require("@vlasky/mysql-live-select/lib/LiveMysqlKeySelector");
import { Meteor } from "meteor/meteor";
import {DatabaseSettings, getDatabaseSettings } from "./live-db-settings";

const dbSettings: DatabaseSettings = getDatabaseSettings();
let liveConnection: typeof LiveMysql | undefined;
let query: string | undefined;

try {
  liveConnection = new LiveMysql({
    host: dbSettings?.host || "localhost",
    port: dbSettings?.port || 3306,
    user: dbSettings?.username || "your-username",
    password: dbSettings?.password || "your-password",
    database: dbSettings?.database || "your-database",
    serverId: dbSettings?.serverId || "your-serverId",
  });

  query = Meteor.settings?.private?.query;
} catch (error) {
  console.error("Failed to connect to MySQL:", error);
}

async function getCursor(): Promise<typeof LiveMysqlSelect> {
  try {
    const result = await liveConnection.select(
      query,
      null,
      LiveMysqlKeySelector.Index(),
      [{ table: "customers" }, { table: "positions" }]
    );
    return result;
  } catch (error) {
    console.error("Failed to get cursor:", error);
    throw error;
  }
}

export { getCursor };
