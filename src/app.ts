require('module-alias/register.js')

import express from 'express'
import * as router from './user-interface/routes'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/test', (req, res) => {
    res.send('Hello World!')
})

// app.use('/api', router.authRouter)
// app.use('/api', router.userRouter)
app.use('/api/publication-category', router.categoryRouter)
app.use('/api', router.assetRouter)

module.exports = app
