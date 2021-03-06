/**
 * Tasks.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    task: {
      type: 'text',
      required: true
    },
    status: {
      type: 'string',
      required: true
    },
    list: {
      model: 'list',
      required: true
    },
    owner: {
      model: 'user',
      required: true
    }
  }
};
