
module.exports = {
  production: {
    prettyName: 'moneroscan',
    deployPath: '',
    debug: false,
    express: {
      port: process.env.PORT || 3000,
      host: process.env.WEBSITE_HOSTNAME || `localhost:${process.env.PORT || 3000}`,
      siteRoot: '/'
    },
    sequelize: {
      host: '',
      database: '',
      username: '',
      password: '',
      schema: '',
      logging: false,
      forceSync: false
    }
  },
  development: {
    prettyName: 'moneroscan',
    nodeHost: 'node.xmrbackb.one',
    nodePort: 18081,
    jsonRpcPath: '/json_rpc',
    deployPath: '',
    debug: true,
    express: {
      port: process.env.PORT || 3000,
      host: process.env.WEBSITE_HOSTNAME || `localhost:${process.env.PORT || 3000}`,
      siteRoot: '/'
    },
    sequelize: {
      host: '',
      database: '',
      username: '',
      password: '',
      schema: '',
      logging: true,
      forceSync: true
    }
  }
};
