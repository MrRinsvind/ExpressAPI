const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
      title: 'Rinsvind app',
      message: 'Hello world by Rinsvind!'
  })
})

module.exports = router;