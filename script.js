var words = 0;
var score = 0;
var wpm = 0;
var wrong = 0;
var accuracy = 0;
var start = new Date().getTime();
// alert(JSON.stringify(localStorage))
function newkey() {
    if (event.isTrusted) {
        var char = event.which || event.keyCode;
        if (char == 32 || char == 13) {
            if (document.getElementById("textInput").value == typetext.substring(0, typetext.indexOf(" ")) && typetext !== '') {
                typetext = typetext.substring(typetext.indexOf(" ") + 1, typetext.length);
                var tCtx2 = document.getElementById('textCanvas2').getContext('2d');
                tCtx2.canvas.width = 2000;
                tCtx2.font = "13px Georgia";
                tCtx2.fillText(typetext, 0, 10);
                words = words + 1;
                document.getElementById("wordscounter").innerText = `${words} words typed`
                var end = new Date().getTime();
                var time = end - start;
                score = score + 10;
                wpm = (words) / (time / 60000);
                accuracy = (words - wrong) / (words);
                var done = 1 - (typetext.length) / (completion)
                document.getElementById("timecounter").innerText = `${time} milliseconds taken`;
                document.getElementById("scorecounter").innerText = `${score} score`;
                document.getElementById("wpmcounter").innerText = `${wpm} words per minute`;
                document.getElementById("accuracycounter").innerText = `${accuracy} accuracy`;
                document.getElementById("completetioncounter").innerText = `${done} completetion`;
                setTimeout(function(){ document.getElementById("textInput").value = ""; }, 10);
            } else if (document.getElementById("textInput").value == typetext && typetext.length !== 0) {
                alert("you win!");
                typetext = '';
            } else {
                score--
                document.getElementById("scorecounter").innerText = `${score} score`;
                wrong++
            }
        }
    }
}
var tCtx = document.getElementById('textCanvas').getContext('2d'), //Hidden canvas
    imageElem = document.getElementById('image');
document.getElementById('textInput').addEventListener('keyup', function() {
    tCtx.canvas.width = tCtx.measureText(this.value).width;
    tCtx.font = "13px Georgia";
    if(this.value == typetext.substring(0,this.value.length) ){
      tCtx.fillStyle = "green";
    }else{
      tCtx.fillStyle = "red";
    }
    tCtx.fillText(this.value, 0, 10);
    imageElem.src = tCtx.canvas.toDataURL();
}, false);
function request() {
    words = 0;
    score = 0;
    start = new Date().getTime();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        var tCtx2 = document.getElementById('textCanvas2').getContext('2d');
        tCtx2.font = "13px Georgia";
        tCtx2.clearRect(0, 0, 2000, 100);
        words = 0;
        score = 0;
        start = new Date().getTime();
        tCtx2.fillText(this.responseText, 0, 10);
        typetext = this.responseText;
        completion = typetext.length;
        return this.responseText;
    };
    xhttp.open("GET", "https://TypingServer2.atticuskuhn.repl.co", true);
    xhttp.send();
}