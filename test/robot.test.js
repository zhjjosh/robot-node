let Robot = require('../src/model/Robot')
const { NORTH, EAST, SOUTH, WEST, FACE_ENUM, MAX_X, MAX_Y } = require("../src/helper/constant")

let robot = new Robot()

test('if isPositionPlaced return false when the position is not placed', () => {
    expect(robot.isPositionPlaced()).toBe(false)
})

test('if isPositionPlaced return true after the position is placed', () => {
    robot.place('0,0,' + NORTH)
    expect(robot.isPositionPlaced()).toBe(true)
})


test('if left function is working', () => {
    expect(robot.left()).toBe(WEST)
    expect(robot.left()).toBe(SOUTH)
    expect(robot.left()).toBe(EAST)
    expect(robot.left()).toBe(NORTH)
})

test('if right function is working', () => {
    expect(robot.right()).toBe(EAST)
    expect(robot.right()).toBe(SOUTH)
    expect(robot.right()).toBe(WEST)
    expect(robot.right()).toBe(NORTH)
})

test('if isMoveValid function is working', () => {
    let xInt = 0
    while (xInt < MAX_X) {
        let yInt = 0
        while (yInt < MAX_Y) {
            robot.place(xInt + ',' + yInt + ',' + NORTH)
            expect(robot.isMoveValid()).toBe(yInt !== MAX_Y - 1)
            robot.place(xInt + ',' + yInt + ',' + EAST)
            expect(robot.isMoveValid()).toBe(xInt !== MAX_X - 1)
            robot.place(xInt + ',' + yInt + ',' + SOUTH)
            expect(robot.isMoveValid()).toBe(yInt !== 0)
            robot.place(xInt + ',' + yInt + ',' + WEST)
            expect(robot.isMoveValid()).toBe(xInt !== 0)
            yInt++
        }
        xInt++;
    }
})

test('if isPositionValValid function return true for valid value', () => {
    let int = 0
    while (int < MAX_X) {
        expect(robot.isPositionValValid(int, MAX_X)).toBe(true)
        int++;
    }

    int = 0
    while (int < MAX_Y) {
        expect(robot.isPositionValValid(int, MAX_Y)).toBe(true)
        int++;
    }
})

test('if isPositionValValid function return false for invalid value', () => {

    let positionVals = [
        '-1', 'dkjdk', MAX_X, MAX_X + 1, '1.1', -1, 3.98
    ];
    positionVals.forEach(positionVal => {
        expect(robot.isPositionValValid(positionVal, MAX_X)).toBe(false)
    })

})

test('if place function can accept valid place string', () => {

    let placeStrings = [
        "1,1,SOUTH",
        "0,3,North ",
        " 1, 2 ,WeSt ",
    ]
    placeStrings.forEach(placeString => {
        expect(robot.place(placeString)).toEqual([])
    })

})

test('if place function can reject invalid place string', () => {
    let placeStrings = [
        'askdhkajsh',
        "-1,1,SOUTH",
        "0,-1,North ",
        " 1, 2 ,sdkasdl ",
        "-1,-1,SOUTH",
        "-1,1,SOUasdTH",
        "1,-1,asdkjsa",
        "-1,-1,asdkhsadjksahd",
    ];

    expect(robot.place(placeStrings[0])).toEqual(["Invalid format of Place"])
    expect(robot.place(placeStrings[1])).toEqual(["Invalid X Position"])
    expect(robot.place(placeStrings[2])).toEqual(["Invalid Y Position"])
    expect(robot.place(placeStrings[3])).toEqual(["Invalid Face Value"])
    expect(robot.place(placeStrings[4])).toEqual(["Invalid X Position", "Invalid Y Position"])
    expect(robot.place(placeStrings[5])).toEqual(["Invalid X Position", "Invalid Face Value"])
    expect(robot.place(placeStrings[6])).toEqual(["Invalid Y Position", "Invalid Face Value"])
    expect(robot.place(placeStrings[7])).toEqual(["Invalid X Position", "Invalid Y Position", "Invalid Face Value"])
})