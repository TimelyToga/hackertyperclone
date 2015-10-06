var varsInUse;
var methods;
var lineGrammars;
var funcGrammars;
var controlGrammar;
var tabs = 1;
var lines;
var curLine = "";
var linePointer = 0;
var jumpDistance = 8;
var curP;
var types;
var inControlStruct;

var MAX_INT_SIZE = 16;

var REPLACE_PATTERN = /ZZZ/i;

// Thresholds
var regLine = .9;
var funcCall = regLine + 0.1;
var whileLoop = funcCall + 0.1;
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
    varsInUse = ["FIREWALL_MODE", "SEC_MASTER", "response", "curDist", "servers", "dynamicTableArray", "curSrcDst", "migrationIndex", "PUBLIC_ERROR_CALL", "MDASH", "CCREATE", "mtDAB", "frame", "ia", "dTree", "errRate", "System"];
    methods = ["delete", "invokeSearchProtocol", "getResult", "getOutputStream", "lookup", "equals", "set", 'recommendNewItems', "hitNextTarget", "bounce"];
    types = ["int", "String", "float", "final String", "HashMap", "double"];
    lineGrammars  = [
        {code: "ZZZ = (ZZZ * ZZZ) / 2;", vars:"VVV"},
        {code: "ZZZ[ZZZ] = Global.initializeSeekers();", vars:"VI"},
        {code: "ZZZ[ZZZ] = ZZZ[ZZZ-1]++;", vars:"VVVV"},
        {code: "ZZZ = ZZZ.callingRemoteTransfer();", vars:"V"},
        {code: "ZZZ.clearCallingCache();", vars:"V"},
        {code: "ZZZ.getTemplateInfo.parent.reverse() += 1;", vars:"V"},
        {code: "fprintf(ZZZ.ZZZ());", vars: "VM"},
        {code: "ZZZ.ZZZ(ZZZ.ZZZ().ZZZ(), ZZZ);", vars: "VMVMMV"},
        {code: "ZZZ = ZZZ.ZZZ(ZZZ, ZZZ, ZZZ);", vars: "VVMVI"},
    ];
    funcGrammars = [
        {code: "<br>function ZZZ(ZZZ ZZZ, ZZZ ZZZ) {\n", vars: "MTVTV"},
        {code: "}"}
    ];
    lines = new Queue();
    inControlStruct = 0;
}

function revealCode(){
    if(lines.isEmpty() || ((!lines.isEmpty()) && ((lines.peek().length - linePointer) <= jumpDistance))){
        // Create more
        createFunction();
    }

    if(linePointer >= curLine.length){
        linePointer = 0;
        if(lines.isEmpty()){
            createFunction();
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
        $("span").last().prev().append(getAndUpdateTabs());
    }

}

function generateCode(){
   var createWhat = Math.random();
   if(createWhat < regLine){
       // Create and insert a line into the line queue
        lines.enqueue(generateLine());
   } else if(createWhat < funcCall) {

   }
}

function generateLine(curGrammar){
    //Handle optional arg
    if (typeof curGrammar === 'undefined') {
       curGrammar = lineGrammars[Math.floor(Math.random() * lineGrammars.length)];
    }

    var codeStr = curGrammar.code;
    var vArray = getArrayFromString(curGrammar.vars);
    for(var a = 0; a < vArray.length; a++){
        codeStr = codeStr.replace(REPLACE_PATTERN, vArray[a]);
    }
    return codeStr;
}

function genLineWithTabs(curGrammar){
    return getCurTabAmount() + generateLine(curGrammar);
}

// Helper for Grammar to array of proper Strings in proper order
function getArrayFromString(s){
    var out = [];
    for (var i = 0; i < s.length; i++){
        var curChar = s[i];
        if(curChar == "V"){
            out.push(varsInUse[Math.floor(Math.random() * varsInUse.length)]);
        } else if (curChar == "I"){
            var num = Math.floor(Math.random() * MAX_INT_SIZE);
            out.push(num.toString());
        } else if (curChar == "M"){
            out.push(methods[Math.floor(Math.random() * methods.length)]);
        } else if (curChar == "T") {
            out.push(types[Math.floor(Math.random() * types.length)]);
        }
    }

    return out;
}

// Create Function methods
function createFunction(){
    var numLines = Math.random()*10 + 5;
    inControlStruct += numLines;
    lines.enqueue(generateLine(funcGrammars[0]));
    tabs = 1;
    for(var a = 0; a < numLines; a++){
        lines.enqueue(genLineWithTabs());
    }

    tabs--;
    lines.enqueue("}<br>");
}


// Controls the blinking of the cursor
function blink(){
    $("#cursor").toggle().is(":hidden");
}

// Tab Methods
function adjustTabs(){
    var tHold = 0.35 + .1 * tabs;
    if(Math.random() > 0.2){
        if(Math.random() > tHold){
            tabs++;
        } else {
            tabs--;
        }
    }
}

function getCurTabAmount(){
    return "\u00A0".repeat(tabs);
}

function getAndUpdateTabs(){
    if(inControlStruct == 0) {
        adjustTabs();
    } else {
        inControlStruct--;
        return "";
    }

    return getCurTabAmount();
}

String.prototype.repeat= function(n){
    n= n || 1;
    return Array((n+1)*4).join(this);
}