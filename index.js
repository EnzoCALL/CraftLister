import express from 'express'
const app = express()

import session from 'express-session'
import FileStore from 'session-file-store'
import Mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// Routes
import postRoutes from './routes/APIpostRoutes.js'
import publicRoutes from './routes/publicRoutes.js'
import connexionRoutes from'./routes/connexion.js'

//BDD
Mongoose.connect('mongodb://localhost:27017/CraftLister', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {

        app.use(session({
            valid: false,
            secret: 'secret',
            resave: false,
            saveUninitialized: false
        }))
        app.use(express.static('public'))
        app.use(express.json());
        app.set('view engine', 'ejs')
        app.use(express.urlencoded({ extended: true }))

        app.use('/', publicRoutes)
        app.use('/api/posts', postRoutes)
        app.use('/api/connexion', connexionRoutes)

        app.listen(3030, () => {
            console.log('Server listen at 3030');
        })

    })
