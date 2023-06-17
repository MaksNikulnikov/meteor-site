import { DataSource } from "typeorm";
import { Translation } from "./models/Translation";
import { Meteor } from "meteor/meteor";

const dbSettings = Meteor.settings?.private?.database;
export const AppDataSource = new DataSource({
  type: dbSettings?.type || "mysql",
  host: dbSettings?.host || "localhost",
  port: dbSettings?.port || 3306,
  username: dbSettings?.username || "your-username",
  password: dbSettings?.password || "your-password",
  database: dbSettings?.database || "your-database",
  entities: [Translation],
  synchronize: dbSettings?.synchronize || true,
  logging: dbSettings?.logging || true,
});
