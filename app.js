const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

//Create server
const server = restify.createServer();

//Middleware
server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(config.MONGODB_URI, 
        { useNewUrlParser : true});
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
    require('./routes/guests')(server);
    console.log(`Server start on port ${config.PORT}`);
});

