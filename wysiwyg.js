var btn = document.querySelector(".sai");
var getText = document.querySelector(".getText");
var content = document.querySelector(".getcontent");
var editorContent = document.querySelector(".editor");
var suggArr=[];
var suggectionobj;
var selectedtext;
var lookupstring;

btn.addEventListener("click", function() {
  var s = editorContent.innerHTML;
  content.style.display = "block";
  content.textContent = s;
});

getText.addEventListener("click", function() {
  const old = editorContent.textContent;
  content.style.display = "block";
  content.textContent = old;
});

function copy() {
  document.execCommand("copy", false, "");
}

function getsuggestions(lookupstring){
    // var sugg = document.getElementById('keyword').value;
    fetch ("https://api.datamuse.com/sug?s="+lookupstring)
    .then(function(response) {

        return response.json();
    })
    .then(function(myjson){
        console.log(myjson);
        if(myjson){
        suggArr = [];
        for(var i=0;i<myjson.length;i++){
           suggArr.push(myjson[i].word);
        }
        return suggArr;
        }
    })
    .then(function(array){
        var select = document.getElementById("select");
        if(array.length> 0){
            for (var i = 0; i < array.length; i++) {
                var option = document.createElement("OPTION"),
                txt = document.createTextNode(array[i]);
                option.appendChild(txt);
                option.setAttribute("value", array[i]);
                select.insertBefore(option, select.lastChild);            
            }
        }
    });
}

function select(){
    var selectedvalue = document.getElementById('select').value;
    document.execCommand('insertText',false,selectedvalue);
    var myNode = document.getElementById("select");
    myNode.innerHTML = '';
}

function lookup(){
    var lookup = prompt("Please enter the lookup word");
    lookupstring = lookup;
    getsuggestions(lookupstring);
}
