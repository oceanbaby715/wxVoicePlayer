/**
 * audio美化-仿微信
 *
 * Date：2017-11-09
 * Author：haiyang
 */
+ function($) {
  //'use strict';
  // wxVoicePlayer PUBLIC CLASS DEFINITION
  // ==============================

  var wxVoicePlayer = function(element, options) {
    this.$element = $(element);
    this.options=$.extend({}, wxVoicePlayer.DEFAULTS, options);
    this.$box=$('<div class="wxVoice" data-duration="0\'\'"></div>');
    this.audioStatus="stop";//playing  默认停止
    this.init();
  };

  //版本号
  wxVoicePlayer.VERSION = '0.1.0';

  //默认设置
  wxVoicePlayer.DEFAULTS = {
    //autoplay: false,//不考虑自动播放
    volume:0.1
  };

  //初始化样式
  wxVoicePlayer.prototype.init=function(){
  	var that=this;
  	//把audio标签包裹起来
  	that.$element.after(that.$box);
  	that.$box.append(that.$element);
	//设置音量
	that.$element.get(0).volume=that.options.volume
	that.play();
	that.ended();
	that.canplay();
  }

  //播放
  wxVoicePlayer.prototype.play=function(){
  	var that=this;
  	that.$box.click(function(){
  		//暂时只考虑停止和播放不会有暂停的状态
  		if (that.audioStatus === "playing") {
			that.$element.get(0).pause();
			that.$element.get(0).currentTime = 0;
			that.audioStatus="stop";
			that.$box.removeClass("playing")
			return;
		}else{
			that.$element.get(0).currentTime = 0;
			that.$element.get(0).play();
			that.audioStatus="playing";
			that.$box.addClass("playing")
		}
  	})
  }

  //播放完毕
  wxVoicePlayer.prototype.ended=function(){
  	var that=this;
  	that.$element.on("ended", function () {
  		that.audioStatus="stop";
        that.$box.removeClass("playing");
    });
  }
  
  //canplay时获取长度
  wxVoicePlayer.prototype.canplay=function(){
  	var that=this;
  	//只有当canplay才能获取到duration值，否则为NAN
  	that.$element.on("canplay",function(){
  		var duration=Math.round(that.$element.get(0).duration)+"\'\'";//四舍五入
	    that.$box.attr('data-duration', duration);//设置时间
	});
  }
  // wxVoicePlayer PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function() {
      var options = typeof option == 'object' && option;
      new wxVoicePlayer(this, options);
    });
  };
  $.fn.wxVoicePlayer=Plugin;
}(jQuery)