import { Mongo } from 'meteor/mongo';
import { CustomerDataItem } from './types';

const CustomerData = new Mongo.Collection<CustomerDataItem>('customerData');

export { CustomerData };
