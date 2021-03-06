/**
 * AnswerController
 *
 * @module        :: Controller
 * @description	  :: .
 * @author        :: Kevin Blanco
 * @docs          :: http://sailsjs.org/#!documentation/controllers
 */

//Load modules to use
var Promise = require('q');


module.exports = {



  /**
   * Create a new respondent on the database.
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   * @param {callback} next callback function.
   */
  'create': function (req, res, next)
  {

    //Create local variables for the data save
    //If any of the required fields on the model are not meet
    //We return an error
    if( req.body.degree           == null ||
        req.body.certification    == null ||
        req.body.employment       == null ||
        req.body.work_area        == null ||
        req.body.experience       == null ||
        req.body.cpic             == null ||
        req.body.agree            == null ||
        req.body.email            == null){

      return res.json(
        {
          status : '400',
          error  : 'Please fill all the required fields'
        }, 400);

    };


    //If the correct data is on the request...
    //... we create local variables for the data save
    var req_degree          = req.body.degree,
        req_certification   = req.body.certification,
        req_employment      = req.body.employment,
        req_workarea        = req.body.work_area,
        req_experience      = req.body.experience,
        req_cpic            = req.body.cpic,
        req_agree           = req.body.agree,
        req_company_name    = req.body.company_name,
        req_gender          = req.body.gender,
        req_age             = req.body.age,
        req_face_name       = req.body.facebook_username,
        req_face_picture    = req.body.facebook_user_picture,
        req_face_url        = req.body.facebook_profile_url,
        req_testimonial     = req.body.testimonial,
        req_email           = req.body.email;

    if(req.body.agree == null){
      var req_agree_publish = false;
    }else{
      var req_agree_publish = req.body.agree_publish;
    }
    var req_name            = req.body.name,
        req_identification  = req.body.identification;




    // Create a new Respondent record based from the local vars
    Answer.create({

      "degree"                    : req_degree,
      "certification"             : req_certification,
      "employment"                : req_employment,
      "work_area"                 : req_workarea,
      "experience"                : req_experience,
      "cpic"                      : req_cpic,
      "agree"                     : req_agree,
      "company_name"              : req_company_name,
      "gender"                    : req_gender,
      "age"                       : req_age,
      "facebook_profile_name"     : req_face_name,
      "facebook_profile_url"      : req_face_url,
      "facebook_profile_picture"  : req_face_picture,
      "testimonial"               : req_testimonial,
      "agree_publish"             : req_agree_publish,
      "name"                      : req_name,
      "identification"            : req_identification,
      "aproved_by_admin"          : false,
      "email"                     : req_email

      //When done saving the record...
    }).done(function (err, answer) {

      //If there's an error, we retrieve it
      if (err){

        console.log('error while saving a new answer' + JSON.stringify(err) );
        return res.json({error : err}, 404);


       //Successfully saved
      }else{

        console.log('answer saved');
        res.json({ answer: answer }, 200);

      }

    });

  },




  /**
   * Count the total number of respondents.
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   * @param {callback} next callback function.
   */
  'count': function (req, res, next)
  {


    Answer.count(function (err, num) {

      if(err) {
        console.log('error while returning the total number of answer' + JSON.stringify(err) );
        return res.json({error : err}, 404);
      }else{

        console.log(num + ' Total respondents on the database');
        return res.json({total : num}, 200);
      }

    });


  },


  /**
   * Return count data for Basic Chart report.
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   * @param {callback} next callback function.
   * @TODO : Move the mess with the callbacks to use Promises with Q
   */
  'basic': function (req, res, next)
  {

    //Variables to send back to the front-end for the chart
    var rejection = {
      no_title              : null,
      with_title            : null,  //Will have the total of people with title
      belongs_to_cpic       : null,  //Will have the total of people signed in the CPIC
      agree_with_cpic       : null,  //Will have the total of people that supports CPIC 
      not_agree_with_cpic   : null   //Will have the total of people that doesn't support it
    };

    //Options for the Query about people that doesn't have a title
    var noTitleOpts = [
      "No posee ningún grado académico",
      "Bachillerato incompleto en informática"
    ];

    //Options for the Query about people with title
    var with_titleOpts = [
      "Posee técnico o diplomado",
      "Bachillerato completo en informática/sistemas"
    ];

      //First count the people with no title
      Answer.count( )
              .where({ degree : noTitleOpts })
              .exec(function (err, total){
          if(err) {
            return res.json({error : err}, 404);
          }else{
            rejection.no_title = total;

            
              //The count the people with tithe
              Answer.count( )
                  .where({ degree : with_titleOpts })
                  .exec(function (err, total){
              if(err) {
                return res.json({error : err}, 404);
              }else{
                rejection.with_title = total;
                
                  
                    //The counts the people who belongs to the CPIC
                    Answer.count( )
                        .where({ cpic : true })
                        .exec(function (err, total){
                    if(err) {
                      return res.json({error : err}, 404);
                    }else{
                      rejection.belongs_to_cpic = total;
                      
                      //The counts the people who belongs to the CPIC
                      Answer.count( )
                          .where({ agree : true })
                          .exec(function (err, total){
                            if(err) {
                              return res.json({error : err}, 404);
                            }else{
                              rejection.agree_with_cpic = total;
                              
                              //The counts the people who belongs to the CPIC
                              Answer.count( )
                                .where({ agree : false })
                                .exec(function (err, total){
                                  if(err) {
                                    return res.json({error : err}, 404);
                                  }else{
                                    rejection.not_agree_with_cpic = total;
                                    
                                    Answer.count( function(err, total_answers){

                                      if(err) {
                                        return res.json({error : err}, 404);
                                      }else{

                                          return res.json(
                                            {
                                              total : total_answers,
                                              values : rejection
                                            }, 200);
                                        }
                                    });
                                  }
                              });
                            }
                      });
                    }    
                  });
              }
            });
          }
        });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * We do not want blueprints for this
   */
  _config: {

    blueprints: { 
      actions: false,
      rest: false 
    }

  }

  
};
