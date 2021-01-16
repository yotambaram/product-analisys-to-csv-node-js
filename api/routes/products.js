const fs = require("fs");
const axios = require("axios");
const csvParser = require("csv-parser");
const productRoutes = require("../../public/public-app");
const inquirer = require("inquirer");
var json2csv = require("json2csv");
const csv = require("csv-parser");

const queryBuilder = {
  build: () => {
    const params = [
      "index",
      "keywords",
      "color",
      "brand",
      "googleGbCategoryId",
      "amazonSearchIndex",
      "amazonCategoryId",
      "minPrice",
      "maxPrice",
      "currencyCode",
    ];
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter file path and name",
          name: "path",
        },
      ])
      .then(({ path }) => {

        let lineReader = require('readline').createInterface({
          input: require('fs').createReadStream('test1.csv')
        })
        
        lineReader.on('line', (line) => {
          // do regexs with line
        })

        inquirer
          .prompt([
            // {
            //     type: "list",
            //     choices: params,
            //     message: "Choose the roles department",
            //     name: params[1],
            // },
            // {
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
              {
                type: "input",
                message: `Enter your ${params[3]} colum name`,
                name: params[3],
              },
              {
                type: "input",
                message: `Enter your ${params[4]} colum name`,
                name: params[4],
              },
              {
                type: "input",
                message: `Enter your ${params[5]} colum name`,
                name: params[5],
              },
              {
                type: "input",
                message: `Enter your ${params[6]} colum name`,
                name: params[6],
              },
              {
                type: "input",
                message: `Enter your ${params[7]} colum name`,
                name: params[7],
              },
              {
                type: "input",
                message: `Enter your ${params[8]} colum name`,
                name: params[8],
              },
              {
                type: "input",
                message: `Enter your ${params[9]} colum name`,
                name: params[9],
              }             
          ])
          .then((result) => {
            console.log("^%$^&%^&%^&%^&%^&$^$^$%^$%####@", result);
        
       
            fs.createReadStream("test1.csv")
              .pipe(csv())
              .on("data", function (data) {
                try {
                  let currentKeywords = "$" + data[result["keywords"]];
                  let currentColor = data[result["color"]];
                  let currentBrand = data[result["brand"]];
                  let currentGoogleGbCategoryId = data[result["googleGbCategoryId"]];
                  let currentAmazonSearchIndex = data[result["amazonSearchIndex"]];
                  let currentAmazonCategoryId = data[result["amazonCategoryId"]];
                  let currentMinPrice = data[result["minPrice"]];
                  let currentMaxPrice = data[result["maxPrice"]];
                  let currentCurrencyCode = data[result["currencyCode"]];
                  console.log("DASDAS",currentKeywords,currentColor,currentBrand,currentGoogleGbCategoryId,currentAmazonSearchIndex, currentAmazonCategoryId,currentMinPrice,currentMaxPrice,currentCurrencyCode);
                  
                
           
                } catch (err) {
                  //error handler
                }
              })
              .on("end", function () {
                
                //some final operation
              });
            

            //Build query
            /////////////////
            const endPoint = "https://api.algopix.com/v3/multiItemsSearch?";
            const test1 =
              "https://api.algopix.com/v3/multiItemsSearch?" +
              "&" +
              result.keywords;
            console.log(test1);

            /////////////////
            const queryUrl = `https://api.algopix.com/v3/multiItemsSearch?&keywords=Flutter_False_Eyelashes&color=blue&brand=Sugarpill&googleGbCategoryId=Beauty&minPrice=0&maxPrice=100`;

            axios
              .get(queryUrl, {
                headers: {
                  //"X-APP-ID": process.env.API_ID;
                  "X-APP-ID": "4CFBnY7bP986OfTscg6Q57",
                  "X-API-KEY": "IGXRFhMcPzMxq4Ro0vMxuAbPY1wuTpcE8bOhYlNt",
                },
              })
              .then((dataRes) => {
                //console.log(process.env.ID)
                //if(JSON.stringify(dataRes.data.result.products))
                if (dataRes.data.statusCode > 299) {
                  throw err;
                } else {
                  let stringifyData = dataRes.data.result.products;

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
              });
          });
      });
  },
};

module.exports = queryBuilder;
