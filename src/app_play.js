/**
 * 게임 플레이 관련 소스
 * Created by GwonHyeok on 15. 6. 26..
 */

var BaseAppPlayScene = cc.Scene.extend({
    HAND_STRIKING_POWER: 1,

    initialGameData: function (rootNode, fireHealth, time) {
        cc.log("initialGameData Init");
        this.rootNode = rootNode;
        this.fireHealth = fireHealth;
        this.time = time;

        this.maxFireHealth = fireHealth;
        this.maxTime = time;

        cc.log("Fire Health Is : " + this.fireHealth);
        cc.log("Initial Time Is " + this.time);

        this.timeTextView = this.rootNode.getChildByName("layer_score").getChildByName("text_time");
        this.timeTextView.setContentSize(120, 120);

        this.startTimer();

    },

    startFireAction: function () {
        var firNodeAction = ccs.actionTimelineCache.createAction("res/common/node_fire_light_wood.json");
        this.rootNode.runAction(firNodeAction);
        firNodeAction.gotoFrameAndPlay(0, 100, true);
    },

    initialHandAction: function () {
        var handButton = this.rootNode.getChildByName("bt_hand").getChildByName("bt_hand");
        handButton.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    this.fireHealth -= this.HAND_STRIKING_POWER;
                    this.checkFireHealth();
                    if (this.fireHealth < 0) {
                        cc.log("I'm Clear");
                        this.showSuccessLayout();
                        this.pauseTimer();
                    }
                    cc.log(this.fireHealth);
                    break;
            }
        }, this)
    },

    /* 게임 클리어시 */
    showSuccessLayout: function () {
        var maxTime = this.maxTime;
        var time = this.time;

        var node = ccs.csLoader.createNode('res/common/layer_success.json');
        this.initGameResultLayout(node.getChildByName("bg_background"));
        this.addChild(node);
    },

    /* 게임 클리어 하지 못했을 경우 */
    showFailLayout: function () {
        var node = ccs.csLoader.createNode('res/common/layer_failed.json');
        this.initGameResultLayout(node);
        this.addChild(node);
    },

    initGameResultLayout: function (node) {
        var bt_home = node.getChildByName("bt_home");
        var bt_store = node.getChildByName("bt_store");
        var bt_replay = node.getChildByName("bt_replay");

        bt_home.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    this.goHome();
                    break;
            }
        }, this);

        bt_store.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    this.goStore();
                    break;
            }
        }, this);

        bt_replay.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    this.goReplay();
                    break;
            }
        }, this);
    },

    goHome: function () {
        cc.log('goHome');
        cc.director.replaceScene(new cc.TransitionFade(0.6, new AppMainScene()));
    },

    goStore: function () {
        cc.log('goStore');
    },

    goReplay: function () {
        cc.log('goReplay');
    },

    checkFireHealth: function () {
        var fireScale = this.maxFireHealth * 0.001;
        var newFireScale = fireScale * this.fireHealth / 10;
        var fireLight = this.rootNode.getChildByName("node_fire_light");
        fireLight.scale = newFireScale >= 0 ? newFireScale : 0;
        console.log(newFireScale >= 0 ? newFireScale : 0);
    },

    startTimer: function () {
        this.schedule(function () {
            this.time -= 1;
            if (this.time >= 0) {
                cc.log("I'm Lived " + this.time);
                this.timeTextView.setString(this.time);
            } else {
                cc.log("I'm Die");
                var handButton = this.rootNode.getChildByName("bt_hand").getChildByName("bt_hand");
                handButton.runAction(cc.spawn(
                    cc.moveTo(0.6, cc.p(handButton.x, -50))
                ));
                this.showFailLayout();
                this.pauseTimer();
            }
        }, 1);
    },

    pauseTimer: function () {
        this.unscheduleAllCallbacks();
    },

    onEnter: function () {
        this._super();
    }
});

var AppPlayScene1_1 = BaseAppPlayScene.extend({

    onEnter: function () {
        this._super();

        /* 게임 뷰 노드 추가 */
        var node = ccs.csLoader.createNode("res/stage_1/scene_stage_1.json");
        this.addChild(node);

        var primitivemanAction_1 = ccs.actionTimelineCache.createAction("res/stage_1/node_primitive_man_1.json");
        node.runAction(primitivemanAction_1);
        primitivemanAction_1.gotoFrameAndPlay(0, 490, false);

        BaseAppPlayScene.prototype.initialGameData.call(this, node, 100, 30);
        BaseAppPlayScene.prototype.startFireAction.call(this);
        BaseAppPlayScene.prototype.initialHandAction.call(this);
    }
});

