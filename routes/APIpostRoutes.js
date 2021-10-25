import { Router } from 'express'
import CraftPostModel from '../models/CraftPostModel.js'


const router = Router()


router.get("/", async (req, res) => {
    try {
        const posts = await CraftPostModel.find()
        res.json(posts)
    } catch (e) {
      res.status(404);
      res.json({ error: e.message });
    }
  });

router.post('/', async (req, res) => {
    if (req.session.valid == true){
        try {
            const post = new CraftPostModel({
                title: req.body.title,
                content1: req.body.content1,
                content2: req.body.content2,
                content3: req.body.content3,
                content4: req.body.content4,
                content5: req.body.content5,
                author: req.session.username
            })
            await post.save()
            res.redirect('/')
        } catch (e) {
            res.status(400);
            res.json({ error: e.message });
        }
    }
    else res.redirect('/login')
    }
)

export default router