/*
    @authors xiaofeng (422972230@qq.com)
    @date 2017-7-19
    @version $Id$
*/
(function() {
    var slider = window.slider = function(params) {
        this.sliderId = document.getElementById(params.id)
        this.sliderList = this.sliderId.getElementsByTagName("div");
        this.sliderFont = document.getElementById(params.list)
        this.sliderFontlist = this.sliderFont.getElementsByTagName("li");
        this.sliderNext = document.getElementById(params.next);
        this.sliderPrev = document.getElementById(params.prev);
        this.sliderTips =  document.getElementById(params.tips).getElementsByTagName("span")[0];
        this.sliderTipscur = document.getElementById(params.tips).getElementsByTagName("em")[0];
        this.sliderTime = params.time;
        this.autoPlay = !!params.autoPlay;
        this.autoTime = {};
        this.index = params.index ? params.index : 0;
        this.sliderTips.innerHTML = this.sliderList.length;
        this.sliderTipscur.innerHTML = this.index +1;
        this.init();
    }
    slider.prototype.init = function() {
        var self = this;
        // debugger;
        this.sliderNext.onclick = function() {
            self.next();
        }
        this.sliderPrev.onclick = function() {
            self.prev();
        }
        if(this.autoPlay) this.changeTime();
    }
    slider.prototype.changeTime = function() {
        var self = this;
        clearInterval(this.autoTime);
        this.autoTime = setInterval(function() { // 自动切换
            self.sliderNext.onclick();
        }, self.sliderTime);
    };
    slider.prototype.go = function(num) {
        //指向某个index
        //this.index =num
        //this.runing();
    }
    slider.prototype.next = function() {
        this.index = this.index < this.sliderList.length - 1 ? this.index + 1 : 0;
        this.runing();
        if(this.autoPlay) this.changeTime();
    }
    slider.prototype.prev = function() {
        this.index = this.index > 0 ? this.index - 1 : this.sliderList.length - 1;
        this.runing();
        if(this.autoPlay) this.changeTime();
    }
    slider.prototype.runing = function() {
        var num = this.index;
        this.sliderTipscur.innerHTML = num +1;
        for(var i = 0; i < this.sliderList.length; i++) {
            this.sliderList[i].className = "slideimglist";
            this.sliderFontlist[i].className = "";
        }
        this.sliderList[num].className = "slideimglist show";
        this.sliderFontlist[num].className = "show";
    }
})();