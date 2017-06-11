var selects = document.querySelectorAll('select'); 
for(var i = 0; i < selects.length; i++) {
    var html = '<option value="">Select</option>'+
                '<option value="1">1</option>'+
                '<option value="1.5">1.5</option>'+
                '<option value="2">2</option>'+
                '<option value="2.5">2.5</option>'+
                '<option value="3">3</option>'+
                '<option value="3.5">3.5</option>'+
                '<option value="4">4</option>'+
                '<option value="4.5">4.5</option>'+
                '<option value="5">5</option>'+
                '<option value="5.5">5.5</option>'+
                '<option value="6">6</option>'+
                '<option value="6.5">6.5</option>'+
                '<option value="7">7</option>'+
                '<option value="7.5">7.5</option>'+
                '<option value="8">8</option>'+
                '<option value="8.5">8.5</option>'+
                '<option value="9">9</option>';
    selects[i].innerHTML = html; 
} 

function nearestRound(num) {
    var numArray = num.split('.'); 
    if(numArray[1] > 5) {
        num = Math.round(num);
    } else if(numArray[1] < 5 && numArray[1] != 0) {
        num = numArray[0] + ".5";
    } 
    return num; 
} 
function getTotal(obj) {
    var items = Object.keys(obj); 
    if((items.indexOf('writingt1') != -1) && items.indexOf('writingt2') != -1) {
        var writing = (Number(obj.writingt1) + Number(obj.writingt2) + Number(obj.writingt2)) / 3; 
        writing = writing.toFixed(1);         
        writing = nearestRound(writing); 
        delete obj.writingt1; 
        delete obj.writingt2; 
        obj.writing = writing;
    } 
    var values = Object.values(obj); 
    var total = 0; 
    for(var i = 0; i < values.length; i++) {
        total = total + Number(values[i]); 
    } 
    return {number: values.length, total: total}; 
}
function getAverage() {
    event.preventDefault(); 
    var valuesNodes = document.querySelectorAll('select');
    var valObj = {}; 
    var values = {}; 
    var total = 0; 
    var average = 0; 
    for(var i = 0; i < valuesNodes.length; i++) {
        valObj[valuesNodes[i].name] = valuesNodes[i].value; 
        if(valuesNodes[i].value) {
            values[valuesNodes[i].name] = valuesNodes[i].value; 
        } 
    } 
    if(Object.keys(values).length) { 
        var getTotl = getTotal(values);
        average = getTotl.total / getTotl.number; 
        average = average.toFixed(1); 
        average = nearestRound(average); 
        var string = ""; 
        var color = ""; 
        if(average == 9) {
            string = "Expert User"; 
            color = "#4CAF50"; 
        } 
        if(average >= 8 && average < 9) {
            string = "Very Good User"; 
            color = "#8BC34A";
        }
        if(average >= 7 && average < 8) {
            string = "Good User"; 
            color = "#C0CA33";
        } 
        if(average >= 6 && average < 7) {
            string = "Competent User"; 
            color = "#2196F3";
        } 
        if(average >= 5 && average < 6) {
            string = "Modest User"; 
            color = "#03A9F4";
        } 
        if(average >= 4 && average < 5) {
            string = "Limited User"; 
            color = "#00BCD4";
        } 
        if(average >= 3 && average < 4) {
            string = "Extremely Limited User"; 
            color = "#FFB300";
        } 
        if(average >= 2 && average < 3) {
            string = "Intermittent User"; 
            color = "#FF9800";
        } 
        if(average >= 1 && average < 2) {
            string = "Non User"; 
            color = "#FF5722";
        } 
        
        var html = '<div class="col">Average is</div><div class="col score">'+ average +'</div><div class="col">'+ string +'</div>'; 
        var node = document.querySelector('.result'); 
        node.innerHTML = html; 
        node.style.backgroundColor = color; 
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
} 