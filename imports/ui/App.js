import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { ClientTable } from './ClientTable';

const App = () => {
  const subscriptionReady = useTracker(() => {
    const handle = Meteor.subscribe('customerData');
    return handle.ready();
  }, []);

  useEffect(() => {
    return () => {
      Meteor.unsubscribe('customerData');
    };
  }, []);

  if (!subscriptionReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Client List</h1>
      <ClientTable />
    </div>
  );
};

export {App};
