/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function (req, res) {
if (req.method == "GET"){
if (req.session.userrole == null) {
    return res.view('user/login', {'userrole': 0});
    } else {
        return res.view('user/login', {'userrole': req.session.userrole});
    }
} else {
User.findOne({username:req.body.username}).exec( function (err, user) {
                if (user == null) {
                    return res.send("<script>alert('No such user');window.history.back();</script>");
                }
                
                if (user.password != req.body.password) {
                    return res.send("<script>alert('Wrong Password');window.history.back();</script>");
                }
                
                req.session.username = req.body.username;
                req.session.userid = user.id;
                if(req.body.username == 'admin')
                {
                    req.session.userrole = 1;
                } 
                else
                 {
                req.session.userrole = 2;
                }
                
                // req.session.temp1 = '1';
                // req.session.temp2 = 'hihi';   
                //return res.json(req.session);
                Property.find().exec(function(err, property) {
                    return res.view('property/index', {'property': property, 'userrole': req.session.userrole, 'userid': user.id, 'username': user.username});
              });
            })

}
     },

 logout: function (req, res) {
      
      req.session.destroy(function () {
        res.redirect('property/index');
    });
     },


    register: function(req, res) {
    if (req.method == "POST") {

        User.findOne({username:req.body.User.username}).exec( function (err, model) {
                if (model == null) {
                    User.create(req.body.User).exec( function(err, model) {
                        req.session.username = model.username;
                        req.session.userid = model.id;
                        req.session.userrole = 2;
                        return res.send("Successfully Created!");
                    });
                } else {
                    if(req.body.User.username == 'admin'){
                        return res.send("<script>alert('Username is illegal!');window.history.back();</script>");
                    } else {
                        return res.send("<script>alert('Username is illegal!');window.history.back();</script>");
                    } 
                }
            }) 
    } else {
        return res.view('person/create',{'userrole': 0, 'userid': 0, 'username': 'Not'});
    }
},
    
myproperties: function(req, res) {
    if (req.method == "POST") {
        User.create(req.body.User).exec( function(err, model) {
            return res.send("Successfully Created!");
        });
    } else {
        Property.find()
        .where({ownerid:req.session.userid}).exec( function(err, property) {
            return res.view('user/myproperties', {'property': property, 'userrole': req.session.userrole, 'userid': req.session.userid, 'username': req.session.username});
        });    
    
    }
},


myIntproperties: function (req, res) {
   
    console.log(req.session.userid);
     User.findOne(req.session.userid).populate('like').exec( 
        function (err, model) {
    
        if (model == null){
            return res.send("No such member");
        } 
        
        return res.view('user/myIntproperties', {'property': model.like,'userrole': req.session.userrole, 'userid': req.session.userid, 'username': req.session.username});
        

    })
},



declare: function (req, res) {

        User.findOne(req.session.userid).exec( function (err, model) {

            if (model !== null) {
                model.like.add(req.params.id)
                model.save( function (err, model) {

                    if (err) return res.send("Already added");

                    return res.send("like added.");

                });
            } else {
                return res.send("User not found!");
            }
        })
    },

removedeclare: function (req, res) {

        User.findOne(req.params.id).exec( function (err, model) {

            if (model !== null) {
                model.like.remove(req.query.pid)
                model.save();
                return res.send("declare removed!");
            }
            else {
                return res.send("User not found!");
            }
        })
    
    },



showfz: function (req, res) {
    
    User.findOne(req.params.id).populateAll().exec( function (err, model) {

        return res.json(model);
 })
},

    loginapp: function (req, res) {
        User.findOne({username:req.body.username}).exec( function (err, user) {
            if (user == null) {
                return res.send("404");
            }
                    
            if (user.password != req.body.password) {
                return res.send("405");
            }
                    
            req.session.username = req.body.username;
            req.session.userid = user.id;
            if(req.body.username == 'admin') {
                req.session.userrole = 1;
            } else {
                req.session.userrole = 2;
            }
            return res.send("200");              
        });
    },

    logoutapp: function (req, res) {
          
        req.session.destroy(function () {
            return res.send("200"); 
        });
    },

    myIntpropertiesapp: function (req, res) {
   
        console.log(req.session.userid);
        User.findOne(req.session.userid).populate('like').exec(function (err, model) {   
            return res.json(model.like);
        })
    },

    declare: function (req, res) {

        User.findOne(req.session.userid).exec( function (err, model) {

            if (model !== null) {
                model.like.add(req.params.id);
                model.save( function (err, model) {
                    return res.send("200");
                });
            } else {
                return res.send("400");
            }
        })
    },

    removedeclare: function (req, res) {

        User.findOne(req.session.userid).exec( function (err, model) {

            if (model !== null) {
                model.like.remove(req.params.id);
                model.save();
                return res.send("200");
            } else {
                return res.send("400");
            }
        })
    
    }
};

