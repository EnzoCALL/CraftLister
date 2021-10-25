import { Router } from "express";
import CraftPostModel from "../models/CraftPostModel.js";
import moment from "moment";
moment.locale('us'); 
const router = Router()

router.get('/', async (req, res) => {
    try {
        const data = await CraftPostModel.find() 
        const posts = data.map(post => {
            const data = {...post._doc}
            data.createdAt = moment(data.createdAt).calendar()
            data.id = post.id
            return data
        })
        res.render('index', { posts })
    } catch (e) {
      res.status(404);
      res.json({ error: e.message });
    }
})

router.get('/posts', async (req, res) => {
    try {
        const data = await CraftPostModel.find() 
        const posts = data.map(post => {
            const data = {...post._doc}
            data.createdAt = moment(data.createdAt).calendar()
            data.id = post.id
            return data
        })
        res.render('newPost', { posts })
    } catch (e) {
      res.status(404);
      res.json({ error: e.message });
    }
})

router.get('/signin', (req, res) => {
    res.render('signin')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/logout', (req,res)=>{
    if(req.session.valid == true){
        req.session.destroy();
        console.log("Session terminée.");
        res.redirect('/login');
    }
    else
    res.render('login');
})

export default router