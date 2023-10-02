const secret = require('./secret');
// For accepting post form data
const bodyParser = require('express').json;
// API
const User = require('./api/user/router');
// Cors policy
const cors = require("cors");
// Getting local IP
const getLocalIp = require('./utils/getLocalIp');

const ip = getLocalIp();
const app = require('express')();

app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(bodyParser());
app.use('/user', User);


app.listen(secret.PORT, () => {
  console.log(`Server running on port ${secret.PORT}`);
  console.log(`IP = `)
  console.log(ip);
})