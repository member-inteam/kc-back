const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
console.log(err);
console.log('uncaught Exception, shutting down');
process.exit(1);
});

dotenv.config({ path: './.env' });
const app = require('./app');
const { default: mongoose } = require('mongoose');

// MongoDB connection string
const DB = "mongodb+srv://staeer:<db_password>@cluster0.bazlcus.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
.replace('<db_password>', 'CVyTFczH1nNOnyZ9');

mongoose.connect(DB, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(async () => {
console.log('DB connection successful!');

// Delete orders within a date range
try {
    const startDate = new Date("2025-10-13T11:21:19.767Z");
    const endDate = new Date("2025-10-30T23:59:59.999Z");

    const result = await mongoose.connection.collection('orders').deleteMany({
        created_at: { $gte: startDate, $lte: endDate }
    });

    console.log(`Deleted ${result.deletedCount} documents from orders collection`);
} catch (err) {
    console.error('Error deleting documents:', err);
}

})
.catch(err => {
console.error('DB connection error:', err);
process.exit(1);
});

const port = 8080;
const server = app.listen(port, () => {
console.log(App running on port ${port}...${process.env.NODE_ENV});
});

process.on('unhandledRejection', (err) => {
console.log('Unhandled Rejection, shutting down', err);
server.close(() => {
process.exit(1);
});
});

process.on('SIGTERM', () => {
console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
server.close(() => {
console.log('💥 Process terminated!');
});
});
