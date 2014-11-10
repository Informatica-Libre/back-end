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
      type      : 'boolean',
      required  : true
    },

    work_area : {
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
      type      : 'boolean',
      required  : true
    },

    agree : {
      type      : 'boolean',
      required  : true
    },  

    facebook_profile_name:{
      type : 'string'
    },

    facebook_profile_url:{
      type : 'string'
    },

    facebook_profile_picture:{
      type : 'string'
    },

    company_name : {
      type : 'string'
    },

    gender : {
      type : 'string'
    },

    age : {
      type : 'string'
    },

    aproved_by_admin : {
      type : 'boolean',
      defaultsTo: false
    },

    testimonial : {
      type : 'string'
    },

    agree_publish : {
      type : 'boolean'
    },

    email:{
      type: 'email',
      unique: true,
      required : true
    },

    name : {
      type : 'string'
    },

    identification : {
      type : 'string'
    }


  }


};
