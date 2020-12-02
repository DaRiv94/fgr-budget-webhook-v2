require('dotenv').config()
const express = require('express')

const app = express()
const bodyParser = require('body-parser');
const cors = require("cors");
const webhookRoutes = require('./routes/webhook');



// parse application/json
app.use(bodyParser.json())

// if(process.env.ENV=="Development"){
//     app.use(cors())
//     console.log("Running app in development");
// }else{
//     var whitelist = ['https://fgrbudgetapp.surge.sh']
//     var corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//         } else {
//         callback(new Error('Not allowed by CORS'))
//         }
//     }
//     }
//     app.use(cors(corsOptions))
//     console.log("Running app in production");
// }
app.use(cors())
app.use(express.json());

//Routes
app.use('/webhook',webhookRoutes);


app.get('/', (req, res) => {
    return res.send("Hello World")
})

const port = process.env.PORT || 3500

app.listen(port, (err) => {
    if(err){
        console.log("Error", err)
    }else{
        console.log(`Example app listening on port ${port}!`)
    }
})