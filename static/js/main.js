window.onload=function () {
    $(document).keypress(function() {
        var new_p = document.createElement("p");
        new_p.innerHTML = "for (int i; ) { }";
        $("#view_wrapper").append(new_p);
        window.scrollBy(0,50);
    });
};