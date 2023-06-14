import { Meteor } from 'meteor/meteor';
import { LiveMysql } from 'meteor/vlasky:mysql';

Meteor.startup(() => {
  const liveConnection = new LiveMysql({
    host: '185.143.172.214',
    user: 'meteor_test',
    password: 'Vnh6s3p1e5EKUoRS3oja',
    database: 'meteor_test',
    serverId: 1,
  });

  Meteor.publish('customerData', function () {
    const self = this;

    const handle = liveConnection.select(
      `
        SELECT customers.id AS ID,
               CONCAT(customers.fname, ' ', customers.lname) AS 'Full name',
               positions.name AS Position
        FROM customers
        INNER JOIN positions ON customers.position_id = positions.id
      `,
      null,
      LiveMysqlKeySelector.Index(),
      [
        {
          table: 'customers',
          condition: function (row, newRow) {
            return true; // Всегда обновлять результаты
          }
        },
        {
          table: 'positions',
          condition: function (row, newRow) {
            return true; // Всегда обновлять результаты
          }
        }
      ]
    );

    handle.on('update', function (diff, data) {
      
      Object.keys(diff.added).forEach(function (id) {
        self.added('customerData', id, diff.added[id]);
      });
    
      Object.keys(diff.changed).forEach(function (id) {
        self.changed('customerData', id, diff.changed[id]);
      });
    
      Object.keys(diff.removed).forEach(function (id) {
        self.removed('customerData', id);
      });
    
      self.ready();
    });

    self.onStop(function () {
      handle.stop();
    });

    self.ready();
  });
});
