//Initialize variables
var xlsx = require('node-xlsx');
const prompt = require('prompt-sync')();
const fs = require('fs');

//array to hold keywords gathered from excel document
const keywords = [];

var topTwenty = 1;  //variable to loop through top 20 keywords
var pastTwenty = 20; //variable to go in order past top twenty keywords

//array to hold images gathered from imageFile prompt
const images = [];

//get locations of images to rename as well as workbook containing keywords
const imageFile = "./"+prompt("file to get images from: ");
const workbook = "./workbooks/"+prompt("SEO workbook to use: ")+".xlsx";
const city = prompt("Enter city of company: ");
const state = prompt("Enter state of company: ");

//----------------------------------<RUN PROGRAM HERE>----------------------------
grabKeyWords(workbook);
getImages(imageFile);
renameImages(images);
console.log("Done!");
//----------------------------------<RUN PROGRAM HERE>----------------------------



//grabs keywords from excel file and replaces spaces with '-' character,
function grabKeyWords(x){
    console.log("Getting keywords...");
    var obj = xlsx.parse('./'+x)[1].data; // parses a file 
for(var i = 1; i < obj.length;i++){
    if(obj[i][0]!=undefined){
        obj[i][0] = obj[i][0].replace(/[\s]/g,"-");
        keywords.push(obj[i][0]);
    }  
}
console.log(keywords);
}

//Gathers images (all files) from location given in imageFile prompt
function getImages(imageFile){
    console.log("Getting Images...");
    fs.readdirSync(imageFile).forEach(file =>{
        images.push(file);
    });
}

//renames all the images gathered from file to the specified name (according to
//keywords gathered from the excel document)
function renameImages(array){
    console.log("Renaming images...");
    for(var i = 0; i < array.length;i++){
        value = array[i].toString().substring(array[i].length-4);

        //Checks to make sure the selected file is an image file
        if(value == '.jpg' || value == ".png"){
            fs.rename("./"+imageFile+"/"+array[i],"./"+imageFile+"/"+keywords[topTwenty]+'-'+city+"-"+state+'-'+keywords[pastTwenty]+".jpg",(err)=>{
            if(err)console.log('Error renaming images!');
            });
        
            topTwenty++;
            pastTwenty++;

            if(topTwenty==20){
                topTwenty=0;
            }
        }
    }
}
