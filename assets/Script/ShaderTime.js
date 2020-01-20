cc.Class({
    extends: cc.Component,

    properties: {
        _start:0,
        _material: null,
        _max:65535,
        max:{
            get: function () {
                return this._max;
            },
            set: function (value) {
                this._max = value;
                if (!CC_EDITOR) {
                    return;
                }

                let sprite = this.node.getComponent(cc.Sprite);
                if (sprite) {
                    let material = sprite.getMaterial(0);
                    material.effect.setProperty('u_time', value);
                }
            }
        },
    },

    start() {
        let sprite = this.node.getComponent(cc.Sprite);
        if (sprite) {
            let csize = this.node.getContentSize();
            //csize.width = 640;
            //csize.height = 512;
            this._material = sprite.getMaterial(0);
            this._material.effect.setProperty('u_resolution', {x:csize.width, y:csize.height});
        }
    },

    update(dt) {
        if (this.node.active && this._material) {
            this._setShaderTime(dt);
        }
    },

    _setShaderTime(dt) {
        this._start += 0.01;
        if (this._start > this.max) {
            this._start = 0;
        }
        this._material.effect.setProperty('u_time', this._start);
    },
});
