const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "Priya@123",
        database: "Blog_App",
    },
});


create_id = (req, res) => {
    const user = req.body;
    bcrypt.hash(user.password, 10)
    .then((hash) => {
        knex("registration").insert({
            username: user.username,
            password: hash,
        })
            .then((result) => {
                res.send({ sucess: result })
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                    res.status(400).send({ error: err })
                }
            })
    })
}



login_id = (req, res) => {
    const user = req.body;
    knex.from("registration").select("*").where("username", user.username)
        .then((data) => {
            if (data.length > 0) {
                for (j of data)
                    userPassword = j['password']
                const verified = bcrypt.compare(user.password, userPassword.toString());
                if (verified) {
                    jwt.sign({ username:user.username }, "secret", (err, token) => {
                        if (token) {
                            res.json({ message: "LOGGED IN", token: token })
                        }
                    })
                }
                else {
                    res.send("password is failed")
                }
            } else {
                res.status(403).send("user doen't exists")
            }

        })
}



verifyAcessToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        var decoded = jwt.decode(bearerToken);
        req.data=decoded
        next();
    } else {
        res.status(403).send("user is not authenticated")
    }
}



create_Posts = (req, res) => {
    newdata = req.body
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (authData) {
            knex("POST").insert({
                username : req.data.username,
                title : newdata.title,
                text : newdata.text
            })
                .then((result) => {
                    console.log(result);
                    res.send({ sucess: "your posts is succesfuly." })
                })
                .catch((err) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send({ error: err })
                    }
                })

        }else{
            console.log(err);
        }
    })

}



get_All_Posts = (req, res) => {
    knex.from('POST').select("*")
        .then((table) => {
            res.send(table)

        })
}


likes_dislikes = (req, res) => {
    knex.from('POST').select('title').where('id', req.body.id).then((info) => {
        if (info.length == 0) {
            res.status(403).send("post is not found")
        } else {
            jwt.verify(req.token, 'secret', (err, authData) => {
                if (authData) {
                knex("options").select("*").where({id:req.body.id,username:req.data.username})
                .then((result)=>{
                    console.log(result);
                    if (result.length > 0) { 
                        res.send('u have already liked/dislike post') }
                    else {
                        knex('options').insert({ id: req.body.id, username:req.data.username, likes: req.body.likes, dislikes: req.body.dislikes })
                            .then((result) => {
                                res.send({ sucess: "added" })
                            })
                            .catch((err) => {
                                if (err) throw err;
                                res.status(403).send({ error: err });
                            })
                    }
                        })
                    }else{
                        res.status(403).send("user is not authenticated")
                    }
                })
                }
            })
        }


get_All_Likes_Dislike = (req, res) => {
    knex('POST').innerJoin('options', 'POST.id', '=', 'options.id').select('POST.title', 'options.likes', 'options.dislikes', 'options.username')
        .then((rows) => {
            res.send(rows)
        }).catch((err) => {
            if (err){
                res.status(403).send(`post with the ${req.params.id} id is not exists`)}
            })
        }
    



module.exports = {create_id,login_id ,verifyAcessToken ,create_Posts,get_All_Posts,likes_dislikes,get_All_Likes_Dislike}


