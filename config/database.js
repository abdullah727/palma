module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        uri:
          "mongodb://admin:admin@cluster0-shard-00-00-lpowp.mongodb.net:27017,cluster0-shard-00-01-lpowp.mongodb.net:27017,cluster0-shard-00-02-lpowp.mongodb.net:27017/<dbname>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
      },
      options: {
        ssl: true,
      },
    },
  },
});
