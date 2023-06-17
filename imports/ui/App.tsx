import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { ClientTable } from './ClientTable';

const App: React.FC = () => {
  const subscriptionReady = useTracker(() => {
    try {
      const cursor = Meteor.subscribe('customerData');
      return cursor.ready();
    } catch (error) {
      console.error('Subscription Error:', error);
      return false;
    }
  }, []);

  useEffect(() => {
    return () => {
      Meteor.subscribe('customerData').stop();
    };
  }, []);

  if (!subscriptionReady) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <ClientTable />
    </div>
  );
};

export { App }; 
