const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getTierlist', mid.requiresSecure, controllers.Tierlist.getTierlist);
  app.get('/getLists', mid.requiresSecure, controllers.Tierlist.getLists);
  app.get('/getULists', mid.requiresSecure, mid.requiresLogin, controllers.Tierlist.getULists);
  app.post('/makeTierlist', mid.requiresSecure, mid.requiresLogin, controllers.Tierlist.makeTierlist);
  app.post('/updateTierlist', mid.requiresSecure, mid.requiresLogin, controllers.Tierlist.updateTierlist);

  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  // app.get('/account', mid.requiresSecure, mid.requiresLogin, controllers.Account.accountPage);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/changePass', mid.requiresSecure, mid.requiresLogin, controllers.Account.changePass);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/', mid.requiresSecure, mid.requiresLogin, controllers.Account.homepage);
};

module.exports = router;
