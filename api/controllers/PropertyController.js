/**
 * PropertyController
 *
 * @description :: Server-side logic for managing properties
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {     

create: function(req, res) {
    if (req.method == "POST") {
        Property.create(req.body.Property).exec( function(err, model) {
            return res.send("Successfully Created!");
        });
    } else {
        return res.view('property/create', {'userrole': req.session.userrole, 'userid': req.session.userid, 'username': req.session.username});
    }
},

// json function
json: function(req, res) {
    Property.find().exec( function(err, property) {
        return res.json(property);
    });
},

search:function(req,res){
        if(req.method=="GET")
            return res.view("Property/search")
    },
// index function
index: function(req, res) {
    Property.find()
    .where({highlight: 1}).exec( function(err, property) {
        if(req.session.userrole==null){
          return res.view('property/index', {'property': property, 'userrole': 0, 'userid': 0, 'username': '0'});
        } else {
          return res.view('property/index', {'property': property, 'userrole': req.session.userrole, 'userid': req.session.userid, 'username': req.session.username});
        }
    });
},

// paginate function
paginate: function (req, res) {
    if(req.method=="GET"){
         Property.find().paginate({page: req.query.page, limit: 2})
        .exec( function(err, property) {
            Property.count().exec( function(err, value) {
                var pages = Math.ceil(value / 2 );
                if(req.session.userrole==null){
                return res.view('property/paginate', {'property': property,'count':pages, 'current':req.query.page, 'userrole': 0, 'userid': 0, 'username': '0'});
    
                } 
                else {
            return res.view('property/paginate', {'property': property,'count':pages, 'current':req.query.page, 'userrole': req.session.userrole, 'userid': req.session.userid, 'username': req.session.username});
                }
                
            }); 
        });
    } else {
        
         Property.find()
         .where({ locate: { 'contains': req.body.estate}})
         .where({ Bedrooms: {'contains': req.body.bedrooms}})
         .where({ area: { '>=': req.body.area1, '<': req.body.area2 } })
         .where({ rent: { '>=': req.body.rent1, '<': req.body.rent2 } })
         .paginate({page: req.query.page, limit: 2})
        .exec( function(err, property) {
            Property.count()
            .where({ locate: { 'contains': req.body.estate}})
            .where({ Bedrooms: {'contains': req.body.bedrooms}})
            .where({ area: { '>=': req.body.area1, '<': req.body.area2 } })
            .where({ rent: { '>=': req.body.rent1, '<': req.body.rent2 } })
            .exec( function(err, value) {
                var pages = Math.ceil(value / 2 );
                if(req.session.userrole==null){
                return res.view('property/paginate', 
                    {'property': property,'count':pages, 'current':req.query.page, 'userrole': 0, 'userid': 0, 'username': '0'});
    
                } else {
                    return res.view('property/paginate', 
                        {'property': property,'count':pages, 'current':req.query.page, 'userrole': req.session.userrole, 'userid': req.session.userid, 'username': req.session.username});
                }
                
            }); 
        });

    }
   
},

view: function (req, res) {
    Property.findOne(req.params.id).exec( function(err, model) {
        if (model != null){
            if(req.session.userrole==null){
              return res.view('property/view', 
                {'property': model, 'userrole': 0, 'userid': 0, 'username': '0'});
            } else {
               return res.view('property/view',
                {'property': model,'userrole': req.session.userrole,'userid': req.session.userid, 'username': req.session.username});
            }
           
        } else{
            return res.send("No such property");
        }
    }); 
},

// update function
update: function(req, res) {
    if (req.method == "GET") {
        Property.findOne(req.params.id).exec( function(err, model) {
            if (model == null)
                return res.send("No such Property!");
            else
                return res.view('property/update', {'property': model,'userrole': req.session.userrole,'userid': req.session.userid, 'username': req.session.username});
        });
    } else {
        Property.findOne(req.params.id).exec( function(err, model) {
            model.name = req.body.Property.name;
            model.URLimg = req.body.Property.URLimg;
            model.area = req.body.Property.area;
            model.locate = req.body.Property.locate;
            model.rent = req.body.Property.rent;
            model.Bedrooms = req.body.Property.Bedrooms;
            model.ExpectedTenants = req.body.Property.ExpectedTenants;
            if(req.body.Property.highlight==1){
                model.highlight = 1;
            } else {
                model.highlight = 0;
            }
            model.save();
            return res.send("Record updated");
        }); 
    }
},

showIntMember: function (req, res) {
    
    console.log(req.params.id);
     Property.findOne(req.params.id).populate('appeal').exec( 
        function (err, model) {
    
        if (model == null){
            return res.send("No such user");
        } 
        
        return res.view('property/showIntMember', 
            {'user': model.appeal, 'userrole': req.session.userrole, 'userid': req.session.userid, 'username': req.session.username});

    })
},




 
 delete: function(req, res) {
   Property.findOne(req.params.id).exec( function(err, model) {
        if (model != null) {
            model.destroy();
            return res.send("Property Deleted");
        } else {
            return res.send("Property not found");
        }
    }); 
},


admin: function(req, res) {
    Property.find().exec( function(err, property) {
        if (property == null) {
            return res.send("property is null");
        } else {
            return res.view('user/myProperties', {'property': property, 'userrole': req.session.userrole, 'userid': req.session.userid, 'username': req.session.username});

        }
    }); 
},

showkaizi: function (req, res) {

    Property.findOne(req.params.id).populateAll().exec( function (err, model) {

      return res.json(model);

    })
  }




};

