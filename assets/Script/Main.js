const UIHelper = require('UIHelper');

cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel: cc.Label,
        itemTemplate: cc.Node,
        scrollView: cc.ScrollView,
        // spawnCount: 20,
        // totalCount: 30,
        spacing: 10,
        bufferZone: 600
    },

    // use this for initialization
    onLoad: function () {
        this.content = this.scrollView.content;
        this.items = [];
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0;
        this.currIndex = -1;
        this.shaderNode = cc.find('shaderNode', this.node);
        this.titleLabel.string = UIHelper.version;
        
        this.init();
    },

    start() {
        // 测试用，直接展示指定Shader
        // this.scheduleOnce(() => {
        //     this.showShader(25);
        // }, 0);
    },

    init: function () {
        this.totalCount = UIHelper.effects.length;
        this.spawnCount = this.totalCount;
        if (this.spawnCount > 20) {
            this.spawnCount = 20;
        }
        this.content.height = this.totalCount * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
    	for (let i = 0; i < this.spawnCount; ++i) { // spawn items, we only need to do this once
    		let item = cc.instantiate(this.itemTemplate);
    		this.content.addChild(item);
    		item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
    		item.getComponent('Item').initItem(this, i, i);
            this.items.push(item);
    	}
    },

    getPositionInView: function (item) { // get item position in scrollview's node space
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    update: function(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) {
            return; // we don't need to do the math every frame
        }
        this.updateTimer = 0;
        let items = this.items;
        let buffer = this.bufferZone;
        let isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
        let offset = (this.itemTemplate.height + this.spacing) * items.length;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].y = items[i].y + offset;
                    let item = items[i].getComponent('Item');
                    let itemId = item.itemID - items.length; // update item id
                    item.updateItem(this, itemId);
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                    items[i].y = items[i].y - offset;
                    let item = items[i].getComponent('Item');
                    let itemId = item.itemID + items.length;
                    item.updateItem(this, itemId);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.scrollView.content.y;
    },

    scrollToFixedPosition: function () {
        this.scrollView.scrollToOffset(cc.v2(0, 500), 2);
    },

    showShader(index) {
        this.scrollView.node.active = false;
        let name = UIHelper.getEffectName(index);
        let filePath = 'prefabs/' + name;
        cc.loader.loadRes(filePath, cc.Prefab, (err, res) => {
            if (err) {
                console.error('Error to load prefab=' +filePath);
                return;
            }
            
            this.currIndex = index;
            this.titleLabel.string = UIHelper.getString(index);
            let node = cc.instantiate(res);
            if (this.shaderNode) {
                this.shaderNode.addChild(node);
            }
        });
    },

    onPrev(sender) {
        this.shaderNode.destroyAllChildren();
        let index = (this.currIndex-1) % UIHelper.getEffectCount();
        if (index < 0) {
            index = UIHelper.getEffectCount() - 1;
        }
        this.showShader(index);
    },

    onNext(sender) {
        this.shaderNode.destroyAllChildren();
        let index = (this.currIndex+1) % UIHelper.getEffectCount();
        if (index < 0) {
            index = 0;
        }
        this.showShader(index);
    },

    onHome(sender) {
        if (this.currIndex != -1) {
            this.currIndex = -1;
            this.titleLabel.string = UIHelper.getString(this.currIndex);
            this.shaderNode.destroyAllChildren();
            this.scrollView.node.active = true;
        }
    }
    
});
