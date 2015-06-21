var AppMainScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var node = ccs.csLoader.createNode("res/main/scene_mainscene.json");
        this.addChild(node);

        var firNodeAction = ccs.actionTimelineCache.createAction("res/main/node_fire_light_wood.json");
        var titleNodeAction = ccs.actionTimelineCache.createAction("res/main/node_title.json");
        var buttonGrounNodeAction = ccs.actionTimelineCache.createAction("res/main/layer_button_group.json");

        node.runAction(titleNodeAction);
        node.runAction(buttonGrounNodeAction);
        firNodeAction.gotoFrameAndPlay(0, 100, true);
        titleNodeAction.gotoFrameAndPlay(0, 100, false);
        buttonGrounNodeAction.gotoFrameAndPlay(0, 200, false);

        var tapToStartNode = node.getChildByName("node_text");
        var fadeAnimation = cc.fadeTo(1, 127.5);
        var fadeOutAnimation = cc.fadeTo(1, 255);
        var pulseAnimation = new cc.Sequence(fadeAnimation, fadeOutAnimation);
        tapToStartNode.runAction(cc.RepeatForever(pulseAnimation));
    }
});