Boxes = new Meteor.Collection("boxes");


if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("boxes", 0);

  Template.box.helpers({
    counter: function () {
      return Session.get("boxes");
    }

  });

  Template.box.events({
    'dragend .draggable': function (event, template) {
      // increment the boxes when button is clicked
      // Session.set("boxes", Session.get("boxes") + 1);
    var square = template.find('.draggable');
    square.style.left = event.originalEvent.clientX + 'px';
    square.style.top = event.originalEvent.clientY + 'px';

      console.log(event.originalEvent.clientX);
      console.log(square);
      console.log(square.offsetLeft, square.offsetTop);

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
