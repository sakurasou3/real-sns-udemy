const express = require('express')
const app = express()
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')
const PORT = 7070
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

// DB接続
mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log('DBと接続中'))
  .catch(err => console.err(err))

// ミドルウェア
app.use(express.json()) // JSON利用宣言
// cors対応。
// フロントからのアクセスのみcors対応を許可する。
// 各routesの前にこれを書かないとうまく動かないので注意。
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
  }),
)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

app.listen(PORT, () => console.log('start server'))
