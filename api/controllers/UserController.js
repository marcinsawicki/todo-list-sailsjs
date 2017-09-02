/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var hasher = require("password-hash");
module.exports = {

  'new': function (req, res) {
    res.view();
  },

  create: function(req, res, next) {
    User.find({ email: req.param('email') })
    .exec(function (err, users) {
      if (err) return next(err);
      if (users.length) {
        req.flash('error', 'Użytkownik o tym adresie e-mail już istnieje.');
        res.redirect('/user/new/');
      } else {
         User.create({
           email: req.param('email'),
           password: hasher.generate( req.param('password') )
         }, function(err, user){
          if (err) {
            res.redirect('/user/new/');
          } else {
            req.session.me = user.id;
            res.redirect('/user/account/' + user.id);
          }
        });
      }
    });
  },

  account: function(req, res, next) {
    User.findOne(req.param('id')).populateAll().exec( function showUser(err, user) {
      if (err) return next(err);
      if (!user) return next(err);

      List.find({owner:req.param('id')}).populateAll().exec( function showList(err, list) {
        if (err) return next(err);
        if (!list) return next(err);

        if (req.param('id') == req.session.me) {
          res.view({
            user: user,
            list: list
          });
        } else {
          req.flash('error', 'Wystąpił błąd. Proszę zalogować się ponownie.');
          res.redirect('/user/login/');
        }
      });

    });
  },

  edit: function (req, res, next) {
    User.findOne(req.param('id'), function showUser(err, user) {
      if (err) return next(err);
      if (!user) return next(err);

      res.view({
        user: user
      });
    });
  },

  update: function(req, res, next) {
    User.update(req.param('id'), req.params.all(), function userUpdated(err) {
      if (err) {
        return res.redirect('/user/edit/' + req.param('id'));
      }

      res.redirect('/user/account/' + req.param('id'));
    });
  },

  'login': function (req, res) {
    res.view();
  },

  signin: function (req, res, next) {
    User.find({ email: req.param('email') })
    .exec(function (err, user) {
      if (err) return next(err);
      if (user.length) {
        if ( hasher.verify(req.param('password'), user[0].password) ) {
          req.session.me = user[0].id;
          req.flash('success', 'Zalogowano pomyślnie.');
          res.redirect('/user/account/' + user[0].id);
        } else {
          req.flash('error', 'Wpisano błędne hasło.');
          res.redirect('/user/login/');
        }
      } else {
        req.flash('error', 'Użytkownik o tym adresie e-mail nie istnieje.');
        res.redirect('/user/login/');
      }
    });
  },

  logout: function(req, res) {
    req.session.me = null;
    req.flash('logout', 'Pomyślnie wylogowano.');
    return res.redirect('/');
  },

};
