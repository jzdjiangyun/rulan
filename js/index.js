var flag = false;//用于判断有没有上传文件
var img = null//用保存转换的图片
var manifest = [  
    'img/bg-down.png',  
    'img/bg-top.png',  
    'img/bg.png',  
    'img/decompression-btn-shadow.png',  
    'img/decompression-btn.png',  
    'img/decompression-circle.png',  
    'img/decompression-circle2.png',  
    'img/decompression-font.png',  
    'img/decompression-hint.png',  
    'img/decompression-model.png',  
    'img/decompression-model2.png',  
    'img/decompression-sidai.png',  
    'img/decompression-tab.png',  
    'img/decompression-tab1.png',  
    'img/decompression-tab2.png',  
    'img/decompression-tab3.png',  
    'img/decompression-tab4.png',  
    'img/decompression-tab5.png',  
    'img/decompression-tab6.png',  
    'img/decompression-tab7.png',  
    'img/down-balloon.png',  
    'img/head.png',  
    'img/head1.png',  
    'img/head2.png',  
    'img/head3.png',  
    'img/head4.png',  
    'img/head5.png',  
    'img/heart2.png',  
    'img/heart3.png',  
    'img/home.png',  
    'img/img1.png',  
    'img/img2.png',  
    'img/img3.png',  
    'img/img4.png',  
    'img/img5.png',  
    'img/img6.png',  
    'img/logo.png',  
    'img/midde-balloon1.png',  
    'img/middle-heart2.png',  
    'img/middle-test.png',  
    'img/model.png',  
    'img/p1-card.png',  
    'img/p1-create-poster.png',  
    'img/p1-leave-words.png',  
    'img/p1-reback.png',  
    'img/p1-sidai.png',  
    'img/p1-star.png',  
    'img/p1-star2.png',  
    'img/p1-star3.png',  
    'img/p1-star4.png',  
    'img/p1-star5.png',  
    'img/p1-star6.png',  
    'img/p2-box-font.png',  
    'img/p2-box2-font.png',  
    'img/p2-box2-font2.png',  
    'img/p2-box3-font.png',  
    'img/p2-box3-font2.png',  
    'img/p2-box4-font.png',  
    'img/p2-box4-font2.png',  
    'img/p2-box5-font.png',  
    'img/p2-box5-font2.png',  
    'img/p2-center-box.png',  
    'img/p2-font.png',  
    'img/p2-font2.png',  
    'img/p2-font3.png',  
    'img/p2-font4.png',  
    'img/p2-right.png',  
    'img/p2-sidai.png',  
    'img/p2-star.png',  
    'img/p2-star2.png',  
    'img/p2-star3.png',  
    'img/p2-star4.png',  
    'img/p2-star5.png',  
    'img/p2-upload-show.png',  
    'img/p2-upload.png',  
    'img/p3-reopen.png',  
    'img/p3-save-shadow.png',  
    'img/p3-save.png',  
    'img/p3-share.png',  
    'img/p3-sort-shashow.png',  
    'img/p3-sort.png',  
    'img/p3-star.png',  
    'img/p3-star1.png',  
    'img/p3-star2.png',  
    'img/p3-star3.png',  
    'img/photo-album.png',  
    'img/pitch.png',  
    'img/ran-heart.png',  
    'img/ran-heart2.png',  
    'img/ranking.png',  
    'img/reopen-show.png',  
    'img/rule-btn.png',  
    'img/rule-description.png',  
    'img/shadow.png',  
    'img/sidai3.png',  
    'img/sidai4.png',  
    'img/star2.png',  
    'img/star3.png',  
    'img/star4.png',  
    'img/star5.png',  
    'img/star6.png',  
    'img/star7.png',  
    'img/tab-4.png',  
    'img/tab-5.png',  
    'img/test.png',  
    'img/title.png',  
    'img/top- balloon1.png',  
    'img/top-balloon2.png',  
    'img/top-balloon3.png',  
    'img/top-blue-balloon.png',  
    'img/top-card.png',  
    'img/top-hua.png',  
    'img/top-sidai.png',  
    'img/top-sidai1.png',  
    'img/top-star.png',  
    ];  
    
