#!/usr/bin/env node

var program = require('commander');
var createFile = require('create-file');
var promptly = require('promptly');
var chalk = require('chalk');
var fs = require('file-system');
var readJSON = require('read-json')

program
    .version('0.0.1')
    .command('generate <name> [dependencies...]')
    .alias('g')
    .description('\nGenerate an angular controller, you can pass all the dependencies you want to add to your controller \n'+chalk.bold.yellow('(Remember to add a \\ before characters as \$)'))
    .action(function() {
        fs.exists('rounded.json', (exists) => {
            if (exists) {
                var controllerName = arguments[0];
                var dependenciesInj = "";
                var dependencies = "";
                for (var dep in arguments[1]) {
                    dependencies += arguments[1][dep] + ", ";
                    dependenciesInj += "'" + arguments[1][dep] + "'" + ", ";
                }
                var depLength = dependencies.length;
                readJSON('rounded.json', function(error, manifest) {
                    var projName = manifest.projectName;
                    var path = manifest.pathToController;

                    if (depLength != 0) {
                        var controllerContent = "angular.module('" + projName + "').controller('" + controllerName + "', ['$scope', '$rootScope', " + dependenciesInj + " function($scope, $rootScope, " + dependencies + ") { \n\n\n}]);";
                    } else {
                        var controllerContent = "angular.module('" + projName + "').controller('" + controllerName + "', ['$scope', '$rootScope', function($scope, $rootScope) { \n\n\n}]);"
                    }

                    createFile(path + controllerName + ".js", controllerContent, function(err) {
                        console.log(chalk.bold.cyan('File created: ') + path + controllerName + ".js");
                    });
                });

            } else {
                console.log(chalk.bold.red('You need to init Rounded First'));
                console.log(chalk.bold.green("Starting Init"));
                var projectName = "";
                promptly.prompt('Insert project name: ').then(function(value) {
                    projectName = value;
                    var pathToController = "";
                    promptly.prompt('Where should I save the files? ').then(function(value) {
                        pathToController = value;
                        var ecosystemJson = '{"projectName" : "' + projectName + '","pathToController" : "' + pathToController + '"}';
                        createFile("rounded.json", ecosystemJson, function(err) {});
                    });
                });
            }
        });
    });


program.parse(process.argv);
