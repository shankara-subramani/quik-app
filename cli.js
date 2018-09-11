#! /usr/bin/env node

'use strict';
var inquirer = require('inquirer');
var exec = require('child_process').exec;
const chalk = require('chalk');
const log = console.log;

console.log('Hello 👋🏻');

var questions = [
  {
    type: 'input',
    name: 'projName',
    message: 'Name of the project?',
  },
  {
    type: 'input',
    name: 'projDir',
    message: 'Where do you want me to install?',
  },
  {
    type: 'confirm',
    name: 'uiLibraries',
    message: 'Do you want to install any ui libraries?',
    default: false
  },
  {
    type: 'list',
    name: 'size',
    message: 'Which one do you need?',
    choices: ['element-react', 'antd'],
    when: function(answers) {
      return answers.uiLibraries !== false;
    }
  },
  {
    type: 'confirm',
    name: 'axios',
    message: 'Want axios to be installed?',
    default: false
  },
  {
    type: 'confirm',
    name: 'reactRouter',
    message: 'Want react-router to be installed?',
    default: false
  },
  {
    type: 'confirm',
    name: 'lodash',
    message: 'Want lodash to be installed?',
    default: false
  },
  {
    type: 'confirm',
    name: 'reactBootstrapTable',
    message: 'Want react-bootstrap-table to be installed?',
    default: false
  },
];

inquirer.prompt(questions).then(answers => {
let arr = ['npm install', 'react', 'react-dom']
  if (answers.uiLibraries) arr.push(answers.size);
  if (answers.axios) arr.push('axios');
  if (answers.reactRouter) arr.push('react-router');
  if (answers.lodash) arr.push('lodash');
  if (answers.reactBootstrapTable) arr.push('react-bootstrap-table');
  let dependencies = arr.join(' ')
  log(chalk.gray(`Creating project folder and installing dependencies`));
  exec(`cd ${answers.projDir} && mkdir ${answers.projName} && cd ${answers.projName} && npm init --y && ${dependencies}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    log(chalk.green("All done ⚡️"));
  });

});
