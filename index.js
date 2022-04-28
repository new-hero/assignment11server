const express = require ('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');

app.use(cors());
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('i am from server')
});

app.listen(port, ()=>{
    console.log('server is running port no', port )
})

