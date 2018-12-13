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

 