const express = require('express');
const cors = require('cors')
const {User} = require('../api/v1/models/index')
const bcrypt = require('bcrypt');
var { expressjwt: jwt }  = require('express-jwt');
var jwks = require('jwks-rsa');
var request = require("request");


const path = require('path');
const basicAuth = require('express-basic-auth');

const app = express();
const PORT = 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cors());
//app.use(express.json());

// app.use('/api', require('./server/api'));

// app.get('/', (req, res) => {
//     res.send('Amazing app to find jobs');
// });
//configure JWT
  const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-olejrl35.us.auth0.com/.well-known/jwks.json'
}),
audience: 'localhost:3005',
issuer: 'https://dev-olejrl35.us.auth0.com/',
algorithms: ['RS256']
});

module.exports = jwtCheck;





const userRoutes = require('../api/v1/routes/user')
const jobRoutes = require('../api/v1/routes/job')
const jobSkillRoutes = require('../api/v1/routes/jobSkill')
const skillRoutes = require('../api/v1/routes/skill');
const { Module } = require('module');

app.use(userRoutes)
app.use(jobRoutes)
app.use(jobSkillRoutes)
app.use(skillRoutes)


/* Error handling redirects

const errorController = require('../api/v1/controllers/errorsController')

app.get('/500', errorController.get500Page)

app.use(errorController.get404Page)


*/
//configure basicAuth
app.use(basicAuth({
  authorizer: dbAuthorizer,
  authorizeAsync: true,
  unauthorizedResponse: () => "you do not have access to this endpoint"
}))

// compare username and password with db users
// return a boolean indicating a username and a pasword match
async function dbAuthorizer(email, password,callback){
  try{
    //get matching user from db
    const user = await User.findOne({where:{email: email}})
    //if username is valid, match password
    let isValid =  (user != null) ? await bcrypt.compare(password, user.password) : false;
    console.log("username and password math?", true)
    callback(null, isValid)
  }
  catch(err){
    // if authorize fails, log error
    console.log("erroe: ", err)
    callback(null, false)
  }
}

app.get('/getToken', async(req, res) => {
  var options = { method: 'POST',
  url: 'https://dev-olejrl35.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"I0pEkZ1z9ikGJ6n3KBedl3fbXn1cpaDw","client_secret":"4CBkloi-YeiMnpj2xdHFnnZyustrpePNx9CVGoAf85jFt8WlkG5SAoTT8ultmt0X","audience":"localhost:3005","grant_type":"client_credentials"}'};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  
  const toJson = JSON.parse(body)
  const token = toJson.access_token
  res.json(token)
  console.log(token);
  
})
})


app.listen(PORT, function() {
    console.log(`Listening to port: ${PORT}`);
});
