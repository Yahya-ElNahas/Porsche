require("dotenv").config()
const express = require("express")
const {connectToDb, getDbConn} = require('./database_connection')
const {ObjectId} = require("mongodb")

const app = express()

const port = 5000 || process.env.PORT

app.use(express.json())

// Database Connection
let database
connectToDb((err) => {
    if(!err) {
        app.listen(port, () => {
            console.log("server is running: " + port)
        })
        database = getDbConn()
    }
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Admins:

// Get all admins
app.get("/v1/api/Admins", (req, res) => {
    let admins = []
    database.collection('Admins')
    .find()
    .sort()
    .forEach(element => admins.push(element))
    .then(() => {
        res.status(200).json(admins)
    })
    .catch((err) => {
        res.status(500).json({err: 'Could not fetch data'})
    })
})

// Get admin by username
app.get("/v1/api/Admins/:id", (req, res) => {
    let user = req.params.id
    user = fix_input(user)
    database.collection('Admins')
    .findOne({username: user})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Add new admin
app.post("/v1/api/Admins", (req, res) => {
    const admin = req.body
    database.collection("Admins")
    .insertOne(admin)
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Update specific admin data by username
app.patch("/v1/api/Admins/:id", (req, res) => {
    const body = req.body
    let user = req.params.id
    user = fix_input(user)
    database.collection("Admins")
    .updateOne({username: user}, {$set: body})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Update all admin data by username
app.put("/v1/api/Admins/:id", (req, res) => {
    const body = req.body
    let user = req.params.id
    user = fix_input(user)
    database.collection("Admins")
    .updateOne({username: user}, {$set: body}, {upsert: true})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Delete admin by username
app.delete("/v1/api/Admins/:id", (req, res) => {
    let user = req.id
    user = fix_input(user)
    database.collection("Admins")
    .deleteOne({username: user})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Customers:

// Get all Customers
app.get("/v1/api/Customers", (req, res) => {
    let user = req.params.id
    user = fix_input(user)
    database.collection('Customers')
    .findOne({username: user})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Get customer by username
app.get("/v1/api/Customers/:id", (req, res) => {
    let user = req.params.id
    user = fix_input(user)
    database.collection('Customers')
    .findOne({username: user})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Add new admin
app.post("/v1/api/Customers", (req, res) => {
    const admin = req.body
    database.collection("Customers")
    .insertOne(admin)
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Update specific admin data by username
app.patch("/v1/api/Customers/:id", (req, res) => {
    const body = req.body
    let user = req.params.id
    user = fix_input(user)
    database.collection("Customers")
    .updateOne({username: user}, {$set: body})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Update all admin data by username
app.put("/v1/api/Customers/:id", (req, res) => {
    const body = req.body
    let user = req.params.id
    user = fix_input(user)
    database.collection("Customers")
    .updateOne({username: user}, {$set: body}, {upsert: true})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Delete admin by username
app.delete("/v1/api/Customers/:id", (req, res) => {
    let user = req.id
    user = fix_input(user)
    database.collection("Customers")
    .deleteOne({username: user})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Products:

// Get all products
app.get("/v1/api/Products", (req, res) => {
    let products = []
    database.collection('Products')
    .find()
    .sort()
    .forEach(element => products.push(element))
    .then(() => {
        res.status(200).json(products)
    })
    .catch(err => {
        res.status(500).json({error: 'could not fetch data'})
    })
})

// Get product by product name
app.get("/v1/api/Products/:id", (req, res) => {
    let productName = req.params.id
    productName = fix_input(user)
    database.collection('Admins')
    .findOne({username: productName})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Add new admin
app.post("/v1/api/Products", (req, res) => {
    const admin = req.body
    database.collection("Products")
    .insertOne(admin)
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Update specific admin data by username
app.patch("/v1/api/Products/:id", (req, res) => {
    const body = req.body
    let user = req.params.id
    user = fix_input(user)
    database.collection("Products")
    .updateOne({username: user}, {$set: body})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Update all admin data by username
app.put("/v1/api/Products/:id", (req, res) => {
    const body = req.body
    let user = req.params.id
    user = fix_input(user)
    database.collection("Products")
    .updateOne({username: user}, {$set: body}, {upsert: true})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Delete admin by username
app.delete("/v1/api/Products/:id", (req, res) => {
    let user = req.id
    user = fix_input(user)
    database.collection("Products")
    .deleteOne({username: user})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Fix req.params.id as it's received started by ':'
function fix_input(id) {
    res = ""
    for(let i = 1;i < id.length;i++) {
        res += id[i]
    }
    return res
}