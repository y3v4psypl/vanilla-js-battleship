import {ships, initializeBattlefield, Battlefield, getRandomCoordinates} from './battlefield.js';
import {Bot} from './bot.js';

const enemyBattlefield = initializeBattlefield();

const gameboardId = 'gameboard';
const enemyGameboardId = 'enemyGameboard';

const bot = new Bot(enemyBattlefield);

bot.placeShips();
console.log(enemyBattlefield);

const gameboard = document.getElementById('gameboard');
const enemyGameboard = document.getElementById('enemyGameboard');

let shipSize: number;
let fourCellShipsLeft = 1;
let threeCellShipsLeft = 2;
let twoCellShipsLeft = 3;
let oneCellShipsLeft = 4;
let isRotated: boolean = false;

const chooseShip = (amount: number) => {
    shipSize = amount;
}

const rotateShips = () => {
    const tablesDiv = document.getElementById('choose-ship');
    const tables = [...tablesDiv?.children as HTMLCollectionOf<HTMLElement>];
    isRotated = !isRotated;

    if (tablesDiv !== null) {
        isRotated ? tables.forEach(el => el.style.transform = 'rotate(90deg)')  : tables.forEach(el => el.style.transform = 'rotate(0deg)');
    }

}

const rotateShipsButton = document.getElementById('rotate-ships-button');
rotateShipsButton?.addEventListener('click', rotateShips);

const oneCellShipIcon = document.getElementById('one-cell-ship-icon');
oneCellShipIcon?.addEventListener('click', () => chooseShip(1))

const twoCellShipIcon = document.getElementById('two-cell-ship-icon');
twoCellShipIcon?.addEventListener('click', () => chooseShip(2))

const threeCellShipIcon = document.getElementById('three-cell-ship-icon');
threeCellShipIcon?.addEventListener('click', () => chooseShip(3))

const fourCellShipIcon = document.getElementById('four-cell-ship-icon');
fourCellShipIcon?.addEventListener('click', () => chooseShip(4))

const renderShip = (target: HTMLElement, size: number, boardId: string) => {
    const cells = findCells(Number(target.dataset.x), Number(target.dataset.y), size, boardId);
    if (cells.some(cell => {
        if (cell === null || cell.dataset.taken === '1') {
            return true
        }
    })) {
        return false;
    }

    cells.forEach(cell => {
        if (cell) {

            switch (size) {
                case 1:
                    cell.className = 'one-cell-ship-part';
                    break;
                case 2:
                    cell.className = 'two-cell-ship-part';
                    break;
                case 3:
                    cell.className = 'three-cell-ship-part';
                    break;
                case 4:
                    cell.className = 'four-cell-ship-part';
                    break;
            }
            cell.dataset.taken = '1';
        }
    });
    return true;
}

const placeShip = (event: Event) => {
    switch (shipSize) {
        case 1:
            if (oneCellShipsLeft === 0 ) {
                return;
            }
            break;
        case 2:
            if (twoCellShipsLeft === 0) {
                return;
            }
            break;
        case 3:
            if (threeCellShipsLeft === 0) {
                return;
            }
            break;
        case 4:
            if (fourCellShipsLeft === 0) {
                return;
            }
            break;
    }


    const target = event?.target as HTMLElement;
    renderShip(target, shipSize, gameboardId);

    switch (shipSize) {
        case 1:
            oneCellShipsLeft--;
            if (oneCellShipsLeft === 0) {
                const oneCellShipIcon = document.getElementById('one-cell-ship-icon');
                if (oneCellShipIcon) oneCellShipIcon.style.display = 'none';
            }
            break;
        case 2:
            twoCellShipsLeft--;
            if (twoCellShipsLeft === 0) {
                const twoCellShipIcon = document.getElementById('two-cell-ship-icon');
                if (twoCellShipIcon) twoCellShipIcon.style.display = 'none';
            }
            break;
        case 3:
            threeCellShipsLeft--;
            if (threeCellShipsLeft === 0) {
                const threeCellShipIcon = document.getElementById('three-cell-ship-icon');
                if (threeCellShipIcon) threeCellShipIcon.style.display = 'none';
            }
            break;
        case 4:
            fourCellShipsLeft--;
            if (fourCellShipsLeft === 0) {
                const fourCellShipIcon = document.getElementById('four-cell-ship-icon');
                if (fourCellShipIcon) fourCellShipIcon.style.display = 'none';
            }
            break;
    }
    shipSize = 0;
}

