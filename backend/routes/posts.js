const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')

// Create Post
router.post('/', async (req, res) => {
  // requestからModelを生成
  const newPost = new Post(req.body)
  try {
    // Modelを保存
    const savedPost = await newPost.save()
    return res.status(200).json(savedPost)
  } catch (err) {
    return res.status(500).json(err)
  }
})

// Update Post
router.put('/:id', async (req, res) => {
  try {
    // （注意）これだと誰でも他の人の投稿が編集できてしまう。
    // const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body)
    const post = await Post.findById(req.params.id)
    if (post.userId !== req.body.userId) {
      return res.status(403).json('自分以外の投稿は編集できません')
    }

    await post.updateOne({
      // $set: MongoDBの演算子。フィールドの値を置き換える
      // https://www.mongodb.com/docs/manual/reference/operator/update/set/
      $set: req.body,
    })
    return res.status(200).json('投稿を編集しました')
  } catch (err) {
    return res.status(403).json(err)
  }
})

// Delete Post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId !== req.body.userId) {
      return res.status(403).json('自分以外の投稿は削除できません')
    }

    // この2つの違いは何？findByIdしていればdeleteOneする方が効率的？
    // await Post.findByIdAndDelete(req.params.id)
    await post.deleteOne()
    return res.status(200).json('投稿を削除しました')
  } catch (err) {
    return res.status(500).json(err)
  }
})

// Get Post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    return res.status(200).json(post)
  } catch (err) {
    return res.status(403).json(err)
  }
})

// Like Post
router.put('/:id/like', async (req, res) => {
  const post = await Post.findById(req.params.id)
  // 仕様によるけど、一般のSNSでは自分の投稿にもいいねはつけられるのでこれは削除
  // if (post.userId === req.body.userId) {
  //   return res.status(400).json('自分の投稿にいいねはつけられません')
  // }

  try {
    if (!post.likes.includes(req.body.userId)) {
      // いいねする
      await post.updateOne({
        $push: {
          likes: req.body.userId,
        },
      })
      return res.status(200).json('いいねしました')
    } else {
      // いいね解除する
      await post.updateOne({
        $pull: {
          likes: req.body.userId,
        },
      })
      return res.status(200).json('いいね解除しました')
    }
  } catch (err) {
    return res.status(500).json(err)
  }
})

// Get Timeline (Posts List of Follow Users)
// エンドポイント設計：
// /timelineとしてしまうと、Get Postの:idがtimelineとして認識されてしまう。
// これを避けるために、/timelineに/allをつけることで、
// 別のエンドポイントであることを宣言する
router.get('/timeline/:userId', async (req, res) => {
  try {
    // 自分の投稿内容を取得
    const user = await User.findById(req.params.userId)
    const userPosts = await Post.find({ userId: user._id })

    // フォロワーの投稿内容を取得
    const followersPosts = await Promise.all(
      user.followings.map(followId => Post.find({ userId: followId })),
    )

    // 自分とフォロワーの投稿を結合、投稿日の降順リストを生成して返す
    const response = [...userPosts, ...followersPosts.flat()].sort(
      (a, b) => b.createdAt - a.createdAt,
    )

    return res.status(200).json(response)
  } catch (err) {
    return res.status(500).json(err)
  }
})

// Get Timeline (Posts List of Profile)
router.get('/profile/:userId', async (req, res) => {
  try {
    // 自分の投稿内容を取得
    const user = await User.findById(req.params.userId)
    const posts = await Post.find({ userId: user._id })

    // 投稿日の降順リストを生成して返す
    const response = posts.sort((a, b) => b.createdAt - a.createdAt)

    return res.status(200).json(response)
  } catch (err) {
    return res.status(500).json(err)
  }
})
module.exports = router
