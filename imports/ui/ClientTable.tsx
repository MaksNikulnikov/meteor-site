import React, { useEffect, useRef } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { CustomerData } from './CustomerData';
import { Observer } from './Observer';
import { CustomerDataItem } from './types';

const ClientTable: React.FC = () => {
  const { data }: { data: CustomerDataItem[] } = useTracker(() => {
    try {
           const data: CustomerDataItem[] = CustomerData.find().fetch();

      return {
        data
      };
    } catch (error) {
      console.error('Error in useTracker:', error);
      return {
        data: [],
        
      };
    }
  });

  const tableRef = useRef<HTMLTableElement>(null);

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

  const translatePosition = (positionElement: HTMLElement, token: string) => {
    Meteor.call('translatePosition', token, (error: Error | undefined, translation: string | undefined) => {
      if (error) {
        console.error('Translation error:', error);
      } else {
        positionElement.textContent = translation || '';
      }
    });
  };
  

  const handleMutation = (positionElement: HTMLElement, position: string) => {
    translatePosition(positionElement, position);
  };

  return (
    <table className="table table-striped table-bordered mt-4" ref={tableRef}>
      <thead className="bg-primary text-white">
        <tr>
          <th>ID</th>
          <th>Full Name</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: CustomerDataItem, index: number) => (
          <tr
            key={item._id}
            className={index % 2 === 0 ? 'table-light' : ''}
          >
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
