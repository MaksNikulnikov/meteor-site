import React, { useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { CustomerData } from './CustomerData';

const ClientTable = () => {
  const { data, loading } = useTracker(() => {
    const handle = Meteor.subscribe('customerData');
    const loading = !handle.ready();
    const data = CustomerData.find().fetch();

    return {
      data,
      loading,
    };
  });

  useEffect(() => {
    const observeHandle = CustomerData.find().observeChanges({
      added: (id, fields) => {
        // Handle added record
      },
      changed: (id, fields) => {
        // Handle changed record
      },
      removed: (id) => {
        // Handle removed record
      },
    });

    return () => {
      observeHandle.stop();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Full Name</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td>{item.ID}</td>
            <td>{item['Full name']}</td>
            <td>{item.Position}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export {ClientTable};

