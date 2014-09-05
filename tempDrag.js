Boxes = new Meteor.Collection("boxes");


if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("boxes", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("boxes");
    }

  });

  Template.hello.events({
    'click button': function () {
      // increment the boxes when button is clicked
      // Session.set("boxes", Session.get("boxes") + 1);
      console.log(Boxes);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Boxes.insert({x: 0,
                  y: 0
                });
    // publishes to all subs
    Meteor.publish("all-rooms", function() {
      //returns array of objects
      return [
        Boxes.find({x:0}),
      ];
    });
  });
}
