const { response } = require('express');
const express = require('express');
const cors = require('cors')

const path = require('path');

const app = express();
const PORT = 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.use('/api', require('./server/api'));

// app.get('/', (req, res) => {
//     res.send('Amazing app to find jobs');
// });


const userRoutes = require('../api/v1/routes/user')
const jobRoutes = require('../api/v1/routes/job')

app.use(userRoutes)
app.use(jobRoutes)


/* Error handling redirects

const errorController = require('../api/v1/controllers/errorsController')

app.get('/500', errorController.get500Page)

app.use(errorController.get404Page)


*/


app.listen(PORT, function() {
    console.log(`Listening to port: ${PORT}`);
});
