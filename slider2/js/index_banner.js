/*
    @authors xiaofeng (422972230@qq.com)
    @date 2017-7-19
    @version $Id$
*/
(function() {
    var slider = window.slider = function(params) {
        this.$dom = $(params.id);
        this.$domlist = this.$dom.find("ul li");
        this.$leftBtn = $(params.next);
        this.$rightBtn = $(params.prev);
        this.$bottomBtn = $(params.bottomBtn);
        this.width = params.width;
        this.autoPlay = !!params.autoPlay;
        this.autoTime = {};
        this.sliderTime = params.autoTime;
        this.animateTime = params.time;
        this.index = params.index ? params.index : 0;
        this.$dom.width(params.width);
        this.init();
    }
    slider.prototype.init = function() {
        var self = this;
        self.$leftBtn.click(function(){
            self.prev();
        })
        self.$rightBtn.click(function(){
            self.next();
        });
       
        self.$domlist.css("left",self.width);
        self.$domlist.eq(this.index).css("left",0);

        for(var i = 0; i < this.$domlist.length; i++) {
            this.$bottomBtn.append("<i num=" + i +"></i>")
        }
        self.$bottomBtnList = this.$bottomBtn.find("i");
        self.$bottomBtnList.eq(this.index).addClass('cur').siblings().removeClass("cur");
        self.$bottomBtnList.click(function(){
            if(!$(this).hasClass("cur")){
                var num = $(this).attr("num")
                self.go(num);
            }
        })
        if(this.autoPlay) this.changeTime();
    }
    slider.prototype.changeTime = function() {
        var self = this;
        clearInterval(this.autoTime);
        this.autoTime = setInterval(function() { // 自动切换
            self.$leftBtn.click();
        }, self.sliderTime);
    };
    slider.prototype.go = function(num) {
        this.runing(1,num);
    }
    slider.prototype.next = function() {
        this.runing(1);
    }
    slider.prototype.prev = function() {
        this.runing(0);
    }
    slider.prototype.runing = function(flag,num) {
        if(this.$domlist.is(":animated")){
            return;
        }
        if(num){
            var old = this.index;
            this.index = num;
            if(this.index > old){
                this.$domlist.eq(old).animate({"left" : -this.width},this.animateTime);
                this.$domlist.eq(this.index).css("left", this.width).animate({"left" : 0},this.animateTime);
            }else{
                this.$domlist.eq(old).animate({"left" : this.width},this.animateTime);
                this.$domlist.eq(this.index).css("left", -this.width).animate({"left" : 0},this.animateTime);
            }
        }else{
            if(flag==1){
                this.$domlist.eq(this.index).animate({"left" : this.width},this.animateTime);
                this.index--;
                if(this.index < 0){
                    this.index = this.$domlist.length - 1
                }
                this.$domlist.eq(this.index).css("left", -this.width).animate({"left" : 0},this.animateTime);
            }else{
                this.$domlist.eq(this.index).animate({"left" : -this.width},this.animateTime);
                this.index++;
                if(this.index > this.$domlist.length - 1){
                    this.index = 0;
                }
                this.$domlist.eq(this.index).css("left", this.width).animate({"left" : 0},this.animateTime);
            }
        }

        if(this.autoPlay) this.changeTime();
        this.$bottomBtnList.eq(this.index).addClass('cur').siblings().removeClass("cur");
    }
})();