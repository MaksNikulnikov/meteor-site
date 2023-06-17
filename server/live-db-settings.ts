import { Meteor } from "meteor/meteor";

interface DatabaseSettings {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  serverId: number;
}

function getDatabaseSettings(): DatabaseSettings {
  const dbSettings: any = Meteor.settings?.private?.database;

  return {
    host: dbSettings?.host || "localhost",
    port: dbSettings?.port || 3306,
    username: dbSettings?.username || "your-username",
    password: dbSettings?.password || "your-password",
    database: dbSettings?.database || "your-database",
    serverId: 1,
  };
}

export { DatabaseSettings, getDatabaseSettings };
