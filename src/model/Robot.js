const { FACE_ENUM, NORTH, EAST, SOUTH, WEST, MAX_X, MAX_Y } = require("../helper/constant")
const { getKeyByValue } = require("../helper/utils")

module.exports = class Robot {

    constructor(positionX = null, positionY = null, face = null) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.face = face;
    }

    //Display the current position of the robot
    report() {
        return this.positionX + "," + this.positionY + "," + this.face;
    }

    //Place the robot to any position of the table
    place(placeStr) {
        let error = this.validatePlaceStr(placeStr)
        if (!error.length) {
            let placeStrArray = placeStr.trim().split(',')
            this.positionX = placeStrArray[0].trim();
            this.positionY = placeStrArray[1].trim();
            this.face = placeStrArray[2].trim();
        }
        return error
    }

    //Turn Left
    left() {
        const directions = FACE_ENUM;
        let id = getKeyByValue(directions, this.face)
        if (parseInt(id)) {
            this.face = directions[--id]
        } else {
            this.face = directions[directions.length - 1]
        }
        return this.face;
    }

    //Turn Right
    right() {
        const directions = FACE_ENUM;
        let id = getKeyByValue(directions, this.face)
        if (parseInt(id) == directions.length - 1) {
            this.face = directions[0];
        } else {
            this.face = directions[++id];
        }
        return this.face;
    }

    //Move forward by one position
    move() {
        if (!this.isMoveValid()) {
            return false;
        }
        switch (this.face) {
            case NORTH:
                this.positionY++;
                break;
            case EAST:
                this.positionX++;
                break;
            case SOUTH:
                this.positionY--;
                break;
            case WEST:
                this.positionX--;
                break;
            default:
                break;
        }
        return true;
    }

    isMoveValid() {
        if (this.positionX == (MAX_X - 1) && this.face == EAST)
            return false;
        if (this.positionX == 0 && this.face == WEST)
            return false;
        if (this.positionY == (MAX_Y - 1) && this.face == NORTH)
            return false;
        if (this.positionY == 0 && this.face == SOUTH)
            return false;
        return true;
    }

    validatePlaceStr(placeStr) {
        let error = [];
        let placeStrArray = placeStr.trim().split(',')
        if (placeStrArray.length !== 3) {
            error.push("Invalid format of Place")
            return error;
        }
        let positionX = parseInt(placeStrArray[0].trim());
        let positionY = parseInt(placeStrArray[1].trim());
        let face = placeStrArray[2].trim().toUpperCase();

        if (!this.isPositionValValid(positionX, MAX_X)) {
            error.push("Invalid X Position")
        }

        if (!this.isPositionValValid(positionY, MAX_Y)) {
            error.push("Invalid Y Position")
        }

        if (!FACE_ENUM.includes(face)) {
            error.push("Invalid Face Value")
        }
        return error;
    }

    isPositionValValid(val, limit) {
        if (Number.isNaN(val)) return false

        if (!Number.isInteger(val)) return false

        if (val < 0 || val >= limit) return false

        return true
    }

    isPositionPlaced() {
        if (this.positionX == null || this.positionY == null || this.face == null)
            return false
        return true
    }
}