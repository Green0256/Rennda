phina.globalize();

const chunk = (input, size) => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0 ?
      [...arr, [item]] :
      [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};

phina.define("Dialog", {
  // 継承
  superClass: 'DisplayElement',
  // 初期化
  init: function(title, content, rightBtn="", leftBtn="", autoLine=true) {
    // 親クラス初期化
    this.superInit();
    
    var self = this;
    
    var btnAmount = 0;
    
    this.redBtnSt = false;
    this.blueBtnSt = false;
    
    this.redBtnFunc = function() {};
    this.blueBtnFunc = function() {};
    
    this.dialogSprite = Sprite("dialog").addChildTo(this).setPosition(mainScene.gridX.center(), mainScene.gridY.center());
    this.dialogSprite.setScale(0.85, 0.85);
    
    this.dialogTitle = Label({
      text: title,
      fill: "midnightblue",
      stroke: "white",
      fontFamily: "CL",
    }).addChildTo(this).setPosition(mainScene.gridX.center(-3), mainScene.gridY.center(-2.75));
    
    const content_format = chunk([...content], 16).map(a => a.join(''));
    content_f = content_format.join("\n");
    
    if (autoLine == false) {
      content_f = content;
    };
    
    this.dialogContent = Label({
      text: content_f,
      fill: "green",
      stroke: "white",
      fontFamily: "CL",
    }).addChildTo(this).setPosition(mainScene.gridX.center(), mainScene.gridY.center());
    
    if (rightBtn != "") {
      this.redBtnSt = true;
      
      this.redBtn = Sprite("redBtn").addChildTo(this).setPosition(mainScene.gridX.center(-4), mainScene.gridY.center(2.5));
      this.redBtn.setScale(0.5, 0.5);
      
      this.redBtnText = Label({
        text: rightBtn,
        fill: "red",
        stroke: "white",
        fontFamily: "CL",
      }).addChildTo(this).setPosition(mainScene.gridX.center(-4), mainScene.gridY.center(2.5));
      
      btnAmount++;
      
      this.redBtn.setInteractive(true);
      this.redBtn.onpointend = function() {
        self.redBtnFunc();
        
        self.remove();
      };
    };
    
    if (leftBtn != "") {
      this.blueBtnSt = true;
      
      this.blueBtn = Sprite("blueBtn").addChildTo(this).setPosition(mainScene.gridX.center(4), mainScene.gridY.center(2.5));
      this.blueBtn.setScale(0.5, 0.5);
      
      this.blueBtnText = Label({
        text: leftBtn,
        fill: "blue",
        stroke: "white",
        fontFamily: "CL",
      }).addChildTo(this).setPosition(mainScene.gridX.center(4), mainScene.gridY.center(2.5));
      
      if (btnAmount == 0) {
        this.blueBtn.x = mainScene.gridX.center();
        this.blueBtnText.x = mainScene.gridX.center();
      };
      
      this.blueBtn.setInteractive(true);
      this.blueBtn.onpointend = function() {
        self.blueBtnFunc();
        
        self.remove();
      };
    };
    
  },
});