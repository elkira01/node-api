// import '../register-paths.js'

import express from 'express'
import * as router from './user-interface/routes'
import cors from 'cors'
import publicationCategoryRouter from './kernel/publication/user-interface/routes/category-routes'
import publicationRouter from './kernel/publication/user-interface/routes/publication-routes'
import authorRouter from './kernel/authors/user-interface/routes/author-routes'

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
