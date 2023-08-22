const router = require('express').Router()
const User = require('../models/User')

// CRUD
// Update User
router.put('/:id', async (req, res) => {
  // :id = MongoDBの_idに相当するもの
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        // 全てのパラメータをreq　bodyで書き換える
        $set: req.body,
      })
      return res.status(200).json('ユーザー情報が更新されました')
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json('ユーザー情報を更新できません')
  }
})
// Delete User
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      return res.status(200).json('ユーザーを削除しました')
    } catch (err) {
      return res.status(500).json('退会に失敗しました')
    }
  } else {
    return res.status(403).json('ユーザーを削除できません')
  }
})
// Read User
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json('ユーザーが見つかりませんでした')

    // ログ出しただけではわからないが、_docをつけないと正しくデータを作れない
    const { password, updatedAt, ...response } = user._doc
    return res.status(200).json(response)
  } catch (err) {
    return res.status(500).json(err)
  }
})

// Follow user
router.put('/:id/follow', async (req, res) => {
  if (req.params.id === req.body.userId) {
    // 自分ではないかをチェック
    return res.status(500).json('自分自身をフォローできません')
  }

  try {
    const user = await User.findById(req.params.id)
    const currentUser = await User.findById(req.body.userId)
    if (!user.followers.includes(req.body.userId)) {
      // フォローしていない場合
      await user.updateOne({
        // $push: MongoDBの演算子。配列に値を追加する
        // https://www.mongodb.com/docs/manual/reference/operator/update/push/
        $push: {
          followers: req.body.userId,
        },
      })
      await currentUser.updateOne({
        $push: {
          followings: req.params.id,
        },
      })
      return res.status(200).json('フォローしました')
    } else {
      // すでにフォロー中の場合
      return res.status(403).json('すでにフォロー済みです')
    }
  } catch (err) {
    return res.status(500).json(err)
  }
})


// Un Follow user
router.put('/:id/unfollow', async (req, res) => {
  if (req.params.id === req.body.userId) {
    // 自分ではないかをチェック
    return res.status(500).json('自分自身をフォロー解除できません')
  }

  try {
    const user = await User.findById(req.params.id)
    const currentUser = await User.findById(req.body.userId)
    if (user.followers.includes(req.body.userId)) {
      // フォロー中の場合
      await user.updateOne({
        // $push: MongoDBの演算子。配列から特定の値を削除する
        // https://www.mongodb.com/docs/manual/reference/operator/update/pull/
        $pull: {
          followers: req.body.userId,
        },
      })
      await currentUser.updateOne({
        $pull: {
          followings: req.params.id,
        },
      })
      return res.status(200).json('フォロー解除しました')
    } else {
      // フォローしていない場合
      return res.status(403).json('フォロー解除できません')
    }
  } catch (err) {
    return res.status(500).json(err)
  }
})

module.exports = router
