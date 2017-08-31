/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email: {
      type: 'email',
      required: true
    },
    name: {
      type: 'string'
    },
    password: {
      type: 'string',
      required: true
    },
    street: {
      type: 'string'
    },
    postcode: {
      type: 'string'
    },
    tasks: {
      collection: 'list',
      via: 'owner'
    }
  },

};
