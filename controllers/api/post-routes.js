const router = require('express').Router();
const {Blog, User} = require('./models');

router.get('/', async(req, res)=> {
    try {
        const blogData =await Blog.findAll({
            include: [
                {
                    model: Blog,
                    attributes: ['id', 'title', 'blogPost_content', 'user_id']
                }
            ]
        });
        const blogs = blogData.map((blog)=> blog.get({plain: true}));
        res.render('blogs', {blogs});
    } catch (error) {
        res.status(500).json(error);
    }
})