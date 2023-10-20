import { MetroCard } from './metro-card';
import { Action, AgeGrp, StationEnum } from './enums';
import { MetroStation } from './metro-station';

export class MetroSystem {
    stations: Record<StationEnum, MetroStation>;
    cards: Record<string, MetroCard>;

    constructor() {
        this.cards = {};
        this.stations = {
            CENTRAL: new MetroStation(StationEnum.CENTRAL),
            AIRPORT: new MetroStation(StationEnum.AIRPORT)
        };
    }

    actionHandler(_line: string) {
        const line = _line.split(' ');

        if (line[0] === Action.BALANCE) this.loadCardBalance(line[1], parseInt(line[2]));
        //
        else if (line[0] === Action.CHECK_IN) this.metroCheckIn(line[1], line[2] as AgeGrp, line[3] as StationEnum);
        //
        else if (line[0] === Action.PRINT_SUMMARY) {
            this.stations.CENTRAL.getStationSummary();
            this.stations.AIRPORT.getStationSummary();
        }
    }

    loadCardBalance(cardId: string, amount: number) {
        if (this.cards.hasOwnProperty(cardId)) this.cards[cardId].balance += amount;
        else this.cards[cardId] = new MetroCard(cardId, amount);
    }

    metroCheckIn(cardId: string, ageGrp: AgeGrp, station: StationEnum) {
        if (!this.cards.hasOwnProperty(cardId))
            throw new Error(`[InvalidAction] Metro Checkin not possible: can\'t identify the given card (${cardId})`);

        //
        const card = this.cards[cardId];
        let { totalFare, discount } = card.getTripFare(ageGrp);
        totalFare = card.setWalletBalance(totalFare);

        this.stations[station].putTravellerEntry(ageGrp, totalFare, discount);

        return { totalFare, discount };
    }
}
