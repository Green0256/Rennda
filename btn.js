phina.globalize();

phina.define("tapButton", {
  superClass: "DisplayElement",

  init: function(color) {
    this.superInit();

    this.shape = Shape().addChildTo(this);
    this.shape.backgroundColor = color;
    this.shape.setSize(500, 1500);
    
    this.tap = false;
    this.count = 0;
    
    this.label = Label({
      text: 0,
      fill: "midnightblue",
      stroke: "white",
      fontFamily: "CL",
    }).addChildTo(this);
    
    var self = this;
    
    this.shape.setInteractive(true);
    this.shape.onpointstart = function() {
      if (self.tap == true) {
        self.count++;
        
        self.label.text = self.count;
      };
    };
  },
});