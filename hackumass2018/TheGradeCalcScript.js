function reload(){
    location.reload();
}

function myFunction() {

    var size1 = document.getElementsByName("grayed").length;
    var size2 = document.getElementsByName("percy").length;
    var big = size1;
    if(size2 > size1) {
        big = size2;
    }
    if(size1 != size2) {
        return;
    }
    //making enters after the third line
    if(big+1 > 3) {
        var breakitup = document.createElement("br");
        document.getElementById("newgrades").appendChild(breakitup);
        var breakitup = document.createElement("br");
        document.getElementById("newgrades").appendChild(breakitup);
    }
    //
    var intro = document.createTextNode("Exam/HW" + (big + 1) + " Grade & Weight:\n");
    document.getElementById("newgrades").appendChild(intro);
    var danewgrade = document.createElement("INPUT");
    danewgrade.setAttribute("name", "grayed");
    document.getElementById("newgrades").appendChild(danewgrade);
    var conjunction = document.createTextNode(" % & ");
    document.getElementById("newgrades").appendChild(conjunction);
    var danewpercent = document.createElement("INPUT");
    danewpercent.setAttribute("name", "percy");
    document.getElementById("newgrades").appendChild(danewpercent);
    var ender = document.createTextNode(" %");
    document.getElementById("newgrades").appendChild(ender);


     
}

function gradeCalc(){

    var grades = [93, 90, 87, 83, 80, 77, 73, 70, 67, 63, 60];
    var letterGrades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-"];

    //obtaining information
    var className = document.getElementById("className").value; 
    var finalex = document.getElementById("finalex").value * 1;

    var validcounter = 0;

    //copies values in fields: grades and percentages
    var grayeds = document.getElementsByName("grayed");
    var percys = document.getElementsByName("percy");

    //makes sure there are valid numbers in the fields
    for(i = 0; i < grayeds.length; i++) {
        if(grayeds[i].value <= 0 || percys[i].value <= 0 || percys[i].value > 100) {
            validcounter++;
        }
    }
    if(validcounter > 0 || finalex > 100) {
        alert("Please Input Valid Values");
        return;
    }

    //removes old calculations
    for(j = 0; j < grades.length; j++) {
        document.getElementById("get"+grades[j]).innerHTML = "";
    }
    document.getElementById("theClass").innerHTML = "";
    document.getElementById("currentGrade").innerHTML = "";

    //chooses how to start the paragraph depending on if the class is defined
    if(className == "") {
        document.getElementById("theClass").innerHTML = "Information about your unspecified class:"
    }
    else {
        document.getElementById("theClass").innerHTML = "Information about your class, " + className + ":";
    }

    //creates helpful variables
    var existingScores = 0;
    var weights = 0;
    for(k = 0; k < grayeds.length; k++) {
        existingScores = existingScores + (grayeds[k].value*percys[k].value*.01);
        weights = (weights*1) + (percys[k].value*1);
    }

    //calculates the final grade based on what has already been taken
    var finalGrade = (existingScores/weights)*100;
    document.getElementById("currentGrade").innerHTML = "Your final current grade is: " + Number.parseFloat(finalGrade).toFixed(2) +"%.";
    
    //if the user wants to find out what they need to get on their next assignment
    if(finalex > 0) {
        var totalPercent = (weights*1) + (finalex*1);
        for(i = 0; i < grades.length; i++) {
            var temp = (grades[i] * .01 * totalPercent) - existingScores;
            temp = (temp/(.01*finalex));
            var toPrint = Number.parseFloat(temp).toFixed(2);
            if(toPrint <= 0) {
                document.getElementById("get" + grades[i]).innerHTML = "You are guaranteed a " + grades[i] + "% (" + letterGrades[i] + ").";
            }
            else {
                document.getElementById("get" + grades[i]).innerHTML = "You need to get a " + toPrint + "% to get a " + grades[i] + "% (" + letterGrades[i] + ").";
            }
            
        }
    }
    document.getElementById("texttoshow").style.display = "inline";
}