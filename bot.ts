import {Battlefield, ships, getRandomCoordinates} from './battlefield.js';

export class Bot {
    private battlefield: Battlefield;

    constructor(battlefield: Battlefield) {
        this.battlefield = battlefield;
    }

    placeShips = () => {
        ships.flat().forEach(ship => {
            this.placeShip(ship._size);
        })
    }


    private placeShip = (size: number) => {
        const coordinates = getRandomCoordinates();
        const isRotated = Math.random() >= 0.5;

        if (!this.battlefield.placeShip(coordinates, size, isRotated)) {
            this.placeShip(size);
        }
    }
}