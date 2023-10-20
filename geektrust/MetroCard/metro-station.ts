import { AgeGrp, StationEnum } from './enums';

export class MetroStation {
    station: StationEnum;
    totalSale: number;
    totalDiscount: number;
    passengerAgeCount: Record<AgeGrp, number> = {
        ADULT: 0,
        SENIOR_CITIZEN: 0,
        KID: 0
    };

    constructor(station: StationEnum) {
        this.station = station;
        this.totalSale = 0;
        this.totalDiscount = 0;
    }

    getStationSummary() {
        console.log(`TOTAL_COLLECTION ${this.station} ${this.totalSale} ${this.totalDiscount}`);
        console.log('PASSENGER_TYPE_SUMMARY');

        const passengerAgeCountArray = Object.entries(this.passengerAgeCount);
        const sortedPassengerCounts = passengerAgeCountArray.sort((ar1, ar2) => ar1[1] - ar2[1]);

        for (let arr of sortedPassengerCounts) {
            if (arr[1] > 0) console.log(`${arr[0]} ${arr[1]}`);
        }
    }

    putTravellerEntry(passengerAgeGrp: AgeGrp, fare: number, discount: number) {
        this.totalSale += fare;
        this.totalDiscount += discount;
        this.passengerAgeCount[passengerAgeGrp] += 1;
    }
}