const showShipPreview = (event: Event) => {
    const target = event?.target as HTMLElement;
    findCells(Number(target.dataset.x), Number(target.dataset.y), shipSize, gameboardId).forEach(cell => {
        const excludedClasses = ['one-cell-ship-part', 'two-cell-ship-part', 'three-cell-ship-part', 'four-cell-ship-part'];

        if (cell && ![...cell.classList].some(className => excludedClasses.includes(className))) {

            cell.className = 'ship-part-preview';
        }
    });
};

const findCells = (x: number, y: number, amount = shipSize, boardId: string) => {
    const cellArray = [];

    if (isRotated) {
        for (let i = 0; i < amount; i++) {
            const yWithOffset: number = y + i;
            cellArray.push(document.querySelector(`#${boardId} [data-x="${x}"][data-y="${yWithOffset}"]`));
        }
    } else {
        for (let i = 0; i < amount; i++) {
            const xWithOffset: number = x + i;
            cellArray.push(document.querySelector(`#${boardId} [data-x="${xWithOffset}"][data-y="${y}"]`));
        }
    }

    return cellArray;
}

const clearShipPreview = (event: Event) => {
    const target = event?.target as HTMLElement;
    findCells(Number(target.dataset.x), Number(target.dataset.y), shipSize, gameboardId).forEach(cell => {
        if (cell && cell.classList.contains('ship-part-preview')) {
            cell.removeAttribute('class');
        }
    });
};

const configureCell = () => {
    const td = document.createElement('td');
    td.addEventListener('mouseenter', showShipPreview);
    td.addEventListener('mouseleave', clearShipPreview);
    td.addEventListener('click', placeShip);
    return td;
}

const renderTable = (container: HTMLElement | null, cellConfigurator: CellConfigurator) => {
    for (let i = 0; i < 10; i++) {
        const tr = document.createElement('tr');
        container?.appendChild(tr);
        const th = document.createElement('th');
        tr.appendChild(th);
        th.innerText = String(i + 1);
        for (let j = 0; j < 10; j++) {
            const td = cellConfigurator();
            tr.appendChild(td);
            td.dataset.x = String(j + 1);
            td.dataset.y = String(i + 1);
            td.dataset.taken = "0";
        }
    }
}

const renderTable2 = (battlefield: Battlefield, container: HTMLElement | null, cellConfigurator: CellConfigurator) => {
    battlefield.forEach((row, i) => {
        const tr = document.createElement('tr');
        container?.appendChild(tr);
        const th = document.createElement('th');
        tr.appendChild(th);
        th.innerText = String(i + 1);
        row.forEach((column, j) => {
            const td = cellConfigurator();
            tr.appendChild(td);
            td.dataset.x = String(j + 1);
            td.dataset.y = String(i + 1);
            switch (column.size) {
                case 1:
                    td.className = 'one-cell-ship-part';
                    break;
                case 2:
                    td.className = 'two-cell-ship-part';
                    break;
                case 3:
                    td.className = 'three-cell-ship-part';
                    break;
                case 4:
                    td.className = 'four-cell-ship-part';
                    break;
            }
        })
    })
}

renderTable(gameboard, configureCell);
renderTable2(enemyBattlefield, enemyGameboard, () => document.createElement('td'));


type CellConfigurator = () => HTMLTableCellElement;


// добавить боту рандомный переворот корабль и рандомную возможность отступов
// codewars: убить хардкод
