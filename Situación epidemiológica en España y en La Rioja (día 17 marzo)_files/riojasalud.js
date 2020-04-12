function goTo() {
    var sE = null, url;
    if (document.getElementById) {
        sE = document.getElementById('urlList');
    } else if (document.all) {
        sE = document.all['urlList'];
    }
    if (sE && (url = sE.options[sE.selectedIndex].value)) {
        location.href = url;
    }
}

/*$(function () {
    
    
    if ($('#aceptoLOPD').length) {
        
        
         $('#contact-form button[type="submit"]').click(function (e) {
            e.preventDefault();
            //$(window).stop(true).scrollTo(this.hash, {duration: 1000, interrupt: true, easing: 'swing'});
            
            //$(this).$('#contact-form').is(":checked")
            
        });
    
    
        
    }
    
    
    
});*/