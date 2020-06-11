function change() {
    $('p#cartAdder').fadeOut(function(){
        $('p#cartAdder').html("added to cart");
        $('p#cartAdder').fadeIn(100);
    });
}