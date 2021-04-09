export default class GraphQLUtils {

    /**
     * Takes an array and destructure the strings into a
     * GraphQLBody.
     * 
     * If an element is an object. It will be destructured 
     * recursively. The key being the parent key.
     * 
     */
    static buildQueryParams(properties) {
        let parts = []
        for (let val of properties.values()) {
            if (typeof val == "object") {
                for (let [key, childArr] of Object.entries(val)) {
                    if (Array.isArray(childArr)) {
                        parts.push(`${key}{${this.buildQueryParams(childArr)}}`)
                    } else {
                        console.error(`Cannot destructure ${key}, value is no array!`, val)
                    }
                }
            } else {
                parts.push(val)
            }
        }
        return parts.join(",")
    }
}