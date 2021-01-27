const standard = require("./standard")

const honorific = {
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
                for (let honorific of Object.values(getters.list)) {
                    if (honorific.id == id) {
                        resolve(honorific)
                        break
                    }
                }
                reject("Could not get honorific.")
            })

        }, push({ commit }, honorific) {
            return new Promise(resolve => {
                commit("push", honorific)
                resolve(honorific)
            })
        },
        remove({ getters }, honorific) {
            return new Promise((resolve, reject) => {

                let id = getters.list.findIndex(el => el.id == honorific.id)
                if (id) {
                    const honorific = getters.list.splice(id, 1)
                    resolve({ id, honorific })
                } else {
                    reject("Mint could not be found.")
                }
            })
        }
    }
}

module.exports = honorific