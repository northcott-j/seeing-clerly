'use strict';

// Production specific configuration
// =================================

module.exports = {
        mongo: {
                uri: 'mongodb://admin:password2@ds233581.mlab.com:33581/seeing-clerly-db'
        },

        // Server IP
        ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined,

        // Server port
        port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000
};
//# sourceMappingURL=production.js.map
