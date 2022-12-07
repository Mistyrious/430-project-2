const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/home', mid.requiresLogin, controllers.Note.homepage);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/changePass', mid.requiresSecure, mid.requiresLogin, controllers.Account.changePass);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/getNotes', mid.requiresLogin, controllers.Note.getNotes);
  app.post('/makeNote', mid.requiresLogin, controllers.Note.makeNote);
  app.post('/deleteNote', mid.requiresLogin, controllers.Note.deleteNote);
  app.post('/updateNote', mid.requiresLogin, controllers.Note.updateNote);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  app.get('/*', controllers.Note.notFoundPage);
};

module.exports = router;
