const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');  
const shopRoutes = require('./routes/shop');
const { log } = require('console');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async(req, res, next) => {
  try {
    const user = await User.findById('648c7453ee04707b8ad435d0');
    req.user = new User(user.name, user.email, user.cart, user._id)
    next();
    
  } catch (error) {
    console.log("error in app.js", error);
  }
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect( () => {
  app.listen(1234);
});

