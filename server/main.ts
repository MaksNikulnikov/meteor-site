import { Meteor } from 'meteor/meteor';
import { AppDataSource } from "./data-source";
import { Translation } from './models/Translation';
import { getCursor } from './live-connection';

Meteor.startup(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Connected to the database!");
  } catch (error) {
    console.error("Database connection error:", error);
  }

  Meteor.publish('customerData', getCursor);
});

Meteor.methods({
  async translatePosition(token: string) {
    const translation = await Translation.findByName(token);
    return translation.length > 0 ? translation[0].translation : token;
  },
});
