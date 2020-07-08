const express = require('express');
const path = require('path');
const http = require('http');
const { Datastore } = require('nedb-async-await');

const PORT = process.env.PORT || 3000;
const app = express();
const httpServer = http.Server(app);

// base64 helpers
// const btoa = (string) => Buffer.from(string).toString('base64');
// const atob = (encoded) => Buffer.from(encoded, 'base64').toString();

const db = {};

db.users = Datastore({
    filename: path.resolve(path.dirname(''), './database/users.db'),
    autoload: true,
});

db.posts = Datastore({
    filename: path.resolve(path.dirname(''), './database/posts.db'),
    autoload: true,
})


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



app.get('/api', (req, res) => {
    res.json({ status: 'Server workss' });
});

// user authentication
app.post('/api/login', async (req, res) => {
    const { token } = req.body;
    const user = await db.users.findOne({ token });
    if (user !== null) {
        res.json({ authorized: true });
    } else {
        res.status(401).json({ authorized: false });
    }
})

//create post
app.post('/api/posts', async (req, res) => {
    const { title, content } = req.body;
    const status = await db.posts.insert({ title, content });
    res.json(status);
})

//get list 
app.get('/api/posts', async (req, res) => {
    const posts = await db.posts.find({});
    res.json({ posts });
})
//delete 
app.delete('/api/posts/:id', async (req, res) => {
    const status = await db.posts.remove({ _id: req.params.id });
    res.json(status);
})

// serve static react app
app.use('/', express.static(path.resolve(path.dirname(''), './client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(path.dirname(''), './client/build/index.html'));
});

// uruchomienie serwera
httpServer.listen(PORT, () => console.log('listening on *:' + PORT));


