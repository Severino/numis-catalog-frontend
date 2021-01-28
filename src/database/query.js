import axios from "axios"


export default class Query {

    constructor(name) {
        this.name = name
    }

    get(id, properties) {

        const query = `
              {
                ${this.name} (id:${id})  {
                    ${properties.join(",")}
                }
              }
            `

        console.log(query)
        return axios({
            url: "http://localhost:4000/graphql",
            method: "post",
            data: {
                query
            },
        })
    }

    update(data) {

        data.id = data.id || -1

        let properties = ""
        for (let [key, val] of Object.entries(data)) {

            const fixedValue = typeof (val) == "string" ? `"${val}"` : val

            properties += key + ":" + fixedValue + ",\n"
            console.log(key, fixedValue)
        }
        properties = properties.slice(0, -2)

        const query = `
        {
          update${this.name[0].toUpperCase() + this.name.slice(1)}(
              ${properties}
          ){id}
        }
      `;

        console.log(query)

        return axios({
            url: "http://localhost:4000/graphql",
            method: "post",
            data: {
                query,
            },
        })
    }

    delete(id) {
        const query = `
        {
          delete${this.name[0].toUpperCase() + this.name.slice(1)}(
            id: ${id}
          ){id}
        }
      `;

        return axios({
            url: "http://localhost:4000/graphql",
            method: "post",
            data: {
                query,
            },
        })
    }

    async list(properties) {

        return axios({
            url: "http://localhost:4000/graphql",
            method: "post",
            data: {
                query: `
                {
                  ${this.name} {
                      ${properties.join(",")}
                  }
                }
              `,
            },
        })
    }
}