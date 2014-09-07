Boxes = new Meteor.Collection("boxes");




if (Meteor.isClient) {

  Session.setDefault("boxes", 0);

  Template.boxContainer.boxes = function() {
    return Boxes.find();
  };

  Template.box.events({
    //handlebars dragend for mouseup on class draggable
    'dragend .draggable': function (event, template) {
    //handle bars to find class draggable
    var square = template.find('.draggable');
    //get x and y coord after object dragged to new location
    var xCoordinate = event.originalEvent.clientX;
    var yCoordinate = event.originalEvent.clientY;
    square.style.left = xCoordinate + 'px';
    square.style.top = yCoordinate + 'px';

    // also gets new coords
    // console.log(square);
    // console.log(square.offsetLeft, square.offsetTop);

    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Boxes.remove({});
    // code to run on server at startup
    Boxes.insert({x: 0,
                  y: 0
                });
  });
}
