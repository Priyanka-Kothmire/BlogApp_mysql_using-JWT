const express = require('express')
const router = express.Router()
const blog_app = require('../controller/controller.js')



router.post("/register",blog_app.create_id)

router.post("/login",blog_app.login_id)

router.post("/post",blog_app.verifyAcessToken,blog_app.create_Posts)

router.get("/get",blog_app.get_All_Posts)

router.post('/likes',blog_app.verifyAcessToken,blog_app.likes_dislikes)

router.get('/getall',blog_app.get_All_Likes_Dislike)


module.exports = router