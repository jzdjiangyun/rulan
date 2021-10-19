var flag = false;//用于判断有没有上传文件
var img = null//用保存转换的图片

$(function () {
    /*  $.preload(manifest,{
         order:true,
         minTimer:4000,
         each:function(count){
                  
         },
         end:function(){
         console.log('结束');  
         }
     }) */

    setTimeout(function () {
        $('.index').removeClass('dn')
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
    });


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
},4000);