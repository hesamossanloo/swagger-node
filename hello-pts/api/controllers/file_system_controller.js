/*jshint esversion: 6 */
'use strict';
var util = require('util');

module.exports = {
    allFS: getAllFiles,
    dlSpToGrRq: requestToDownloadAFileFromSpacecraftToGround,
    cmdStatus: mockStatusOfCommand,
    stdTelePackages: mockTelePackages,
    relTelePackages: mockTelePackages
};

/*
    file vars
 */
var filesList = [];
var alina = [];
var alq1 = [];
var alq2 = [];

var statusCmdJson ={
   "tid": "1",
   "id": "1",
   "isComplete":  true
}
var telePackages ={
   "tid": "1",
   "packetcount":2,
   "packages":[
   {"id":1,
    "data":"data1",
    "timestamp":"01-01-2021-09:09:09:999"},
   {"id":2,
    "data":"data2",
    "timestamp":"01-01-2021-10:10:09:999"}
   ]
}
var file_1 = {
    "tid": "1",
    "size": "121b",
    "name": "test-file-1",
    "permissions": "admin,dev",
    "location": "GROUND"
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

function findByTIDandLocation(tid, location) {
    var spacecraftAllFiles = filesList[tid];
    if (spacecraftAllFiles === undefined) {
        return "Target ID not found!";
    }

    var retSpacecraftFilesBasedOnLocation = spacecraftAllFiles[location];
    if (retSpacecraftFilesBasedOnLocation === undefined) {
        return "Location not found!";
    }
    return retSpacecraftFilesBasedOnLocation;
}

/*
  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function getAllFiles(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var tid = req.swagger.params.tid.value || 'No tid provided';
    var location = req.swagger.params.location.value || 'No location provided';

    var retSpacecraftFilesBasedOnLocation = findByTIDandLocation(tid, location);

    // this sends back a JSON response which is an json object
    res.json(retSpacecraftFilesBasedOnLocation);
}

function requestToDownloadAFileFromSpacecraftToGround(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var tid = req.swagger.params.tid.value || 'No tid provided';
    var filename = req.swagger.params.filename.value || 'No filename provided';
    var location = req.swagger.params.location.value || 'No location provided';

    var spacecraftFilesBasedOnLocation = findByTIDandLocation(tid,location);

    var foundItem = false;

    if (spacecraftFilesBasedOnLocation.length !== undefined) {
        if(spacecraftFilesBasedOnLocation.find(x => x.name === filename)){
            foundItem = true;
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

function mockAJsonFile(req, res) {
    res.json(file_1);
}
function mockArrayOfJsonFiles(req, res) {
    res.json(alina["GROUND"]);
}
function mockStatusOfCommand(req, res) {
    res.json(statusCmdJson);
}
function mockTelePackages(req, res) {
    res.json(telePackages);
}
