import Vue from "vue";
import Vuex from "vuex";

import material from "./material"
import mint from "./mint"
import title from "./title"
import honorific from "./honorific"
import person from "./person"

Vue.use(Vuex)



const store = new Vuex.Store({
    mutations: {
        init(state, data) {
            if (state.type != "api") {
                for (let [i, val] of Object.entries(data)) {
                    state[i] = val
                }
            }
        }
    },
    state: {
        type: "api"
    },
    getters: {
        local: function (state) {
            return state.type == "local"
        }
    },
    modules: {
        material,
        mint,
        title,
        honorific,
        person
    }
})


export default store