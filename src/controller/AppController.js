let Robot = require('../model/Robot')
const { LEFT, RIGHT, MOVE, EXIT, REPORT, HELP, PLACE } = require('../helper/constant')
const readline = require('readline');

module.exports = class AppController {

    constructor() {
        this.robot = new Robot()
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    ask() {
        return new Promise((resolve, reject) => {
            this.rl.question('Please Enter: ', (input) => resolve(input));
        });
    }

    getCommandAndArg(input) {
        let arg = ""
        let command = ""
        let inputArray = input.trim().toUpperCase().split(" ")
        command = inputArray[0].trim()
        if (input.substr(0, 5).toUpperCase() == PLACE) {
            arg = input.substr(6).toUpperCase()
        }
        return {
            command,
            arg
        }
    }

    //Show the help menu
    help() {
        return "The following command are valid, command are case insensitive: \n" +
            "LEFT - Turn Left\n" +
            "RIGHT - Turn Right\n" +
            "PLACE - Place the robot to any position of the table\n" +
            "MOVE - Move forward by one position\n" +
            "REPORT - Display the current position of the robot\n" +
            "HELP - Show the help menu\n" +
            "EXIT - Exit the application\n"
    }

    runApplication() {
        this.ask().then((result) => {
            const commandAndArg = this.getCommandAndArg(result)
            const command = commandAndArg.command
            const arg = commandAndArg.arg
            if ((command == LEFT || command == RIGHT || command == MOVE || command == REPORT) && !this.robot.isPositionPlaced()) {
                console.log("You have not placed the robot\n")
            } else {
                switch (command) {
                    case LEFT:
                        console.log("You are now facing " + this.robot.left() + '\n')
                        break
                    case RIGHT:
                        console.log("You are now facing " + this.robot.right() + '\n')
                        break
                    case MOVE:
                        if (this.robot.move()) {
                            console.log(this.robot.report() + '\n')
                        } else {
                            console.log("You cannot move at current position\n")
                        }
                        break
                    case PLACE:
                        let error = this.robot.place(arg)
                        if (error.length) {
                            console.log(error.toString() + '\n');
                        } else {
                            console.log(this.robot.report() + '\n')
                        }
                        break
                    case REPORT:
                        console.log(this.robot.report() + '\n')
                        break
                    case HELP:
                        console.log(this.help())
                        break
                    case EXIT:
                        console.log("You have exited the application\n")
                        this.rl.close()
                        break
                    default:
                        console.log("Invaid Command, please use HELP to view all the option\n")
                        break
                }
            }

            if (command != EXIT) {
                this.runApplication()
            }
        })
    }

}