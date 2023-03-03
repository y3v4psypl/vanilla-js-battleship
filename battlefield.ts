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
    public data: Array<Array<{taken: boolean; size?: number}>>

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

    canPlaceShip = (coordinates: Coordinates, size: number, isRotated: boolean, disallowNeighbours: boolean): boolean => {
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

    placeShip = (coordinates: Coordinates, size: number, isRotated: boolean): boolean => {
        if (this.canPlaceShip(coordinates, size, isRotated)) {
            const [vertical, horizontal] = coordinates;

            if (isRotated) {
                for (let i = 0; i < size; i++) {
                    const verticalWithOffset: number = vertical + i;
                    const columnValue = this.data[verticalWithOffset][horizontal];

                    columnValue.taken = true;
                    columnValue.size = size;
                }

                return true;
            } else {
                for (let i = 0; i < size; i++) {
                    const horizontalWithOffset: number = horizontal + i;
                    const columnValue = this.data[vertical][horizontalWithOffset];

                    columnValue.taken = true;
                    columnValue.size = size;
                }

                return true;
            }


        }
        return false;
    }
}

