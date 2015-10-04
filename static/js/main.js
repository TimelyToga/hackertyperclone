var varsInUse = [];
var tabs = 0;
var lines = [];
var linePointer = 0;
var jumpDistance = 3;
var curP;

var defaultCodeLine = "MDASH = (i / 2);";

window.onload=function () {
    $(document).keypress(function() {
        curP = document.createElement("p");
        curP.innerHTML = defaultCodeLine;
        revealCode();
        window.scrollBy(0,50);
    });
};

function revealCode(){
    if(lines.length == 0 || ((lines.size != 0) && ((lines[0].length - linePointer) <= jumpDistance))){
        // Create more
        generateCode();
    }

    $("p").last().append(" some shit ");

}

function generateCode(){
   lines.push(defaultCodeLine);
}

function generateLine(){

}