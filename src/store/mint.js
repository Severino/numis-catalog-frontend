const standard = require("./standard")

const mint = {
    namespaced: true,
    state: {
        data: []
    },
    getters: {
        list: function (state) {
            return state.data
        }
    },
    mutations: standard.mutations,
    actions: {

        get({ getters }, id) {
            return new Promise((resolve, reject) => {
                for (let mint of Object.values(getters.list)) {
                    if (mint.id == id) {
                        resolve(mint)
                        break
                    }
                }
                reject("Could not get mint.")
            })

        }, push({ commit }, mint) {
            return new Promise(resolve => {
                commit("push", mint)
                resolve(mint)
            })
        },
        remove({ getters }, mint) {
            return new Promise((resolve, reject) => {

                let id = getters.list.findIndex(el => el.id == mint.id)
                if (id) {
                    const mint = getters.list.splice(id, 1)
                    resolve({ id, mint })
                } else {
                    reject("Mint could not be found.")
                }
            })
        }
    }
}

module.exports = mint