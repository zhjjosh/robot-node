//Robot
const MAX_X = 5
const MAX_Y = 5
const NORTH = 'NORTH'
const EAST = 'EAST'
const SOUTH = 'SOUTH'
const WEST = 'WEST'
const FACE_ENUM = [
    NORTH,
    EAST,
    SOUTH,
    WEST
];

//Actions
const LEFT = 'LEFT'
const RIGHT = 'RIGHT'
const PLACE = 'PLACE'
const REPORT = 'REPORT'
const HELP = 'HELP'
const MOVE = 'MOVE'
const EXIT = 'EXIT'
const ACTIONS = [
    LEFT,
    RIGHT,
    PLACE,
    REPORT,
    HELP,
    MOVE,
    EXIT
]

module.exports = {
    MAX_X,
    MAX_Y,
    NORTH,
    EAST,
    SOUTH,
    WEST,
    FACE_ENUM,
    LEFT,
    RIGHT,
    PLACE,
    REPORT,
    HELP,
    MOVE,
    EXIT,
    ACTIONS
}