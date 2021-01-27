const standard = require("./standard")

const person = {
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
                for (let person of Object.values(getters.list)) {
                    if (person.id == id) {
                        resolve(person)
                        break
                    }
                }
                reject("Could not get person.")
            })

        }, push({ commit }, person) {
            return new Promise(resolve => {
                commit("push", person)
                resolve(person)
            })
        },
        remove({ getters }, person) {
            return new Promise((resolve, reject) => {

                let id = getters.list.findIndex(el => el.id == person.id)
                if (id) {
                    const person = getters.list.splice(id, 1)
                    resolve({ id, person })
                } else {
                    reject("Mint could not be found.")
                }
            })
        }
    }
}

module.exports = person