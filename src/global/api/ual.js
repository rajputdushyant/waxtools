class Ual {
    constructor(user) {
        this.activeUser = user
    }

    async performAction(actions) {
        const transaction = {
            actions: actions
        }
        return this.activeUser.signTransaction(transaction, {
            blocksBehind: 3,
            expireSeconds: 3600,
            broadcast: true,
            sign: true,
        })
    }

    async performActionWithErrHandling(actions) {
        return this.performAction(actions).then(succ => {
            alert("Stake Request Processed")
        }).catch(err => {
            alert("Error: " + err)
            throw err
        })
    }

    static createAction(actionName, contract, actor, data) {
        return {
            account: contract,
            name: actionName,
            authorization: [{
                actor: actor,
                permission: 'active',
            }],
            data: data
        }
    }
}

export { Ual };


