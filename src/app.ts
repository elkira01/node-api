import express from 'express'
import { authRouter } from './routes'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(authRouter)

module.exports = app
