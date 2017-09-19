/*
    @authors xiaofeng (422972230@qq.com)
    @date 2017-8-22
    @version $Id$
*/
(function() {
    var slider = window.slider = function(params) {
        this.sliderId = document.getElementById(params.id)
        this.sliderList = this.sliderId.getElementsByTagName("div");
        this.sliderBtn = document.getElementById(params.button);
        this.sliderButton =this.sliderBtn.getElementsByTagName("i");
        this.sliderTime = params.time;
        this.autoPlay = !!params.autoPlay;
        this.autoTime = {};
        this.index = params.index ? params.index : 0;
        this.init();
    }
    slider.prototype.init = function() {
        var self = this;
        console.log(1)
        // debugger;
        for (var i = 0 ; i < self.sliderButton.length ; i++){
            (function(i){
                self.sliderButton[i].onclick=function(){
                    self.go(i)
                };
            })(i);
        }
        if(this.autoPlay) this.changeTime();
    }
    slider.prototype.changeTime = function() {
        var self = this;
        clearInterval(this.autoTime);
        this.autoTime = setInterval(function() { // 自动切换
            self.next();
        }, self.sliderTime);
    };
    slider.prototype.next = function() {
        this.index = this.index < this.sliderList.length - 1 ? this.index + 1 : 0;
        this.runing();
        if(this.autoPlay) this.changeTime();
    }
    slider.prototype.go = function(num) {
        //指向某个index
        this.index =num;
        this.runing();
        if(this.autoPlay) this.changeTime();
    }
    slider.prototype.runing = function() {
        var num = this.index;
        console.log(num)
        for(var i = 0; i < this.sliderList.length; i++) {
            this.sliderList[i].className = "slideimglist";
            this.sliderButton[i].className = "";
        }
        this.sliderList[num].className = "slideimglist show";
        this.sliderButton[num].className = "cur";
    }
})();