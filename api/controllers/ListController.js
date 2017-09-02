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

      res.redirect('/user/account/' + req.session.me);
    });
  },

  account: function(req, res, next) {
    List.findOne({owner:req.session.me}).populateAll().exec( function showList(err, list) {
      if (err) return next(err);
      if (!list) return next(err);

      res.view({
        list: list
      });
    });
  },

};
