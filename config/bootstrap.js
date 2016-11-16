/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {



  var user = {"username": "admin", "password":"123456", "id":1}
  User.create(user).exec( function (err, model)  {});
  user = {"username": "jin", "password":"123456", "id":2}
  User.create(user).exec( function (err, model)  {
    model.like.add(1);
    model.save();   
  });
  user = {"username": "ning", "password":"123456", "id":3}
  User.create(user).exec( function (err, model)  {
    model.like.add(2);
    model.save(); 
  });


  var person = {"name": "Martin Choy", "age":"23", "id":1};

    Person.create(person).exec( function(err, model) {});

    person = {"name": "Sally Yeung", "age":"22", "id":2};

    Person.create(person).exec( function(err, model) {});

var property = {"name": "酒店式靚裝，有泳池會所", "ownerid":2,"URLimg":"http://orientaldaily.on.cc/cnt/finance/20111228/photo/1228-00204-028b1.jpg","locate":"Festival City","area":"700","rent": "18000",
                 "Bedrooms":"3","ExpectedTenants":"4", "highlight":1, "id":1}
  Property.create(property).exec( function (err, model)  {});

  property = {"name": "2房實用，交通方便","ownerid":2,"URLimg":"http://static.apple.nextmedia.com/images/apple-photos/640pix/20030903/Article_fin/03bc351p.jpg","locate":"Tin Ma Court","area":"550","rent": "12000",
  "Bedrooms":"4","ExpectedTenants":"4","highlight":1, "id":2}
  Property.create(property).exec( function (err, model)  {});

  property = {"name": "沙田第一城 套3房剛翻新","ownerid":3,"URLimg":"http://ps.hket.com/res/images/contents/2014/201411/20141121/479078/yyyy1118077_08_600x400_w.jpg","locate":"City One Shatin","area":"900","rent": "25000",
  "Bedrooms":"5","ExpectedTenants":"4","highlight":1, "id":3}
  Property.create(property).exec( function (err, model)  {});

  property = {"name": "平絕同區","ownerid":3,"URLimg":"http://www.angledesign.net/wp-content/uploads/2013/05/IMG_7041.jpg","locate":"Festival City","area":"700","rent": "15000",
  "Bedrooms":"5","ExpectedTenants":"4","highlight":1, "id":4}
  Property.create(property).exec( function (err, model)  {});




 

 




  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
