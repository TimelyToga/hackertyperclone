var markovSpain, markovSherlock;
window.onload = onLoad;
function generateMoreText() {
  // x = new markov(text, type, regex);

  markov3 = new markov(corpus, "string", /([.,?"();\-!':—^\w]+ ){5}/g);

  var finaled = "";
  var outString = "";
  var temp = "";
  var temp1 = "";
  for (var i = 0; i < 1; i++) {
    temp = markov3.gen(4).trim() + "."+ "<p>";
    temp1 = temp[0].toUpperCase() + temp.slice(1).toLowerCase();
    finaled += temp1;
  }
  outString += finaled;
}
