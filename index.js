const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://sk:25LlUTls7BsTX8EO@cluster0.syyk3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const deviceCollection = client.db('smartphone').collection('devices');
        app.post('/inventory', async (req, res) => {
            const newdevice = req.body;
            const devices = await deviceCollection.insertOne(newdevice)
            res.send(devices)
        })

        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = deviceCollection.find(query);
            const devices = await cursor.toArray();
            res.send(devices)
        })
        app.get('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await deviceCollection.findOne(query);
            res.send(result)
        })

        app.put('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const updateQuantity = req.body;
            const query = { _id: ObjectId(id) }
            const wish = { upsert: true }
            const updateObjecte = {
                $set: {
                    quantity: updateQuantity.quantity
                }
            }

            const result = await deviceCollection.updateOne(query, updateObjecte, wish)
            res.send(result)
        })


        app.delete('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await deviceCollection.deleteOne(query);
            res.send(result)
        })

        app.get('/update/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await deviceCollection.findOne(query);
            res.send(result)
        })
        
    }
    finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Look i am here')
})
app.listen(port, () => {
    console.log('Crud server is running');
})