import React, { useEffect, useRef, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { CustomerData } from './CustomerData';
import { Observer } from '../api/Observer';

const ClientTable = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const { data, loading } = useTracker(() => {
    const handle = Meteor.subscribe('customerData');
    const loading = !handle.ready();
    const data = CustomerData.find().fetch();

    return {
      data,
      loading,
    };
  });

  const tableRef = useRef(null);

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

  // const translatePosition = (positionElement, position) => {
  //   console.log('<<translatePosition>>', position);
  //   return new Promise((resolve) => {
  //     resolve('текст изменен');
  //   });
  // };

  // const handleMutation = (positionElement, position) => {
  //   translatePosition(positionElement, position)
  //     .then((translatedPosition) => {
  //       positionElement.textContent = translatedPosition;
  //     })
  //     .catch((error) => {
  //       console.error('Translation error:', error);
  //     });
  // };

  const translatePosition = (positionElement, token) => {
    Meteor.call('translatePosition', token, (error, translation) => {
      if (error) {
        console.error('Translation error:', error);
      } else {
        positionElement.textContent = translation;
      }
    });
  };

  const handleMutation = (positionElement, position) => {
    translatePosition(positionElement, position)
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading) {
    console.log('loading', tableRef);
  }

  return (
    <table className="table table-striped" ref={tableRef}>
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
            <td className="__t">{item.Position}</td>
          </tr>
        ))}
      </tbody>
      <Observer targetRef={tableRef} onMutation={handleMutation} />
    </table>
  );
};

export { ClientTable };
