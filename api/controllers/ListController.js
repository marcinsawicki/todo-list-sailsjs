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
    List.create(req.params.all(), function addList(err, list) {
      if (err) return next(err);

      res.redirect('/user/account/' + req.session.me);
    });
  },

  delete: function (req, res, next) {
    List.findOne(req.param('id'), function findList(err, list) {
      if (err) return next(err);
      if (!list) return next(err);

      if (list.owner == req.session.me) {
        List.destroy(req.param('id')).exec(function() {

          Tasks.find({list:req.param('id')}).populateAll().exec( function findTask(err, task) {
            if (err) return next(err);
            if (!task) return next(err);

            if (task.length === 0) {
              res.redirect('/user/account/' + req.session.me);
            } else {
              if (task[0].owner.id == req.session.me) {
                Tasks.destroy({list:req.param('id')}).exec(function(){
                  res.redirect('/user/account/' + req.session.me);
                });
              } else {
                req.flash('error', 'Oszalałeś?!');
                res.redirect('/user/account/' + req.session.me);
              }
            }
          });
        });
      } else {
        req.flash('error', 'Oszalałeś?!');
        res.redirect('/user/account/' + req.session.me);
      }
    });
  },

  edit: function (req, res, next) {
    List.findOne(req.param('id'), function findList(err, list) {
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

      res.redirect('/user/account/' + req.param('id'));
    });
  },

};
