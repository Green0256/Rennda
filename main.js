phina.globalize();

function Result() {
  all = parseInt(right.count + left.count);
  
  m = "右手: " + right.count + "回(" + right.count / 10 + "/s)\n左手: " + left.count + "回(" + left.count / 10 + "/s)\n合計: " + all + "回";
  endD = Dialog("結果", m, "", "もう一度計測する", autoLine=false).addChildTo(mainScene);
  
  endD.blueBtnFunc = function() { window.location.reload() };

};

phina.define("MainScene", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    // 親クラス初期化
    this.superInit();

    // 背景色
    this.backgroundColor = 'midnightblue';
    
    mainScene = this;
    limit = 999;
    
    left = tapButton("red").addChildTo(this).setPosition(50, this.gridY.center());
    right = tapButton("blue").addChildTo(this).setPosition(575, this.gridY.center());
    
    sLabel = Label({
      text: "残り: ?秒",
      fill: "midnightblue",
      stroke: "white",
      fontFamily: "CL",
    }).addChildTo(this).setPosition(this.gridX.center(), 100);
    
    sp = false;
    
    startDialog = Dialog("測定を開始", "OK を押すと右手の十秒間の測定が始まります", "左右を同時に測定する", "OK").addChildTo(this);
    startDialog.blueBtnFunc = function() { 
      limit = 3;
      window.setTimeout(function() {
        right.tap = true; 
        limit = 10;
      },3100);
    };
    
    startDialog.redBtnFunc = function() {
      limit = 3;
      window.setTimeout(function() {
        right.tap = true;
        left.tap = true;
        limit = 10;
        
        sp = true;
      },3100);
    };
  },
  
  update: function(app) {
    if (right.tap == false && left.tap == false) {
      sLabel.text = "開始まで: " + limit.toFixed(1) + "秒";
    } else {
      sLabel.text = "残り: " + limit.toFixed(1) + "秒";
    };
    
    if (sp == true && limit <= 0) {
      sp = false;
      limit = 999;
      
      right.tap = false;
      left.tap = false;
      
      Result();
    };
    
    if (app.frame % 6 == 0) {
      limit -= 0.1;
    };
    
    if (limit <= 0 && sp == false) {
      if (right.tap == true) {
        right.tap = false;
        
        limit = 999;
        
        m = "右手で10秒間に叩けた回数は " + right.count + "回でした！\nOKを押すと左手の計測が開始されます。"
        endDialog = Dialog("終了！", m, "", "ok").addChildTo(this);

        endDialog.blueBtnFunc = function() {
          limit = 3;
          
          window.setTimeout(function() {
            left.tap = true;
            limit = 10;
          },3100)
        };
      };
      
      if (left.tap == true) {
        left.tap = false;
        
        limit = 999;
        
        m = "左手で10秒間に叩けた回数は " + left.count + "回でした！\nOKを押すと合計記録が表示されます。"
        endDialog = Dialog("終了！", m, "", "ok").addChildTo(this);
        
        endDialog.blueBtnFunc = function() {
          Result();
        };
      };
    };
  },
});