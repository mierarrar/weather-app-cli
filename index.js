var readlineSync = require('readline-sync');
const axios = require("axios");
const fs = require("fs");

function main() {
    console.log("-------------");
    console.log("1.Find Weather")
    console.log("0.Exit");
    console.log("-------------");
    
  }

main();

do {
    var option = readlineSync.questionInt("Enter Your Option: ");
    switch (option) {

            case 0:

                console.log("Bye!");
                break;

            case 1:
                
            var input = readlineSync.question('Enter City : ');
            let url = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=3e5c8320f42735df9ca22938ade28430&units=metric";

            axios
                .get(url)
                .then((res) => {

                     console.log('\n',"Temperature: ",res.data.main.temp, "°C", '\n',
                        "Feels Like: ", res.data.main.feels_like, "°C", '\n',
                        "Minimum Temperature: ", res.data.main.temp_min, "°C", '\n',
                        "Maximum Temperature: ", res.data.main.temp_max, "°C", '\n',
                        "Pressure: ", res.data.main.pressure, "MB", '\n',
                        "Humidity: ", res.data.main.humidity, "g.kg-1", '\n')

                    var data = JSON.stringify(res.data);

                    fs.writeFile("data.json", data, (err) => {
                        if (err) throw err;
                        fs.readFile("data.json", "utf-8",(err,data) => {
                            if (err) throw err;
                            fData = {
                                name : input,
                                weather : res.data.main
                            }
                            var fDataNew = JSON.stringify(fData);
                            fileName = input + "-" + res.data.dt
                            fs.writeFile(fileName +".json", fDataNew, (err) => {
                                if (err) throw err;
                                fs.appendFile("city.txt", fDataNew + " ", (err) => {
                                    if (err) throw err;
                                });
                            })
                        });
                    });
                })
                .catch((err) => {
                    console.error(err);
                });            
            //break;
            }
    if (option != 0) {
        break;
    }
} while (option === '0' || option === '1');

