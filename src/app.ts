// import '../register-paths.js'

import publicationRouter from '@app/publication/user-interface/routes/publication-routes'
import publicationCategoryRouter from '@app/publication/user-interface/routes/category-routes'
import authorRouter from '@app/authors/user-interface/routes/author-routes'

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

app.use('/api/publication-category', publicationCategoryRouter)
app.use('/api/publication', publicationRouter)
app.use('/api/author', authorRouter)
app.use('/api', router.assetRouter)

module.exports = app
