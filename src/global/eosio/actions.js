import {Ual} from "../api/ual";

function transferAction(from, to, quantity, memo) {
    const data = {
        from,
        to,
        quantity,
        memo
    }
    return Ual.createAction("transfer","eosio.token",from,data)
}


export {transferAction}
