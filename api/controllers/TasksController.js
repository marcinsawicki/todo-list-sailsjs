/**
 * TasksController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function (req, res) {
    User.findOne(req.param('id')).populateAll().exec( function showUser(err, user) {
      if (err) return next(err);
      if (!user) return next(err);
      res.view({
        user: user
      });
    });
  },

  create: function(req, res, next) {
    Tasks.create(req.params.all(), function addTask(err, task) {
      if (err) return next(err);

      res.redirect('/user/account/' + req.session.me);
    });
  },

  delete: function (req, res, next) {
    Tasks.findOne(req.param('id'), function findTask(err, task) {
      if (err) return next(err);
      if (!task) return next(err);

      if (task.owner == req.session.me) {
        Tasks.destroy(req.param('id')).exec(function(){
          res.redirect('/user/account/' + req.session.me);
        });
      } else {
        req.flash('error', 'Oszalałeś?!');
        res.redirect('/user/account/' + req.session.me);
      }
    });
  },

  edit: function (req, res, next) {
    Tasks.findOne(req.param('id'), function findTask(err, task) {
      if (err) return next(err);
      if (!task) return next(err);

      res.view({
        task: task
      });
    });
  },

  update: function(req, res, next) {
    Tasks.update(req.param('id'), req.params.all(), function listUpdated(err) {
      if (err) {
        return res.redirect('/tasks/edit/' + req.param('id'));
      }

      res.redirect('/user/account/' + req.session.me);
    });
  },

  done: function(req, res, next) {
    Tasks.findOne(req.param('id'), function updateTask(err, task) {
      if (err) return next(err);
      if (!task) return next(err);

      if (task.owner == req.session.me) {
        Tasks.update(req.param('id'),{status:'done'}).exec(function(){
          res.redirect('/user/account/' + req.session.me);
        });
      } else {
        req.flash('error', 'Oszalałeś?!');
        res.redirect('/user/account/' + req.session.me);
      }
    });
  }

};
