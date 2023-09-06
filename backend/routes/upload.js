const router = require('express').Router()
// multipart/form-dataでのアップロード用のミドルウェア
// https://www.npmjs.com/package/multer
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name || file.originalname)
  },
})
const upload = multer({ storage })

// Upload Image
// upload.single('file') -> formーdataのKey名がfileになる
router.post('/', upload.single('file'), async (req, res) => {
  try {
    return res.status(200).json(req.file.filename)
  } catch (err) {
    return res.status(500).json(err)
  }
})

module.exports = router
