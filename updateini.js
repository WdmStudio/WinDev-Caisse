const loadIniFIle = require('read-ini-file');
const writeIniFile = require('write-ini-file');
const path = require('path');
const inquirer = require('inquirer');
const math = require('mathjs');
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

if (process.argv.length < 3) {
    console.error("Need file argument");

    process.exit();
}

let disposition = loadIniFIle.sync(process.argv[2]);

const allFields = Object.keys(disposition[Object.keys(disposition)[0]]).filter((fieldName)=>{
    return Object.values(disposition).every((val)=>{
        return val[fieldName] !== undefined
    });
});

async function init() {
    while (true) 
    {
        const answer = await inquirer.prompt({
            type: "autocomplete",
            name: "entity",
            message: "Search for a field to update",
            source: (answer, input) => {
                if (input === undefined) {
                    return ["exit", ...allFields];
                }
                input = input.split(' ').filter(i => i.trim().length > 0);
                return ["exit", ...allFields].filter((value) => {
                    return input.some((i) => value.replace(/\s+/g, '').toLowerCase().includes(i.toLowerCase()));
                });
            }
        });
        if (answer.entity === "exit") {
            break;
        }
        const operation = await inquirer.prompt({
            type: "input",
            name: "eval",
            message: "Utiliser X pour spécifier la valeur présente dans le fichier et effectué les opérations basiques que vous souhaitez (+, -, *, /)"
        });
        try
        {
            console.log(operation)
            Object.keys(disposition).forEach((dispKey)=>{
                const x = parseInt(disposition[dispKey][answer.entity]);
                const val = math.evaluate(operation.eval.replace(/[xX]/g, x));
                disposition[dispKey][answer.entity] = val;
            });
        }
        catch (e)
        {
            console.error(e);
        }
    }
    
    await writeIniFile(process.argv[2], disposition).then((val)=>{
        console.log("Done");
    });
}

init();