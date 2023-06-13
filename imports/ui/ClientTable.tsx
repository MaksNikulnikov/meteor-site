import React from 'react';

const ClientTable: React.FC = () => {
  const clients = [
    { id: 1, fullName: 'John Doe', position: 'Manager' },
    { id: 2, fullName: 'Jane Smith', position: 'Developer' },

  ];

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
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.id}</td>
            <td>{client.fullName}</td>
            <td>{client.position}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export {ClientTable};
