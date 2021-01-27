const standard = require("./standard")

const material = {
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
                for (let material of Object.values(getters.list)) {
                    if (material.id == id) {
                        resolve(material)
                        break
                    }
                }
                reject("Could not get material.")
            })

        }, push({ commit }, material) {
            return new Promise(resolve => {
                commit("push", material)
                resolve(material)
            })
        },
        remove({ getters }, material) {
            return new Promise((resolve, reject) => {

                let id = getters.list.findIndex(el => el.id == material.id)
                if (id) {
                    const material = getters.list.splice(id, 1)
                    resolve({ id, material })
                } else {
                    reject("Material could not be found.")
                }
            })
        },
        update({ getters }, material) {
            return new Promise((resolve, reject) => {
                const id = getters.list.findIndex(el => el.id)
                if (id != -1) {
                    getters.list[id] = material
                    resolve({ id, material })
                } else {
                    reject("Could not find material to update.")
                }
            })
        }
    }
} 

module.exports = material