$(function () {
   $.preload(manifest,{
         order:true,
         minTimer:2000,
         each:function(count){
      
                  console.log(Math.ceil(count/manifest.length*100));
         },
         end:function(){
       /*  $('.index').removeClass('dn') */
        //打开创建海报
        $('.model-top').click(function () {

            $('.index').addClass('dn');
            $('.create-poster').removeClass('dn');
            $('.rule').show();
        })
        //创建海报
        $('.p1-create-poster').click(function () {
            $('.create-poster').addClass('dn');
            $('.rule,.confirm-to-upload').removeClass('dn');
        })
        //关闭提示
        $('.close').click(function () {

            $(this).parents('.layer').hide();
        })
        $('.rule-btn').click(function () {
            $('.rule').show();
        })
        //海报样式切换
        $('.tab li').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            $('.box-font-ul li').eq($(this).index()).addClass('active').siblings().removeClass('active');

        })
        //监视上传文件
        $('#camera').on('change', function () {
            console.log($(this)[0].files);
            upload($('.center-box img'), $(this)[0].files[0]);

        })
        //打开相机
        $('.photo-album').click(function () {

            $('#camera').click();
        })
        //上传图片
        $('.p2-upload').click(function () {
            if (flag) {
                //合成图片 
                html2canvas(document.querySelector(".box-font")).then(canvas => {
                    img = new Image();
                    img.src = canvas.toDataURL("image/png");
                    $('.center-box img').hide();
                    flag = false;
                    $('.confirm-to-upload').addClass('dn');
                    //把合成后的照片传给分享页面
                    $('.img-box').attr('src', img.src);
                    $('.dnImg img').attr('src', img.src);
                    $('.share').removeClass('dn');
                });
            } else {
                alert('请上传图片');
            }
        })
        //分享按钮
        $('.p3-share').click(function () {
            console.log('分享');
        })
        $('.share-btn').click(function () {
            console.log('分享');
        })
        //
        $('.back,.p1-reback').click(function () {
            $(this).parents('.box').addClass('dn');
            $('.index').removeClass('dn');
        })

        //排行版按钮
        $('.p3-sort').click(function () {
            $('.share').addClass('dn');
            $('.hint').removeClass('dn');
            $('.ranking-box').removeClass('dn');
        })
        //点赞
        $('.list').on('click', 'li .like', function () {
            $(this).toggleClass('isLike');
            var num = $(this).siblings('.like-num').text();
            if ($(this).hasClass('isLike')) {
                num++;
            } else {
                num--;
            }
            $(this).siblings('.like-num').text(num);
        })
        $('.reopen').click(function () {
            $('.ranking-box').addClass('dn');
            $('.create-poster').removeClass('dn');
        })


        new Swiper('.swiper-container');
//撕掉标签按钮事件
   $('.label').click(function(){
        $(this).addClass('backOutDown')
   })
        /* 排行榜数据  */
        data = {
            arr: [
                {
                    head: 'img/head',
                    weixinName: '微信昵称',
                    rank: 1,
                    likeNum: 128,
                    like: false
                },
                {
                    head: 'img/head1',
                    weixinName: '微信昵称',
                    rank: 2,
                    likeNum: 105,
                    like: false
                },
                {
                    head: 'img/head2',
                    weixinName: '微信昵称',
                    rank: 3,
                    likeNum: 96,
                    like: false
                },
                {
                    head: 'img/head3',
                    weixinName: '微信昵称',
                    rank: 4,
                    likeNum: 65,
                    like: false
                },
                {
                    head: 'img/head4',
                    weixinName: '微信昵称',
                    rank: 5,
                    likeNum: 52,
                    like: false
                },
                {
                    head: 'img/head5',
                    weixinName: '微信昵称',
                    rank: 6,
                    likeNum: 46,
                    like: false
                },
            ]
        }

        var htmlStr = template('rank', data);
        $('.list').html(htmlStr);
   


    var startX = 0;
    var startY = 0;
    var lateX = 0;
    var lateY = 0;
    //把网络图片转换成 64
    function getBase64(imgUrl, img) {
        window.URL = window.URL || window.webkitURL;
        var xhr = new XMLHttpRequest();
        xhr.open("get", imgUrl, true);
        // 至关重要
        xhr.responseType = "blob";
        xhr.onload = function () {
            if (this.status == 200) {
                //得到一个blob对象
                var blob = this.response;
                console.log("blob", blob)
                //  至关重要
                let oFileReader = new FileReader();
                oFileReader.onloadend = function (e) {
                    let base64 = e.target.result;
                    console.log("方式一》》》》》》》》》", base64)
                };
                oFileReader.readAsDataURL(blob);


                img.src = window.URL.createObjectURL(blob);
            }
        }
        xhr.send();
    }
    //上传图片
    function upload(dom, data) {
        var fd = new FormData();
        fd.append('avatar', data);
        $.ajax({
            method: 'POST',
            url: 'http://www.liulongbin.top:3006/api/upload/avatar',
            data: fd,
            // 不修改 Content-Type 属性，使用 FormData 默认的 Content-Type 值
            contentType: false,
            // 不对 FormData 中的数据进行 url 编码，而是将 FormData 数据原样发送到服务器
            processData: false,
            success: function (res) {
                if (res.status == 200) {

                    dom[0].onload = function () {

                        dom.parent().css({
                            marginTop: -$(this).height() / 2,
                            marginLeft: -$(this).width() / 2
                        })
                        $(this).show();

                    }
                    getBase64('http://www.liulongbin.top:3006' + res.url, dom[0]);
                    flag = true;



                } else {

                    alert(res.message);
                }
                lateX = 0;
                lateY = 0;
                dom.parent().css('transform', 'translate(0px,0px)');
                dom.parent().on('touchstart', function (e) {

                    startX = e.targetTouches[0].clientX - lateX;
                    startY = e.targetTouches[0].clientY - lateY;

                    console.log(lateX, lateY)
                })
                dom.parent().on('touchmove', function (e) {
                    console.log(e.targetTouches[0].clientX - startX, $(this).offset().top)
                    var x = e.targetTouches[0].clientX - startX;
                    var y = e.targetTouches[0].clientY - startY;
                    $(this).css({
                        transform: 'translate(' + x + 'px,' + y + 'px)'
                    })
                    lateX = x;
                    lateY = y;
                })

            }


        })
    }
}
}) 

});
