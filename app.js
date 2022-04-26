const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/cities', require('./routes/city.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoURL'), {useUnifiedTopology: true, useNewUrlParser: true});
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();
