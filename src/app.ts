import "reflect-metadata";
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/user', userRouter)
// app.use('/task', taskRouter)

module.exports = app
