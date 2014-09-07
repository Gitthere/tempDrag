Boxes = new Meteor.Collection("boxes");

if (Meteor.isClient) {

  Template.box.rendered = function() {
    console.log(this);
    // this.firstNode.style.left = '200px';
    this.firstNode.style.left = this.data.x + 'px';
    this.firstNode.style.top = this.data.y + 'px';
  };

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
    //this allows to change x, y coordinate on db when dragged
    this.x = xCoordinate;
    this.y = yCoordinate;
    Boxes.update({_id: this._id}, this);
    console.log(this);
    // also gets new coords
    // console.log(square);
    // console.log(square.offsetLeft, square.offsetTop);

    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Boxes.find().fetch().length === 0) {
      Boxes.remove({});
      // code to run on server at startup
      Boxes.insert({x: 100,
                    y: 100
                  });
    }
  });
}
