'use strict';
var util = require('util');

module.exports = {
    allDL: getAllDownloadFiles,
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