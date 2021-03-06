const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// port for heroku or local
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view enginer', 'hbs');

// middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log. ');
    }
  });

  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  // return 'test';
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  // return 'test';
  return text.toUpperCase();
});


// http.get request
// route, request, response
// res send html or json
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    welcomeMsg: 'Welcome!!',
    pageTitle: 'Home Page'
  });
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errmsg: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});


// expressjs.com
// handlebarsjs.com
// hbs
