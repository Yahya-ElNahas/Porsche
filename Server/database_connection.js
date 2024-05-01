const { MongoClient } = require("mongodb")

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://127.0.0.1:27017/PorscheDB')
        .then((client) => {
            database = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDbConn: () => database
}