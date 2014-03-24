$(function(){

    ({
        init:function(){
            this.main = $(".main");
            this.mainItem = this.main.find(">.main-item");
            this.body = $(".wrapper");
            this.sidebar = $(".sidebar-nav");

            this.event();//
        },
        bindBuy:function(){
             //购买动作
             this.main.on('touchend.buy',".buy-button",$.proxy(this.buy,this));
        },
        event:function(){
            this.main.on('touchend.sidebar',".sidebar-button",$.proxy(this.sidebarShow,this));
            this.main.on('touchend.sidebar',".share-button",$.proxy(this.sharePopup,this));

            this.bindBuy();//立即购买

            //sidebar
            this.sidebar.on('touchend.sidebarNav','a',$.proxy(this.sidebarNav,this));
            var self = this;

            var regTest = /step/g;
            this.stepItems = this.main.find("[class^=upload-step]");
            this.main.on('touchend.link',".button",function(e){
                //按钮跳转  依据data-target触发 导航点击事件
                var me = $(this);
                var item = me.data("target");
                var isT = regTest.test(item);

                if(isT){
                    self.stepToogle(me);
                }else{
                    self.linkfire(item,me);
                }
            });



            //

        },
        linkfire:function(item,self){
            var reg = /step/g;

            if(reg.test(item)){
               self.trigger("stepToogle",self);
            }else{
                this.sidebar_a.filter("[data-item='"+item+"']").trigger("touchend");
            }


        },
        stepToogle:function(self){
            this.stepItems.removeClass("on");
            var item = self.data("target");
            this.stepItems.filter("[data-step='"+item+"']").addClass("on");
        },
        sharePopup:function(e){
            var $sharePopup =  $("#share-popup")
            $sharePopup.addClass("open");

            $sharePopup.one("touchend",".close-button",function(){
                $sharePopup.removeClass("open");
            });
            return false;
        },
        sidebarNav:function(e){
            var $target ;
            if(!this.sidebar_a){
                this.sidebar_a =  this.sidebar.find(".ul>a");
            }
            this.sidebar_a.removeClass("active");
            if(e.target.tagName == "SPAN"){
                $target = $(e.target).parent()
            }else{
               $target = $(e.target)
            }
            if ($target.length){
                $target.addClass("active");

                if($target.data('item')){
                    this.switchMain($target.data('item'));
                }
            }

            return false;
        },
        switchMain:function(item){
            this.mainItem.removeClass("active");
            var $target = this.mainItem.filter("[data-item="+item+"]");
            $target.addClass("active");
            this.body.css("height",$target.css("height"));
            this.body.removeClass("sidebar-open");

        },
        buy:function(){
            console.log('buy')
            return false;
        },
        sidebarShow:function(e){
            this.body.toggleClass("sidebar-open");

            this.main.on('touchend.main',$.proxy(this.sidebarHide,this));
            this.main.off('touchend.buy');
            return false;

        },
        sidebarHide:function (e) {
            // if($(e.target).hasClass('main') || $()){
            //     this.body.toggleClass("sidebar-open");
            // }
            e.preventDefault();
            this.body.removeClass("sidebar-open");
            this.main.off('touchend.main');
            this.bindBuy();
            return false;
        },


    }).init();



});
