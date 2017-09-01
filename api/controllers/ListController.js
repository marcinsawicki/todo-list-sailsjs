/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function (req, res) {
    res.view();
  },

  create: function(req, res, next) {
    List.create(req.params.all(), function addTask(err, list) {
      if (err) return next(err);

      res.redirect('/user/account/' + list.owner);
    });
  },

  delete: function (req, res, next) {
    List.findOne(req.param('id'), function findTask(err, list) {
      if (err) return next(err);
      if (!list) return next(err);

      if (list.owner == req.session.me) {
        List.destroy(req.param('id')).exec(function(){
          res.redirect('/user/account/'+req.session.me);
        });
      } else {
        req.flash('error', 'Oszalałeś?!');
        res.redirect('/user/account/'+req.session.me);
      }
    });
  },

  edit: function (req, res, next) {
    List.findOne(req.param('id'), function findTask(err, list) {
      if (err) return next(err);
      if (!list) return next(err);

      res.view({
        list: list
      });
    });
  },

  update: function(req, res, next) {
    List.update(req.param('id'), req.params.all(), function listUpdated(err) {
      if (err) {
        return res.redirect('/list/edit/' + req.param('id'));
      }

      res.redirect('/user/account/' + req.session.me);
    });
  },

  done: function(req, res, next) {
    List.findOne(req.param('id'), function updateTask(err, list) {
      if (err) return next(err);
      if (!list) return next(err);

      if (list.owner == req.session.me) {
        List.update(req.param('id'),{status:'done'}).exec(function(){
          res.redirect('/user/account/'+req.session.me);
        });
      } else {
        req.flash('error', 'Oszalałeś?!');
        res.redirect('/user/account/'+req.session.me);
      }
    });
  }

};
