const fs = require("fs");
const inquirer = require("inquirer");

const getPath = {
  getPath: () => {
    inquirer
      .prompt({
        message: "Enter file path and:",
        name: "path",
      },{
        message: "Enter file path and:",
        name: "test", 
      }
      )
      .then( ({ path }) => {
        console.log(path);
        
        return path//"test1.csv";
      });
  },
};

module.exports = getPath;
