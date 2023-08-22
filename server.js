const express = require('express')
const app = express()
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')
const PORT = 3000
const mongoose = require('mongoose')
require('dotenv').config()

// DB接続
mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log('DBと接続中'))
  .catch(err => console.err(err))

// ミドルウェア
app.use(express.json()) // JSON利用宣言
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(PORT, () => console.log('start server'))
