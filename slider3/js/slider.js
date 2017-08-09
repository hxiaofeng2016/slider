/*
    @authors xiaofeng (422972230@qq.com)
    @date 2017-8-8
    @version $Id$
*/
(function() {
    var slider = window.slider = function(params) {
        this.$id = $(params.dom);
        this.$Dom = this.$id.find("ul");
        this.$DomLi = this.$Dom.find("li");
        this.autoTime = params.autoTime ? params.autoTime : 2000;
        this.sliderTime = params.sliderTime ? params.sliderTime : 300 ;
        this.sliderTime - this.autoTime >= 0 ? this.autoTime = this.sliderTime * 2 :"";
        this.direction = params.direction ? params.direction : "top" ;
        this.DomLong = this.$id.width();
        this.lFlag = 0;
        this.vFlag = 0 ;
        this.dFlag = 1; 
        switch(this.direction){
            case "top":
                this.dFlag = 1;
                break;
            case "bottom":
                this.dFlag = 2;
                break;
            case "left":
                this.dFlag = 3;
                break;
            case "right":
                this.dFlag = 4;
                break;
        }
        this.dFlag == 1 || this.dFlag == 2 ? this.DomLong = this.$DomLi.height() : "";
        this.init();
    }

    slider.prototype.init = function() {
        var self = this;
        self._style = {"position":"relative"};
        self._style[self.direction] = self.vFlag;
        if(self.dFlag == 3 || self.dFlag == 4){
            self.$Dom.width((self.$DomLi.length + 1) * self.DomLong)
            self.$DomLi.css({"width":self.$id.width(),"float":"left"});
        }
        if(self.dFlag == 2 || self.dFlag == 4){
            self._style[self.direction] = self.vFlag = self.$DomLi.length * self.DomLong;
        }
        self.$Dom.css(self._style).append(self.$DomLi.eq(0).clone());
        self.autoPlay()
    }

    slider.prototype.autoPlay = function() {
        var self = this;
        var myanimate = {};
        var _flag = "-";
        this.auto = setInterval(function() {
            self.lFlag < self.$DomLi.length ? self.lFlag ++ : self.lFlag = 0;
            myanimate[self.direction] = _flag + self.DomLong * self.lFlag;

            if(self.dFlag == 2 || self.dFlag == 4){
                myanimate[self.direction] = self.DomLong * (self.$DomLi.length - self.lFlag);
            }

            self.$Dom.animate( myanimate ,self.sliderTime ,function(){
                if(self.lFlag == self.$DomLi.length){
                    self.lFlag = 0;
                    self.$Dom.css(self.direction,self.vFlag);
                }
            });

        },self.autoTime);
    };

    slider.prototype.clearauto = function() {
        clearInterval(this.auto);
    };

})();