    import {ACCOUNT_NAME, RENEW_LABEL, RENTAL_LABEL} from "../constant";
import {WaxApi} from "../api/wax-api";
import {transferAction} from "../eosio/actions";
import {Ual} from "../api/ual";
    import {batchedArray} from "../helpers/array";
    import {sleep} from "../helper";


class Rental {
    constructor(ual, updateSub, referral = ACCOUNT_NAME) {
        this.waxApi = new WaxApi()
        this.referral = referral
        this.updateSub = updateSub
        console.log("rental service was called")
        console.log(':: ual ', ual)
        if(ual && ual?.activeUser!==null) {
            console.log(':: ual 2', ual)
            this.activeUser = ual.activeUser
            this.walletName = ual.activeUser.accountName
            this.ual = new Ual(ual.activeUser)
        } else {
            Error("User is null")
        }
    }


    //static functions
    static rentalCharges(stake, days, rate, isRenewal, discountFactor = 100) {
        console.log(':: stake, days, rate, isRenewal ', stake, days, rate, isRenewal)
        let baseCost = stake * days * rate
        if(isRenewal) {
            //applied 5% discount
            baseCost *= 0.9502
        }
        // } else if (days < 3) {
        //     //20% extra if less than 3 days
        //     baseCost *= 1.00
        // }
        return baseCost * (parseFloat(discountFactor.toString()))/100.00
    }


    async rate() {
        try {
            const rateData = await this.waxApi.contractData(ACCOUNT_NAME, ACCOUNT_NAME, "configs")
            return Number(rateData.rows[0].rate)
        } catch (err) {
            throw Error("Failed to get pricing")
        }
    }

    async subscriberData(wallet) {
        try {
            const subscriberResponse = await this.waxApi.contractData(ACCOUNT_NAME,ACCOUNT_NAME,"subscribers", wallet, wallet)
            if (subscriberResponse.rows.length>0) {
                const subscriber = subscriberResponse.rows[0]
                return {
                    account: subscriber.account,
                    stake: Number(subscriber.stake?.split(" ")[0]),
                    renewal: subscriber.renewal * 1000
                }
            } else {
                return null
            }
        } catch (e) {
            throw e
        }
    }

    async subscriberDataForAdvanceMode() {
        try {
            const subscriberResponse = await this.waxApi.contractData(ACCOUNT_NAME, ACCOUNT_NAME, "subscribers", "", "", 1, 10000)
            return subscriberResponse.rows.map(subscriber => {
                return  {
                    account: subscriber.account,
                    stake: Number(subscriber.stake?.split(" ")[0]),
                    renewal: subscriber.renewal * 1000,
                    stakeEdited: false,
                    renewalEdited: false
                }
            })
        } catch (e) {
            throw e
        }
    }

    async vipDiscount() {
        try {
            const vipData = await this.waxApi.contractData(ACCOUNT_NAME,ACCOUNT_NAME,"vips", this.walletName, this.walletName)
            if (vipData.rows.length>0) {
                return vipData.rows[0]?.discount
            } else {
                return 100
            }
        } catch (e) {
            throw e
        }
    }

    async investorData() {
        try {
            const investorData = await this.waxApi.contractData(ACCOUNT_NAME,ACCOUNT_NAME,"investors", this.walletName, this.walletName)
            if (investorData.rows.length>0) {
                return investorData.rows[0]
            } else {
                return null
            }
        } catch (e) {
            throw e
        }
    }


    rentalMemo(label, wallet, days) {
        return label+ "-" + this.referral + ":" + wallet + (days?(","+days):"")
    }

    rentalAction(price,memo) {
        return transferAction(this.walletName,ACCOUNT_NAME, price.toFixed(8) + " WAX", memo)
    }

    rentalTransaction(wallet, stake, days, rate, label, discountFactor=100) {
        const price = Rental.rentalCharges(stake, days, rate, label===RENEW_LABEL ,discountFactor)
        const memo = (label===RENTAL_LABEL)? this.rentalMemo(label, wallet, days) : this.rentalMemo(label,wallet)
        const action = this.rentalAction(price, memo)
        console.log(this.ual)
        this.ual.performAction([action]).then(succ => {
            alert("Success")
            this.updateSub()
        }).catch(e => {
            alert(e)
        })
    }

    async batchedTransactions(actions,batchSize=50) {
        const actionBatches = batchedArray(actions,batchSize)
        for (const actionSet of actionBatches) {
            try {
                await this.ual.performAction(actions);
                await sleep(5);
            } catch (error) {
                alert(error)
                break
            }
        }
    }








}

export {Rental}