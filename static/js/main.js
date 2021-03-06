var varsInUse;
var lineGrammars;
var tabs = 1;
var lines;
var curLine = "";
var linePointer = 0;
var jumpDistance = 8;
var curP;

var MAX_INT_SIZE = 10;

var REPLACE_PATTERN = /ZZZ/i;

// Thresholds
var regLine = 1;
var forLoop = regLine + 0.1;
var whileLoop = forLoop + 0.1;
var defineVar = whileLoop + 0.1;
var log = defineVar + 0.1;

var defaultCodeLine = "MDASH = (i / 2);<br>";

window.onload=function () {
    initVars();
    $(document).keypress(function() {
        curP = document.createElement("span");
        curP.innerHTML = defaultCodeLine;
        revealCode();
        window.scrollBy(0,50);
    });

    var b = setInterval(blink, 450);
};

function initVars() {
    varsInUse = ["System", "FIREWALL_MASTER_CONTROL", "c", "curDist", "servers", "dynamicTableArray", "curSrcDst", "migrationIndex", "PUBLIC_ERROR_CALL", "MDASH", "CCREATE", "mtDAB", "g_frame", "mRefQueue", "dTree", "errRate", "canRemove"];
    methods = ["create", "restartPhase", "recountConst", "configureInputs", "alignMatrices", "calcMaxPing", "isSecurityActive?", "go"];
    lineGrammars  = [
    {code: "ZZZ = (ZZZ * ZZZ) / 2;", vars:"VVV"},
    {code: "ZZZ[ZZZ] += ZZZ(ZZZ);", vars:"VIVV"},
    {code: "ZZZ[ZZZ] = ZZZ[ZZZ-1]++;", vars:"VVVV"},
    {code: "ZZZ = System.callingRemoteTransfer();", vars:"V"},
    {code: "clearCallingCache();", vars:""},
    {code: "ZZZ.getTemplateInfo.parent.reverse() += 1;", vars:"V"},
    {code: "fprintf(ZZZ);", vars: "V"},
        {code: "ZZZ.ZZZ(ZZZ, ZZZ, ZZZ);", vars: "VMVIV"},
        {code: "ZZZ(ZZZ.ZZZ().ZZZ());", vars: "MVMM"},
        {code: "if(ZZZ > ZZZ) ZZZ++;", vars: "VVV"},
        {code: "while (ZZZ > 0) ZZZ(ZZZ);", vars: "VMV"},
        {code: "\n\n", vars: ""},
    ];
    lines = new Queue();
}

function revealCode(){
    if(lines.isEmpty() || ((!lines.isEmpty()) && ((lines.peek().length - linePointer) <= jumpDistance))){
        // Create more
        generateCode();
    }

    if(linePointer >= curLine.length){
        linePointer = 0;
        if(lines.isEmpty()){
            generateCode();
        }
        curLine = lines.dequeue();
    }

    // Can definitely reveal more code
    var curAppendSubstring = curLine.substring(linePointer, linePointer + jumpDistance);
    linePointer += jumpDistance;

    // Insert Line break if at EOL
    $("span").last().prev().append(curAppendSubstring);
    if(linePointer >= curLine.length){
        $("span").last().prev().append(document.createElement("br"));
        $("span").last().prev().append(adjustTabs());
    }

}

function generateCode(){
   var createWhat = Math.random();
   if(createWhat < regLine){
       // Create and insert a line into the line queue
        lines.enqueue(generateLine());
   }
}

function generateLine(){
       var randLine = lineGrammars[Math.floor(Math.random() * lineGrammars.length)];
       var codeStr = randLine.code;
       var vArray = getArrayFromString(randLine.vars);
       for(var a = 0; a < vArray.length; a++){
            codeStr = codeStr.replace(REPLACE_PATTERN, vArray[a]);
       }
    return codeStr;
}

// Helper for generateLine()
function getArrayFromString(s){
    var out = [];
    for (var i = 0; i < s.length; i++){
        var curChar = s[i];
        if(curChar == "V"){
            out.push(varsInUse[Math.floor(Math.random() * varsInUse.length)]);
        } else if (curChar == "I"){
            var num = Math.floor(Math.random() * MAX_INT_SIZE);
            out.push(num.toString());
        } else if (curChar == "M") {
            out.push(methods[Math.floor(Math.random() * methods.length)]);
        }
    }

    return out;
}


// Controls the blinking of the cursor
function blink(){
    $("#cursor").toggle().is(":hidden");
}

function adjustTabs(){
    var tHold = 0.35 + .1 * tabs;
    if(Math.random() > 0.2){
        if(Math.random() > tHold){
            tabs++;
        } else {
            tabs--;
        }
    }

    return "\u00A0".repeat(tabs);
}

String.prototype.repeat= function(n){
    n= n || 1;
    return Array((n+1)*4).join(this);
}