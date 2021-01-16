const fs = require("fs");
const axios = require("axios");
const csvParser = require("csv-parser");
const productRoutes = require("../../public/public-app");
const inquirer = require("inquirer");
var json2csv = require("json2csv");

const queryBuilder = {
    
    params: ["index", "keywords", "color", "brand", "googleGbCategoryId", "amazonSearchIndex", "amazonCategoryId", "minPrice", "maxPrice", "currencyCode"],

    build: () => {
       
        return new Promise((resolve, reject) => {
            
            resolve();
        }).then(() => {
            this.getFile
        })
        .then((path) => {
            this.getClientTitels;
        })
        .then(() => {
            this.validateTitels;
        })
        .then(() => {
            this.queryBuild
        }).then(() => {
            this.apiCall
        }).then(() => {
            this.dataHandle
        }).then(() => {
            this.handleRejectedAny
            console.log("fsdfsd")
        })
        return promise
        },
    
    
  getFile: () => {
    inquirer
    console.log("GETFILE")
      .prompt([
        {
          type: "input",
          message: "Enter file path and name",
          name: "path",
        },
      ])
      .then(({path}) => {  
        return path;  
    })
    return path;  
  },

  getClientTitels: (pathaaa) => {
      console.log("getClientTitels" + pathaaa)

        const inputTitels = []
       fs.createReadStream(path)
          .pipe(csvParser())
          .on('data', (data) => inputTitels.push(data))
          .on('end', () => {
              return inputTitels       
          })

  },

  validateTitels: (userTitels) => {
    inquirer
        .prompt([
            
            // {
            //     type: "list",
            //     choices: params,
            //     message: "Choose the roles department",
            //     name: params[1],
            // },
            // {
            //     type: "input",
            //     message: `Enter your ${params[1]} colum name`,
            //     name: params[1],
            //     validate: (answer) => {
            //       if (isNaN(answer)) {
            //         return "please enter a number";
            //       }
            //       return true;
            //     },
            //   },
              {
                type: "input",
                message: `Enter your ${params[1]} colum name`,
                name: params[1],
              },
              {
                type: "input",
                message: `Enter your ${params[2]} colum name`,
                name: params[2],
              },
            //   {
            //     type: "input",
            //     message: `Enter your ${params[3]} colum name`,
            //     name: params[3],
            //   },
            //   {
            //     type: "input",
            //     message: `Enter your ${params[4]} colum name`,
            //     name: params[4],
            //   },
            //   {
            //     type: "input",
            //     message: `Enter your ${params[5]} colum name`,
            //     name: params[5],
            //   },
            //   {
            //     type: "input",
            //     message: `Enter your ${params[6]} colum name`,
            //     name: params[6],
            //   },
            //   {
            //     type: "input",
            //     message: `Enter your ${params[7]} colum name`,
            //     name: params[7],
            //   },
        
        ])
      .then(({result}) => {  
        return result;  
    })
},
queryBuild: () => {
    const endPoint = "https://api.algopix.com/v3/multiItemsSearch?"
        const test1 = "https://api.algopix.com/v3/multiItemsSearch?" + "&" + result.keywords
        console.log(test1)

        /////////////////
        const queryUrl = `https://api.algopix.com/v3/multiItemsSearch?&keywords=Flutter_False_Eyelashes&color=blue&brand=Sugarpill&googleGbCategoryId=Beauty&minPrice=0&maxPrice=100`;
        return queryUrl
  },
  apiCall: (queryUrl) => {
    axios.get(queryUrl, {
      headers: {
        //"X-APP-ID": process.env.API_ID;
        "X-APP-ID": "4CFBnY7bP986OfTscg6Q57",
        "X-API-KEY": "IGXRFhMcPzMxq4Ro0vMxuAbPY1wuTpcE8bOhYlNt",
      },
    }).then(({data}) => {  
        return data;  
    })

  },
  dataHandle: (dataRes) => {
   
        //console.log(process.env.ID)
        //if(JSON.stringify(dataRes.data.result.products))
        if (dataRes.data.statusCode > 299) {
          throw err;
        } else {
          let stringifyData = dataRes.data.result.products;
          console.log(stringifyData);

          const { Parser } = json2csv;

          const fields = ["title", "matchingScores.titleMatchingScore"];

          const json2csvParser = new Parser({
            fields,
            defaultValue: "",
            includeEmptyRows: true,
          });

          const csv = json2csvParser.parse(stringifyData);
          const test = json2csvParser.parse(csv.image);
          fs.writeFile("data.csv", csv, function (err) {
            if (err) throw err;
            console.log("File Saved!");
          });

        }

  }
}




module.exports = queryBuilder;
