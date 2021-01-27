const standard = require("./standard")

const title = {
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
                for (let title of Object.values(getters.list)) {
                    if (title.id == id) {
                        resolve(title)
                        break
                    }
                }
                reject("Could not get title.")
            })

        }, push({ commit }, title) {
            return new Promise(resolve => {
                commit("push", title)
                resolve(title)
            })
        },
        remove({ getters }, title) {
            return new Promise((resolve, reject) => {

                let id = getters.list.findIndex(el => el.id == title.id)
                if (id) {
                    const title = getters.list.splice(id, 1)
                    resolve({ id, title })
                } else {
                    reject("Mint could not be found.")
                }
            })
        }
    }
}

module.exports = title