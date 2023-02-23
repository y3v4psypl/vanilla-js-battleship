import * as BF from './battlefield.js';

export class Bot {
    private battlefield: BF.Battlefield;

    constructor(battlefield: BF.Battlefield) {
        this.battlefield = battlefield;
    }
    placeShips = () => {
        BF.ships.flat().forEach(ship => {
            this.placeShip(ship._size);
        })
    }


    private placeShip = (size: number) => {
        const coordinates = BF.getRandomCoordinates();

        if (!BF.placeShip(coordinates, size, this.battlefield)) {
            this.placeShip(size);
        }
    }
}
