const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
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
    const user = await User.findById('648dea08d929d2fdd961dd05');
    req.user = user;
    next();
    
  } catch (error) {
    console.log("error in app.js", error);
  }
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://piyushv:fr5Cp8tHaAJ06R4N@cluster0.l7fuzif.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
  User.findOne().then(user => {
    if(!user){
      const user = new User({
        name: 'Gullu',
        email:'gullu@abc.com',
        items: []
      });
      user.save();
    }
  })
  app.listen(1234);
})
.catch(err => {
  console.log(err);
})

