/*
function turn(){
    var showImg=document.getElementsByClassName('show')[1];
    var showArt=document.getElementsByClassName('show')[0];
    showImg.className='';
    showArt.className='';
    if(showImg.parentNode.nextElementSibling!==null){       
        showImg.parentNode.nextElementSibling.children[0].className='show';
        showArt.nextElementSibling.className='show';
    }else{
        showImg.parentNode.parentNode.children[0].children[0].className='show';
        showArt.parentNode.children[0].className="show";
    }
}

var n=setInterval(turn,3000);
c1.onmouseover=function(e){
    if(e.target.nodeName=='A'||e.target.nodeName=='IMG'||e.target.nodeName=='P')
        clearInterval(n);
}
c1.onmouseout=function(e){
    if(e.target.nodeName=='A'||e.target.nodeName=='IMG'||e.target.nodeName=='P')
        n=setInterval(turn,3000);
}
var showImgs=document.querySelectorAll('#c1>div>a>img');
var as=document.querySelectorAll('#c1>div>a');
var showArts=document.querySelectorAll('#c1>article');
for(var show of showImgs){
    show.onmouseover=function() {
        var img = this;
        if (img.className != 'show') {
            var showImg = document.querySelector('#c1>div>a>img.show');
            showImg.className='';
            img.className='show';
            var showArt = document.querySelector('#c1>article.show');
            for(var i=0;i<showImgs.length;i++){
                if(img==showImgs[i])
                    break;
            }
            showArt.className = '';
            showArts[i].className='show';
        }
    }
}
*/
//改jQuery
$(function(){
    function loadCarousel(pno=0){
        $.ajax({
            url:'http://localhost:3000/index',
            type:'get',
            data:{pno},
            dataType:'json',
            success: function(result){
                var html='';
                for(var c of result){
                    c.intro=$.trim(c.intro);
                    if(c.intro.length>=160){
                        c.intro=c.intro.substr(0,160)+'···';               
                    }
                    html+=`<article>
                    <a href="${c.href}">${c.title}</a>
                    <p class="content">${c.intro}</p>
                    </article>`;
                }
                html+=`<div class="showImg">`;
                for(var c of result){
                    html+= `<a href="${c.href}"><img src="${c.pic}"/></a>`;
                }
                html+=`</div><div class="cNav">
                <a href="javascript:;" class="prev"></a>
                <a href="javascript:;" class="next"></a>
                </div><ul class="list-unstyled cIndicators">
                <li><a href="javascpipt:;" class="active"></a></li>
                <li><a href="javascpipt:;"></a></li>
                <li><a href="javascpipt:;"></a></li>
                <li><a href="javascpipt:;"></a></li>
                </ul>`;
                //轮播效果
                var $firstArt=$('#c1').html(html).children().first().addClass('show');
                var $firstImg=$('#c1>div.showImg').children().first().children().addClass('show');
                function carouselIn(){
                    var $showArt=$('#c1').find('article.show');
                    var $showImg=$('#c1>div.showImg').find('.show');
                    $showArt.removeClass('show');
                    $showImg.removeClass('show');
                    if($showImg.parent().next().length!=0){
                        $showImg.parent().next().children().addClass('show');
                        $showArt.next().addClass('show');
                    }else{
                        $firstImg.addClass('show');
                        $firstArt.addClass('show');
                    }
                }
                var n=setInterval(carouselIn,3000)
                $('#c1').on('mouseover','article,img',function(){
                    var artSub=$('#c1>article').index(this);
                    var imgSub=$('#c1>div.showImg>a').index($(this).parent());
                    var $showArt=$('#c1').find('article.show');
                    var $showImg=$('#c1>div.showImg').find('.show');
                    var showSub=$('#c1>div.showImg>a').index($showImg.parent());
                    var $arts=$('#c1>article');
                    var $as=$('#c1>div.showImg>a');
                    if(artSub!=-1){
                        clearInterval(n);
                    }else if(showSub==imgSub){
                        clearInterval(n);
                    }else{
                        $showArt.removeClass('show');
                        $showImg.removeClass('show');
                        $arts.eq(imgSub).addClass('show');
                        $as.eq(imgSub).children().addClass('show');
                        clearInterval(n);
                    }
                    
                });
                $('#c1').on('mouseout','img,article',function(){
                    n=setInterval(carouselIn,3000);
                });
                            
            }
        })
    }
    loadCarousel();
    $('#c1>ul.cIndicators').on('click','a',function(){
        var pno=$('#c1>ul.cIndicators>li').index(this);
        loadCarousel(4);
    })
})