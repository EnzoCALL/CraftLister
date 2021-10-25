import express from "express";
import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt'


const router = express.Router()

router.post('/signin', async ({ body }, res) => {
    if ( body.username=="" || body.pwd =="" || body.confPwd=="" ) {
        res.redirect('/signin')
        return
    }
    if (body.pwd !== body.confPwd) {
        res.redirect('/signin')
        return
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(body.pwd, salt);
        const user = new UserModel({
            username: body.username,
            password: hashPassword
        })
        user.save()
        res.redirect('/')
    } catch (e)  {
        res.status(404);
        res.json({ error: e.message });
    }
}),

router.post('/login', async (req, res) => {
    if (req.session.valid || req.session.valid == true) { 
        res.send('You are already authenticated')
      } else {
    if (req.body.username=="" || req.body.pwd =="") {
        res.redirect('/login')
        return
    }
    try {
        const username = req.body.username;
        const user = await UserModel.findOne({"username": req.body.username })
        if (user == null) { 
            res.send('User does not exist');
          } else {
        const validpwd = await bcrypt.compare(req.body.pwd, user.password);
        if (!validpwd) {
            return res.status(200).json({error: "Password does not match username. Redirecting.."});
        }

        req.session.valid = true;
        req.session.username = username;
        console.log("Success - User logged in: " + req.session.username);

        res.redirect('/');
          }
    } catch (e)  {
        res.status(404);
        res.json({ error: e.message });
    }
}
}
)

export default router