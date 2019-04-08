'use strict';

// Test specific configuration
// ===========================

module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://admin:password2@ds233581.mlab.com:33581/seeing-clerly-db'
  },
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: false
      }
    }
  }
};
//# sourceMappingURL=test.js.map
