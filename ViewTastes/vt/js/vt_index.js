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

 