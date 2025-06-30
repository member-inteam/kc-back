const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
    console.log(err);

    console.log('uncaught Exception, shuting down');
    process.exit(1)
})

dotenv.config({ path: './.env' });
const app = require('./app');
const { default: mongoose } = require('mongoose');

const DB = "mongodb://amjadtadmory:<db_password>@ac-eu1ptum-shard-00-00.u9cao07.mongodb.net:27017,ac-eu1ptum-shard-00-01.u9cao07.mongodb.net:27017,ac-eu1ptum-shard-00-02.u9cao07.mongodb.net:27017/?ssl=true&replicaSet=atlas-10srv4-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
    .replace('<db_password>', 'YImFBhDjluvbjI8E')
mongoose.connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,

    // useFindAndModify: false,
    // useUnifiedTopology: true
}).then(() => console.log('DB connection successful!'))


const port = 8080
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...${process.env.NODE_ENV}`);
})

process.on('unhandledRejection', (err) => {
    console.log('unhandled Rejection, shuting down', err);
    server.close(() => {
        process.exit(1)
    })
})

process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});
