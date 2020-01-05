const assert = require('assert');
const {
    Network,
    User
} = require('../index');

let network;

describe('Network', () => {
  describe('create network', () => {
    it('should equals', () => {
      let schema = {
        sport: 'number',
        design: 'number'
      };

      network = new Network(schema);

      assert.equal(network.schema, schema);
    });
  });

  describe('users', () => {
    it('should equals', () => {
      let user = new User({
        sport: 1,
        design: 5
      });

      network.add(user, 'alice');

      assert.equal(network.users.alice, user);
    });
  });
});