abstract class Ship {
    static _size: number;
    static _name: string;
}

class Battleship extends Ship {
    _size = 4;
    _name = 'Battleship';
}

class Cruiser extends Ship {
    _size = 3;
    _name = 'Cruiser';
}

class Destroyer extends Ship {
    _size = 2;
    _name = 'Destroyer';
}

class Submarine extends Ship {
    _size = 1;
    _name = 'Submarine';
}

export type Coordinates = [number, number];

export const getRandomCoordinates = (): Coordinates => {
    const randomVertical = Math.floor(Math.random() * 9);
    const randomY = Math.floor(Math.random() * 9);
    return [randomVertical, randomY];
}

export const ships = [
    [new Submarine(), new Submarine(), new Submarine(), new Submarine()],
    [new Destroyer(), new Destroyer(), new Destroyer()],
    [new Cruiser(), new Cruiser()],
    [new Battleship()]
]

export class Battlefield {
    public data: Array<Array<{taken: boolean; size?: number; isAttacked?: boolean}>>

    constructor() {
        const battlefield = [];
        for (let i = 0; i < 10; i++) {
            battlefield.push([]);
            for (let j = 0; j < 10; j++) {
                // @ts-ignore
                battlefield[i][j] = {taken: false}
            }
        }
        this.data = battlefield;
    }

    attack = (coordinates: Coordinates) => {
        const [vertical, horizontal] = coordinates;

        this.data[vertical][horizontal].isAttacked = true;
    }

    canPlaceShip = (coordinates: Coordinates, size: number, isRotated: boolean): boolean => {
        const [vertical, horizontal] = coordinates;

        if (isRotated) {
            for (let i = 0; i < size; i++) {
                const verticalWithOffset: number = vertical + i;
                const columnValue = this.data[verticalWithOffset]?.[horizontal];
                if (!columnValue || columnValue.taken) return false;
            }
        } else {
            for (let i = 0; i < size; i++) {
                const horizontalWithOffset: number = horizontal + i;
                const columnValue = this.data[vertical][horizontalWithOffset];
                if (!columnValue || columnValue.taken) return false;
            }
        }


        return true;
    }

    placeShip = (coordinates: Coordinates, size: number, isRotated: boolean, disallowNeighbours: boolean): boolean => {
        if (this.canPlaceShip(coordinates, size, isRotated, disallowNeighbours)) {
            const [vertical, horizontal] = coordinates;

                if (isRotated) {
                    for (let i = 0; i < size; i++) {
                        const verticalWithOffset: number = vertical + i;
                        const columnValue = this.data[verticalWithOffset][horizontal];
                        columnValue.taken = true;
                        columnValue.isAttacked = false;
                        columnValue.size = size;
                    }
                    return true;
                } else {
                    for (let i = 0; i < size; i++) {
                        const horizontalWithOffset: number = horizontal + i;
                        const columnValue = this.data[vertical][horizontalWithOffset];
                        columnValue.taken = true;
                        columnValue.isAttacked = false;
                        columnValue.size = size;
                    }
                    return true;
                }

        }
        return false;
    }
}

// canPlaceShip = (coordinates: Coordinates, size: number, isRotated: boolean, disallowNeighbours: boolean): boolean => {
//     const [vertical, horizontal] = coordinates;
//     if (disallowNeighbours) {
//         if (isRotated) {
//             const topBorderCenter = this.data[vertical - 1]?.[horizontal];
//             const topBorderLeft = this.data[vertical - 1]?.[horizontal - 1];
//             const topBorderRight = this.data[vertical - 1]?.[horizontal + 1];
//             const bottomBorderCenter = this.data[vertical + size]?.[horizontal];
//             const bottomBorderLeft = this.data[vertical + size]?.[horizontal - 1];
//             const bottomBorderRight = this.data[vertical + size]?.[horizontal + 1];
//             const sideBordersCheck = !topBorderCenter || !topBorderLeft || !topBorderRight || !bottomBorderCenter || !bottomBorderLeft || !bottomBorderRight;
//             for (let i = 0; i < size; i++) {
//                 const verticalWithOffset: number = vertical + i;
//                 const columnValue = this.data[verticalWithOffset]?.[horizontal];
//                 const leftNeighbourColumnValue = this.data[verticalWithOffset]?.[horizontal - 1];
//                 const rightNeighbourColumnValue = this.data[verticalWithOffset]?.[horizontal + 1];
//                 if (!columnValue || !leftNeighbourColumnValue || !rightNeighbourColumnValue || sideBordersCheck || columnValue.taken) return false;
//             }
//         } else {
//             const rightBorderCenter = this.data[vertical][horizontal - 1];
//             const rightBorderTop = this.data[vertical - 1]?.[horizontal - 1];
//             const rightBorderBottom = this.data[vertical + 1]?.[horizontal - 1];
//             const leftBorderCenter = this.data[vertical][horizontal + size]
//             const leftBorderTop = this.data[vertical - 1]?.[horizontal + size]
//             const leftBorderBottom = this.data[vertical + 1]?.[horizontal + size]
//             const sideBordersCheck = !rightBorderBottom || !rightBorderCenter || !rightBorderTop || !leftBorderBottom || !leftBorderCenter || !leftBorderTop
//             for (let i = 0; i < size; i++) {
//                 const horizontalWithOffset: number = horizontal + i;
//                 const columnValue = this.data[vertical][horizontalWithOffset];
//                 const upperNeighbourColumnValue = this.data[vertical - 1]?.[horizontalWithOffset];
//                 const lowerNeighbourColumnValue = this.data[vertical + 1]?.[horizontalWithOffset];
//                 if (!columnValue || !upperNeighbourColumnValue || !lowerNeighbourColumnValue || sideBordersCheck || columnValue.taken) return false;
//             }
//         }
//     } else {
//         if (isRotated) {
//             for (let i = 0; i < size; i++) {
//                 const verticalWithOffset: number = vertical + i;
//                 const columnValue = this.data[verticalWithOffset]?.[horizontal];
//                 if (!columnValue || columnValue.taken) return false;
//             }
//         } else {
//             for (let i = 0; i < size; i++) {
//                 const horizontalWithOffset: number = horizontal + i;
//                 const columnValue = this.data[vertical][horizontalWithOffset];
//                 if (!columnValue || columnValue.taken) return false;
//             }
//         }
//     }
