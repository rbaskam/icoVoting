// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
      from: '0xcab50f85b92a6519335513873583ca33bb5b60a9',
      gas: 3500000
    }
  }
}
