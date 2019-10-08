$(document).ready(function(){
  $(".qbh-shopping-main-again").on('click',function(){
    $.fn.fullpage.moveTo(1);//主要是这一部分
  })
  $(".qbh-down").on('click',function(){
    $.fn.fullpage.moveSectionDown();//主要是这一部分

  })
  $('#fullpage').fullpage({//这里面写参数
sectionsColor:['#fadd67', '#84a2d4', '#ef674d', '#fed', '#d04759', '#84d9ed', '#8ac060'],
    //添加小圆点导航
    navigation:true,
    //小圆点的导航的位置
    navigationPosition:'right',
    //小圆点导航的文字提示
    navigationTooltips:['first','second','third','fourth','fifth','sixth','seventh','eighth'],
    //是否显示当前这一页的文字提示
    showActiveTooltip:true,
    //控制滚动速度
    scrollingSpeed:1000,
  //  当页面载入后的回调函数
    afterLoad:function(anchorLink,index){
      //第二屏动画
      if(index==2){
       //让未打字的搜索框向左移动
        $('.qbh-list-search').animate({
          opacity:1,
          marginRight:489
        },1000,function(){
          $('.qbh-list-search img:last-child').animate({
            opacity:1
          },1000,function(){
            $('.qbh-list-search').hide();

            //接着让写好的显示
            $('.qbh-list-search-finish').show().animate({
              //opacity:1,
              width:130,
              bottom:449,
              right:432
            },1000,function(){

              })
            $('.qhb-list-sofe').show().animate({
              width:442
            },1000,function(){
              $('.qbh-list-word img:last-child').animate({
                opacity:1
              },1000,function(){
                $('.qbh-down').animate({
                  opacity:1
                },500)
              })

            })
          })

        })

      }
      if(index==5){
        $('.qbh-payment-hands').animate({
          bottom:0
        },700,function(){
          $('.qbh-payment-mouse img:last-child').show();
          $('.qbh-payment-drop').delay(500).show(0).animate({
            bottom:145
          },1000,function(){
            $('.qbh-payment-bill img:first-child').animate({
              top:-100
            },1000)
            $('.qbh-payment-bill img:last-child').animate({
              top:164
            },600,function(){
              $('.qbh-down').animate({
                opacity:1
              },500)
            })
          })

        })


      }
      // 第七屏动画
      if (index == 7) {
        $('#star').addClass('star');

          //添加类名


          $('.qbh-appraise-haoping').delay(3000).show().animate({
            left: 40
          },500,function(){
            $(this).animate({
              width: 72
            },500,function(){
              $('.qbh-down').animate({
                opacity:1
              },500)
            })
          })


      }
      // 第八屏动画
      if(index == 8) {
        // 当鼠标在第八屏移动的时候
        $(document).mousemove(function(e){
          // console.log(1);
          // 获取鼠标的位置
          var x = e.pageX - 85;
          var y = e.pageY + 10;
          var yy = $(window).height() - 449;
          // console.log(e);
          // 把鼠标的位置的坐标设置给手图片
          if(y < yy) {
            $(".qbh-shopping-hands").css({
              "left": x,
              "top": yy
            })
          }else {
            $(".qbh-shopping-hands").css({
              "left": x,
              "top": y
            })
          }

        })
      }

    },
    //一旦用户离开某个session，过渡到新section，就会触发此回调
    onLeave:function(index,nextIndex,direction){
      if(index==1&& nextIndex==2){
        $('.qbh-down').animate({
          opacity:0
        },500)
      }
      if(index==2&& nextIndex==3){
        $('.qbh-down').animate({
          opacity:0
        },500)
      }
      if(index==3&& nextIndex==4){
        $('.qbh-down').animate({
          opacity:0
        },500)
      }
      if(index==4&& nextIndex==5){
        $('.qbh-down').animate({
          opacity:0
        },500)
      }
      if(index==5&& nextIndex==6){
        $('.qbh-down').animate({
          opacity:0
        },500)
      }
      if(index==6&& nextIndex==7){
        $('.qbh-down').animate({
          opacity:0
        },500)
      }
      if(index==7&& nextIndex==8){
        $('.qbh-down').animate({
          opacity:0
        },500)
      }
      //第三屏动画
      if(index==2&&nextIndex==3){
        //让第二屏的沙发显示并掉落
        $('.qbh-list-drop').show().animate({
          bottom:-($(window).height()-260),
          width:201,
          right:630
        },2000,function(){
          $('.qbh-buy-main-choose-false').hide();
            $('.qbh-down').animate({
              opacity:1
            },500)

        })
      }
      //第四屏动画
      if(index==3&&nextIndex==4){
        $('.qbh-info-rotate-sofa').show().animate({
          bottom: -($(window).height()-195),
          right:453
        },1000,function(){
          $('.qbh-info-cart img:last-child').show();
          $('.qbh-info-rotate-sofa').hide();
          $('.qbh-info-cart').animate({
            right:-500
          },2000,function(){
              $('.qbh-info-address-box').show();
            $('.qbh-info-word img:last-child').css('opacity','1')

              $('.qbh-down').animate({
                opacity:1
              },500)

          })

        })
      }
      //第五屏动画
      //if(index==4&&nextIndex==5){
      //  $('.qbh-payment-hands').animate({
      //    bottom:0
      //  },1000,function(){
      //    $('.qbh-payment-mouse img:last-child').show();
      //    $('.qbh-payment-drop').delay(500).show(0).animate({
      //      bottom:145
      //    },1000,function(){
      //      $('.qbh-payment-bill img:first-child').animate({
      //        top:-100
      //      },1000)
      //      $('.qbh-payment-bill img:last-child').animate({
      //        top:164
      //      },600)
      //    })
      //
      //  })
      //
      //}

      if(index==5&&nextIndex==6){
          $('.qbh-payment-drop2').show().animate({
            bottom:-($(window).height()-550),
            width:60
          },1000)
          $('.qbh-delivery-box').show().animate({
            left: 296,
            bottom: 536,
            width:123
          },1000,function(){
            $('.qbh-payment-drop2').hide()
            $('.qbh-delivery-box').animate({
              left: 420,
              bottom: 24,
              width:0
            },1000,function(){
              $('.qbh-delivery-word').show();
              $('.qbh-delivery-word img:last-child').animate({
                opacity:0
              },3000,function(){
                $('.qbh-delivery-word').hide();
              })
              $('.qbh-delivery-truck-font').show();
              $('.qbh-delivery').animate({
                backgroundPositionX:'100%'
              },2000,function(){
                $('.qbh-delivery-deliveryman').animate({
                  width:252,
                  bottom:104,
                  right:350
                },1000,function(){
                  $('.qbh-delivery-deliveryman').animate({
                    right:100
                  },1000,function(){
                    $('.qbh-delivery-door').show();
                    $('.qbh-delivery-buyer').animate({
                      width:87
                    },1000,function(){
                      $('.qhb-delivery-message').animate({
                        opacity:1
                      })
                        $('.qbh-down').animate({
                          opacity:1
                        },500)
                    })
                  })
                })
              })
            })
          })
      }

    },

  //  第四屏动画




  })
})