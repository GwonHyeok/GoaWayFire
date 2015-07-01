/**
 * 스테이지 선택 관련한 소스 파일
 * Created by GwonHyeok on 15. 6. 26..
 */

var SelectStageScene = cc.Scene.extend({
        onEnter: function () {
            this._super();

            var node = ccs.csLoader.createNode("res/select_stage/scene_select_stage_main.json");
            this.addChild(node);


            node.getChildByName("layer_bt_back")
                .getChildByName("bt_back")
                .addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_BEGAN:
                            cc.director.runScene(new cc.TransitionFade(0.6, new AppMainScene()));
                            break;
                    }
                }, this);

            node.getChildByName("panel_1")
                .addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_BEGAN:
                            cc.director.runScene(new cc.TransitionFade(0.6, new SelectStageDetailScene_1()));
                            break;
                    }
                }, this);

            node.getChildByName("panel_2")
                .addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_BEGAN:
                            cc.director.runScene(new cc.TransitionFade(0.6, new SelectStageDetailScene_2()));
                            break;
                    }
                }, this);

            node.getChildByName("panel_3")
                .addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_BEGAN:
                            cc.director.runScene(new cc.TransitionFade(0.6, new SelectStageDetailScene_3()));
                            break;
                    }
                }, this);

            node.getChildByName("panel_4")
                .addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_BEGAN:
                            cc.director.runScene(new cc.TransitionFade(0.6, new SelectStageDetailScene_4()));
                            break;
                    }
                }, this);
        }
    }
);

var BaseSelectStageDetailScene = cc.Scene.extend({

    onEnter: function () {
        this._super();
    },

    loadScene: function (file) {
        var node = ccs.csLoader.createNode(file);
        this.addChild(node);

        var backButton = node
            .getChildByName("layer_bt_back")
            .getChildByName("bt_back");

        if (backButton != null) {
            backButton.addTouchEventListener(function (sender, type) {
                switch (type) {
                    case ccui.Widget.TOUCH_BEGAN:
                        cc.director.runScene(new cc.TransitionFade(0.6, new SelectStageScene()));
                        break;
                }
            }, backButton);
        }
        return node;
    }
});

var SelectStageDetailScene_1 = BaseSelectStageDetailScene.extend({
    onEnter: function () {
        this._super();
        this.loadScene("res/select_stage/scene_select_stage_1.json");
    },

    loadScene: function (file) {
        var mainNode = this._super(file);

        var buttons = [];

        for (var i = 1; i <= 8; i++) {
            buttons[i] = mainNode.getChildByName("bt_" + i);
            buttons[i].addTouchEventListener(function (sender, type) {
                switch (type) {
                    case ccui.Widget.TOUCH_BEGAN:
                        cc.director.runScene(new cc.TransitionFade(0.6, new AppPlayScene1_1()));
                        break;
                }
            }, buttons[i]);
        }
    }
});

var SelectStageDetailScene_2 = BaseSelectStageDetailScene.extend({
    onEnter: function () {
        this._super();
        this.loadScene("res/select_stage/scene_select_stage_2.json");
    },

    loadScene: function (file) {
        this._super(file);
    }
});

var SelectStageDetailScene_3 = BaseSelectStageDetailScene.extend({
    onEnter: function () {
        this._super();
        this.loadScene("res/select_stage/scene_select_stage_3.json");
    },

    loadScene: function (file) {
        this._super(file);
    }
});

var SelectStageDetailScene_4 = BaseSelectStageDetailScene.extend({
    onEnter: function () {
        this._super();
        this.loadScene("res/select_stage/scene_select_stage_4.json");
    },

    loadScene: function (file) {
        this._super(file);
    }
});