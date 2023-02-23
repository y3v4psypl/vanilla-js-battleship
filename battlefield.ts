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

type Coordinates = [number, number];

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

const canPlaceShip = (coordinates: Coordinates, size: number, battlefield: Battlefield): boolean => {
    const [vertical, horizontal] = coordinates;

    for (let i = 0; i < size; i++) {
        const horizontalWithOffset: number = horizontal + i;
        const columnValue = battlefield[vertical][horizontalWithOffset];
        if (!columnValue || columnValue.taken) return false;
    }

    return true;
}

export const placeShip = (coordinates: Coordinates, size: number, battlefield: Battlefield): boolean => {
    if (canPlaceShip(coordinates, size, battlefield)) {
        const [vertical, horizontal] = coordinates;

        for (let i = 0; i < size; i++) {
            const horizontalWithOffset: number = horizontal + i;
            const columnValue = battlefield[vertical][horizontalWithOffset];

            columnValue.taken = true;
            columnValue.size = size;
        }

        return true;
    }
    return false;
}


export const initializeBattlefield = (): Battlefield =>

// new Array(10)
// .fill(undefined)
// .map(() => new Array(10)
//     .fill(undefined)
//     .map(() => ({taken: false})));

{
    const battlefield = [];
    for (let i = 0; i < 10; i++) {
        battlefield.push([]);
        for (let j = 0; j < 10; j++) {
            // @ts-ignore
            battlefield[i][j] = {taken: false}
        }
    }
    return battlefield;
}

export type Battlefield = Array<Array<{taken: boolean; size?: number}>>


