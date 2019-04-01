$(function(){
    function hiddenText(elem){
        var texts=elem.html();
        var n=elem.offsetHight;
        for(var i=0;i<texts.length;i++){
            elem.html(texts.substr(0,i));
            if(n<elem.scrollHeight){
                elem.attr('overflow','hidden');
                elem.html(`${texts.substr(0,i-3)}···`);
                break;
            }
        }
    }
})