/**
 * 메인 화면 관련한 소스 파일
 * Created by GwonHyeok on 15. 6. 21s..
 */
var SocketIO = SocketIO || io;

var AppMainLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        /* 메인 신을 터치 했을때 작동 */
        var eventListener = cc.EventListener.create({//event listener
            event: cc.EventListener.TOUCH_ONE_BY_ONE, //one click
            swallowTouches: true, //is onTouch return true, stop event propagation
            onTouchBegan: this.onTouchBegan, //callbacks
            onTouchMoved: this.onTouchMoved
        });
        cc.eventManager.addListener(eventListener, this);

        var _sioClient = SocketIO.connect("http://127.0.0.1:8080");

        _sioClient.on("callClientEvent", this.callClientEvent);

        _sioClient.on("connect", function () {
            cc.log("connect called.");
        });
        _sioClient.on("message", function (data) {
            cc.log(_sioClient.tag + " message received: " + data);
        });
        _sioClient.on("error", function () {
            cc.log("error called..");
        });

    },

    callClientEvent: function (data) {
        var msg = "Server CallBack: " + _sioClient.tag + " Data :" + data;
        cc.log(msg);
    },

    onTouchBegan: function (touch, event) {
        cc.log("onTouch Began");
        cc.log("replace Scene");
        cc.director.replaceScene(new cc.TransitionFade(0.6, new SelectStageScene()));
        return false;
    },

    onTouchMoved: function (touch, event) {
        cc.log("onTouchMoved");
        return false;
    }
});

var AppMainScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        this.addChild(new AppMainLayer());

        var node = ccs.csLoader.createNode("res/main/scene_mainscene.json");
        this.addChild(node);

        var firNodeAction = ccs.actionTimelineCache.createAction("res/common/node_fire_light_wood.json");
        var titleNodeAction = ccs.actionTimelineCache.createAction("res/main/node_title.json");
        var buttonGrounNodeAction = ccs.actionTimelineCache.createAction("res/main/layer_button_group.json");

        node.runAction(firNodeAction);
        node.runAction(titleNodeAction);
        node.runAction(buttonGrounNodeAction);
        firNodeAction.gotoFrameAndPlay(0, 100, true);
        titleNodeAction.gotoFrameAndPlay(0, 70, false);
        buttonGrounNodeAction.gotoFrameAndPlay(0, 120, false);

        var tapToStartNode = node.getChildByName("node_text_tap_to_start");
        var fadeAnimation = cc.fadeTo(1, 76.5);
        var fadeOutAnimation = cc.fadeTo(1, 255);
        var pulseAnimation = new cc.Sequence(fadeAnimation, fadeOutAnimation);
        tapToStartNode.runAction(cc.RepeatForever(pulseAnimation));
    }
});