Boxes = new Meteor.Collection("boxes");


if (Meteor.isClient) {

  Session.setDefault("boxes", 0);

  Template.box.helpers({
    counter: function () {
      return Session.get("boxes");
    }

  });

  Template.box.events({
    //handlebars dragend for mouseup on class draggable
    'dragend .draggable': function (event, template) {
    //handle bars to find class draggable
    var square = template.find('.draggable');
    //get x and y coord after object dragged to new location
    square.style.left = event.originalEvent.clientX + 'px';
    square.style.top = event.originalEvent.clientY + 'px';
    // also gets new coords
    // console.log(square);
    // console.log(square.offsetLeft, square.offsetTop);

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
