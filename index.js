import express from 'express'
import appRouter from './src/app.js';

const port = process.env.PORT
const app = express()


appRouter(app)

//Run the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}!.........`)
})