import mongoose from 'mongoose';
import { config } from '../src/config/index.js';

before(async function () {
    this.timeout(10000); // 10s para la conexión inicial
    const testMongoUri = config.mongoUriTest || config.mongoUri || 'mongodb://localhost:27017/shipnow_test';

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(testMongoUri);
    }
});

after(async function () {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
    }
});