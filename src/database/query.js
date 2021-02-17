import axios from "axios"
console.log(process.env)
const baseURL = process.env.VUE_APP_DATABASE_URL || "http://localhost:4000/graphql"
const host = baseURL

export default class Query {

    constructor(name) {
        this.name = name
    }

    get capitalizedName() {
        return this.name[0].toUpperCase() + this.name.substr(1)
    }

    get(id, properties) {

        let locationIndex = properties.indexOf("location")
        if (locationIndex != -1) {
            properties[locationIndex] = "location{lat,lon}"
        }

        const query = `
              {
                get${this.capitalizedName} (id:${id})  {
                    ${properties.join(",")}
                }
              }
            `

        console.log(query)
        return axios({
            url: host,
            method: "post",
            data: {
                query
            },
        })
    }

    static raw(query) {
        return new Query().raw(query)
    }

    raw(query) {
        return axios({
            url: host,
            method: "post",
            data: {
                query,
            },
        })
    }

    update(data) {

        if (data.id == -1) delete data.id

        let properties = ""
        for (let [key, val] of Object.entries(data)) {
            const fixedValue = typeof (val) == "string" ? `"${val}"` : Array.isArray(val) ? `[${val.join(",")}]` : val
            properties += key + ":" + fixedValue + ",\n"
        }
        properties = properties.slice(0, -2)

        let query
        if (!data.id) {
            query = `
            mutation {
              add${this.capitalizedName}(
                  data:{
                  ${properties}
                  }
              )
            }
          `;
        } else {
            query = `
            mutation {
              update${this.capitalizedName}(
                  data:{
                  ${properties}
                  }
              )
            }
          `;
        }

        return this.raw(query)
    }

    delete(id) {
        const query = `
        mutation {
          delete${this.capitalizedName}(
            id: ${id}
          )
        }
      `;

        return axios({
            url: host,
            method: "post",
            data: {
                query,
            },
        })
    }

    async list(properties) {
        const query = `{
          ${this.name} {
              ${properties.join(",")}
          }
        }
      `
        console.log(query)

        return axios({
            url: host,
            method: "post",
            data: {
                query
            },
        })
    }
}