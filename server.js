
const express = require('express');
const path = require('path');
const http = require('http');
const { Datastore } = require('nedb-async-await');


const PORT = process.env.PORT || 3000;
const app = express();
const httpServer = http.Server(app);

const db = {};

db.users = Datastore({
    filename: path.resolve(path.dirname(''), './database/users.db'),
    autoload: true,
});

app.get('/api', (req, res) => {
    res.json({ status: 'Server workss' });
});

// serve static react app
app.use('/', express.static(path.resolve(path.dirname(''), './client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(path.dirname(''), './client/build/index.html'));
});

// uruchomienie serwera
httpServer.listen(PORT, () => console.log('listening on *:' + PORT));


