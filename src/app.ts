require('module-alias/register.js')

import express from 'express'
import * as router from './routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/test', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', router.authRouter)

module.exports = app
