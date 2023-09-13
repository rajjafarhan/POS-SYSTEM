import * as dotenv from 'dotenv'
dotenv.config() // load .env file 
console.log(process.env.DATABASE_URL)
// import config from './config'
import app from './server'



app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})

