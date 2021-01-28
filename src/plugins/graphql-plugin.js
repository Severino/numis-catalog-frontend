import axios from "axios";

class GraphQL {
    static install(Vue, options) {

        Vue.prototype.$request = function (obj) {
            axios.request()
        }
    }
}