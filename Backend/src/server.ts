import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { createNewUser } from './handlers/user'


const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World')
})


app.post('/user',createNewUser)

export default app
