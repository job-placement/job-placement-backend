const express = require('express');
const path = require('path');

const app = express();
const PORT = 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', require('./api/v1/controllers'));

app.get('/', (req, res) => {
    res.send('Amazing app to find jobs');
});

app.listen(PORT, function() {
    console.log(`Listening to port: ${PORT}`);
});
