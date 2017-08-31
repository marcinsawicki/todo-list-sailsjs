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

  delete: function(req, res, next) {
    List.destroy(req.param('id')).exec(function(){
      res.redirect('/user/account/'+req.session.me);
    });
  },

};
