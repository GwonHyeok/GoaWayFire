var AppMainScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var node = ccs.csLoader.createNode("res/main/scene_mainscene.json");
        this.addChild(node);

        var firNodeAction = ccs.actionTimelineCache.createAction("res/main/node_fire_light_wood.json");
        var titleNodeAction = ccs.actionTimelineCache.createAction("res/main/node_title.json");

        node.runAction(firNodeAction);
        node.runAction(titleNodeAction);
        firNodeAction.gotoFrameAndPlay(0, 120, true);
        titleNodeAction.gotoFrameAndPlay(0, 50, false);
    }
});