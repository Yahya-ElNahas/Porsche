require("dotenv").config()
const express = require("express")
const cookieParser = require('cookie-parser')
const {connectToDb, getDbConn} = require('./database_connection')
const {ObjectId} = require("mongodb")
const jwt = require("jsonwebtoken")
const express_jwt = require("express-jwt")
const cors = require("cors")
const bcrypt = require('bcrypt')

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000

function generateToken(payload) {
    return jwt.sign({payload},process.env.SECRET_KEY, {expiresIn: '1h'})
}

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET_KEY)
}

function authenticateJWT(req, res, next) {
    const token = req.headers.token
    if(!token) {
        return res.status(401).json({error: "Unauthorized access"})
    }
    try {
        const decodedToken = verifyToken(token)
        req.user = decodedToken
        next()
    }
    catch(err) {
        return res.status(401).json({error: "Invalid Token"})
    }
}

// Database Connection
let database
connectToDb((err) => {
    if(!err) {
        app.listen(port, () => {
            console.log("server is running on: " + port)
        })
        database = getDbConn()
    }
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Admins:

// Get all admins
app.get('/v1/api/Admins',authenticateJWT,async (req ,  res) => {
    try {
      const admins = await database.collection("Admins").find({}).sort().toArray();
      res.json({"Admins": admins});
    } catch (err) {
      console.error('Failed to retrieve admins:', err);
      res.status(200).json({ error: 'Failed to retrieve admins' });
    }
  });

// Get admin by username
app.get("/v1/api/Admins/:id", authenticateJWT ,  async (req, res) => {
    let user = req.params.id
    user = fix_input(user)
    await database.collection('Admins')
    .findOne({username: user})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Admin Login
app.post("/v1/api/Admins/Login", async (req, res) => {
    await database.collection('Admins')
    .findOne({username: req.body.username})
    .then(async doc => {
        const auth = await bcrypt.compare(req.body.password, doc.password)
        if(auth) {
            res.json({token: generateToken(doc.insertedId) })
        }
        else {
            res.status(500).json({Failure: "Incorrect Password"})
        }
    })
    .catch(err => {
        res.status(500).json({Failure: "Incorrect username"})
    })
})

// Add new admin
app.post("/v1/api/Admins", async (req, res) => {
    const admin = req.body
    admin.password = await bcrypt.hash(admin.password, await bcrypt.genSalt())
    database.collection("Admins")
    .insertOne(admin)
    .then(doc => {
        res.json({token: generateToken(doc.insertedId) })
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Update specific admin data by username
app.patch("/v1/api/Admins/:id", authenticateJWT, async(req, res) => {
    const body = req.body
    let user = req.params.id
    if(body.password) body.password = await bcrypt.hash(body.password, await bcrypt.genSalt())
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
app.put("/v1/api/Admins/:id", authenticateJWT, (req, res) => {
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
app.delete("/v1/api/Admins/:id", authenticateJWT, (req, res) => {
    let user = req.id
    user = fix_input(user)
    database.collection("Admins")
    .deleteOne({username:user})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err:"Error"})
    })
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Customers:

// Get all Customers
app.get("/v1/api/Customers", authenticateJWT,async (req, res) => {
    try {
        const Customers = await database.collection("Customers").find({}).sort().toArray();
        res.json({ "Customers": Customers});
      } catch (err) {
        console.error('Failed to retrieve Customers:', err);
        res.status(200).json({ error: 'Failed to retrieve Customers'});
      }
})

// Get customer by username
app.get("/v1/api/Customers/:id", authenticateJWT,async (req, res) => {
    let user = req.params.id
    user = fix_input(user)
    await database.collection('Customers')
    .findOne({username: user})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Customer Login
app.post("/v1/api/Customers/Login", async (req, res) => {
    await database.collection('Customers')
    .findOne({username: req.body.username})
    .then(async doc => {
        const auth = await bcrypt.compare(req.body.password, doc.password)
        if(auth) {
            res.json({token: generateToken(doc.insertedId) })
        }
        else {
            res.status(500).json({Failure: "Incorrect Password"})
        }
    })
    .catch(err => {
        res.status(500).json({Failure: "Incorrect username"})
    })
})

// Add new Customer
app.post("/v1/api/Customers", async (req, res) => {
    const body = req.body
    let token
    try {
        body.password = await bcrypt.hash(body.password + '', await bcrypt.genSalt())
    } catch(err) {
        res.status(500).json({err: 'Could not hash'})
        return
    }
    database.collection("Customers")
    .insertOne(body)
    .then(doc => {
        res.json({token: generateToken(doc.insertedId) })
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Update specific Customer data by username
app.patch("/v1/api/Customers/:id", authenticateJWT, async(req, res) => {
    const body = req.body
    let user = req.params.id
    user = fix_input(user)
    if(body.password) body.password = await bcrypt.hash(body.password + '', await bcrypt.genSalt())
    database.collection("Customers")
    .updateOne({username: user}, {$set: body})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Update all Customer data by username
app.put("/v1/api/Customers/:id", authenticateJWT, (req, res) => {
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

// Delete Customer by username
app.delete("/v1/api/Customers", authenticateJWT, (req, res) => {
    let user = req.body.username
    user = user.toLowerCase()
    database.collection("Customers")
    .deleteOne({username: user})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Add mobile number for customer by username
app.patch('/v1/api/Customers/:id', authenticateJWT, async (req, res) => {
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Products:

// Get all products
app.get("/v1/api/Products", async(req, res) => {
    try {
        const  Products = await database.collection("Products").find({}).sort().toArray();
        res.json({ "Products": Products});
      } catch (err) {
        console.error('Failed to retrieve Products:', err);
        res.status(200).json({ error: 'Failed to retrieve Products'});
      }
})

// Get product by product name
app.get("/v1/api/Products/:id", async(req, res) => {
    let productName = req.params.id
    productName = fix_input(productName)
    await database.collection('Admins')
    .findOne({username: productName})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Add new Product
app.post("/v1/api/Products", authenticateJWT, (req, res) => {
    const product = req.body
    product.name = product.name.toLowerCase()
    database.collection("Products")
    .insertOne(product)
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Update specific Product data by name
app.patch("/v1/api/Products/:id", authenticateJWT, (req, res) => {
    const body = req.body
    if(body.name) {
        body.name = body.name.toLowerCase()
    }
    let id = req.params.id
    id = fix_input(id)
    id = id.toLowerCase()
    console.log(id)
    database.collection("Products")
    .updateOne({name: id}, {$set: body})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Update all Product data by id
app.put("/v1/api/Products/:id", authenticateJWT, (req, res) => {
    const body = req.body
    let id = req.params.id
    id = fix_input(id)
    if(!ObjectId.isValid(id)) {
        res.status(500).json({err: "Invalid Product ID"})
        return
    }
    database.collection("Products")
    .updateOne({_id: ObjectId(id)}, {$set: body}, {upsert: true})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({err: "Error"})
    })
})

// Delete Product by name
app.delete("/v1/api/Products", authenticateJWT,(req, res) => {
    let product = req.body.name
    product = product.toLowerCase()
    database.collection("Products")
    .deleteOne({name: product})
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

