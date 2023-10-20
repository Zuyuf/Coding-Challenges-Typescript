import { AgeGrp } from './enums';

export class MetroCard {
    cardId: string;
    balance: number;
    singleTripStatus: boolean;

    fareTab: Record<AgeGrp, number> = {
        ADULT: 200,
        SENIOR_CITIZEN: 100,
        KID: 50
    };

    constructor(cardId: string, balance: number) {
        this.cardId = cardId;
        this.balance = balance;
        this.singleTripStatus = false;
    }

    getTripFare(ageGrp: AgeGrp) {
        let discount,
            totalFare = 0;

        totalFare = this.singleTripStatus ? 0.5 * this.fareTab[ageGrp] : this.fareTab[ageGrp];
        discount = this.singleTripStatus ? totalFare : 0;

        return { totalFare, discount };
    }

    setWalletBalance(totalFare: number) {
        const fee = 0.02;
        let newBalance = this.balance - totalFare;

        if (newBalance < 0) {
            totalFare = totalFare - fee * newBalance;
            newBalance = 0;
        }

        this.balance = newBalance;
        this.singleTripStatus = !this.singleTripStatus;

        return totalFare;
    }
}
