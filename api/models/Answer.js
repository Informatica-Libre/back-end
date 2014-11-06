/**
 * Answer Model
 *
 * @module        :: Model
 * @description   :: Represent the data of a poll entry data.
 * @docs		      :: http://sailsjs.org/#!documentation/models
 * @author        :: Kevin Blanco
 */

module.exports = {

  schema : true,

  attributes: {

    degree : {
      type      : 'string',
      required  : true
    },

    certification : {
      type      : 'string',
      required  : true
    },

    employment : {
      type      : 'string',
      required  : true
    },

    experience : {
      type      : 'string',
      required  : true
    },

    cpic : {
      type      : 'string',
      required  : true
    },

    agree : {
      type      : 'string',
      required  : true
    },

    company_name : {
      type : 'string'
    },

    gender : {
      type : 'string'
    },

    age : {
      type : 'string'
    }
  }


};
