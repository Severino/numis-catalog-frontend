const standard = {
    mutations: {
        init(state, data) {
            state.data = data
        },
        push(state, item) {
            if (item.id === -1) {
                let maxId = 0
                state.data.forEach(({ id }) => {
                    if (id >= maxId) maxId = id + 1
                })

                item.id = maxId
                state.data.push(item)
            } else {
                const id = state.data.findIndex(other => other.id === item.id)
                if (id == -1) {
                    state.data.push(item)
                } else {
                    state.data[id] = item
                }
            }

        }, remove(state, id) {
            let idx = state.data.findIndex(el => el.id == id)
            if (idx != -1) {
                state.data.splice(idx, 1)
            }
        }
    },
}

module.exports = standard