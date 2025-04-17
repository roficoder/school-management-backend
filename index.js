const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
// const bodyParser = require("body-parser")
const fs = require('fs');
const app = express()
const Routes = require("./routes/route.js")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger/swagger-output.json');
const customCss = fs.readFileSync((__dirname + "/config/swagger/swagger.css"), 'utf8');
const PORT = process.env.PORT || 5000

dotenv.config();

// app.use(bodyParser.json({ limit: '10mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(express.json({ limit: '10mb' }))
app.use(cors())

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }));
app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})