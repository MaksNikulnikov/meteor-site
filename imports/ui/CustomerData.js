import { Mongo } from 'meteor/mongo';

const CustomerData = new Mongo.Collection('customerData');

export {CustomerData};
