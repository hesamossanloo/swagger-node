/*jshint esversion: 6 */
'use strict';
var util = require('util');
var fs = require('fs');

module.exports = {
    allDL: getAllDownloadFiles,
    dlFile: downloadFile,
};

/*
    file vars
 */
var filesList = [];
var alina = [];
var alq1 = [];
var alq2 = [];

var file_1 = {
    "tid": "1",
    "size": "121b",
    "name": "image1",
    "permissions": "admin,dev",
    "location": "SPACECRAFT"
}
var file_2 = {
    "tid": "2",
    "size": "1001b",
    "name": "test-file-2",
    "permissions": "admin",
    "location": "SPACECRAFT"
}
var file_3_1 = {
    "tid": "3",
    "size": "1001b",
    "name": "test-file-3_1",
    "permissions": "admin",
    "location": "GROUND"
}
var file_3_2 = {
    "tid": "3",
    "size": "205b",
    "name": "test-file-3_2",
    "permissions": "admin",
    "location": "SPACECRAFT"
}
var file_3_3 = {
    "tid": "3",
    "size": "205b",
    "name": "test-file-3_3",
    "permissions": "admin",
    "location": "SPACECRAFT"
}

alina["GROUND"] = [file_1, file_2, file_3_1, file_3_2, file_3_3];
alina["SPACECRAFT"] = [file_1, file_2, file_3_1, file_3_2];
alq1["GROUND"] = [file_1, file_3_1];
alq1["SPACECRAFT"] = [file_1];
alq2["GROUND"] = [file_2, file_3_2, file_3_3];
alq2["SPACECRAFT"] = [file_2, file_3_2];

filesList["1"] = alq1;
filesList["2"] = alq2;
filesList["3"] = alina;

/*
  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */

function getAllDownloadFiles(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var tid = req.swagger.params.tid.value || 'No tid provided';
    var location = req.swagger.params.location.value || 'No location provided';


    if (tid.indexOf("ALINA") === -1 && location.indexOf("SPACECRAFT") === -1) {
        filesList = [file_3_2, file_3_3, file_1, file_2, file_3_1];
    } else {
        filesList = [file_1];
    }

    // this sends back a JSON response which is an json object
    res.json(filesList);
}
function downloadFile(req, res) {

    var tid = req.swagger.params.tid.value || 'No tid provided';
    var filename = req.swagger.params.filename.value || 'No filename provided';
    var location = req.swagger.params.location.value || 'No location provided';

    var spacecraftFilesBasedOnLocation = findByTIDandLocation(tid,location);

    var foundItem = false;

    if (spacecraftFilesBasedOnLocation.length !== undefined) {
        if(spacecraftFilesBasedOnLocation.find(x => x.name === filename)){
            foundItem = true;
            if(filename.indexOf('image') ==-1){
                var img = fs.readFileSync('./images/pts1.png');
                res.writeHead(200, {'Content-Type': 'image/png' });
                res.end(img, 'binary');
            }
        }
    }

    let ret;

    if(foundItem){
        ret= "Good news, file exists!";
    } else {
        ret= 'Either Target ID not found!';
    }

    // this sends back a JSON response which is an json object
    res.json(ret);

}
