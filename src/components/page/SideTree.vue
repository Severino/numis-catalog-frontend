<template>
  <div class="tree-explorer">
    <h1>Side Explorer</h1>

    <div class="main">
      <nav>
        <h2>Typen Nach Personen</h2>
        <TreeView :children="twigs" @select="setData" />
      </nav>
      <div class="content">
        <TypeView :type="selected" />
      </div>
    </div>
  </div>
</template>

<script>
import Query from "../../database/query.js";
import TreeView from "../layout/TreeView.vue";
import TypeView from "./TypeView.vue";
import Tabs from "../layout/tabs/Tabs.vue";

export default {
  name: "SideTree",
  components: {
    TreeView,
    Tabs,
    TypeView,
  },
  created: async function () {
    let persons = await Query.raw(`{
      searchPersonsWithoutRole(text:""){
        name
        id
      }
    }`);

    persons = persons.data.data.searchPersonsWithoutRole;

    persons.forEach(({ id, name } = {}) => {
      const twig = {
        key: this.twigId++,
        name,
        collapsed: true,
        loadChildren: async () => {
          let children = await Query.raw(
            `{
                getTypesByOverlord(id:${id}){
                  id
                projectId
                treadwellId
                mint {
                  id,
                  name
                }
                mintAsOnCoin
                material {
                  id,
                  name
                }
                nominal {
                  id,
                  name
                }
                yearOfMinting
                donativ
                procedure
                issuers {
                  id
                  person {
                    id,
                    name,
                    role
                  }
                  titles {
                    id,
                    name
                  }
                  honorifics{
                    id,
                    name}
                }
                overlords {
                  id
                  rank
                  person {
                    id
                    name
                    role
                  }
                  titles {
                    id,
                    name
                  }
                  honorifics{
                    id,
                    name}
                }
                otherPersons {
                  id
                  name
                  role
                }
                caliph {
                  id
                  name
                  role
                }
                avers {
                  fieldText
                  innerInscript
                  intermediateInscript
                  outerInscript
                  misc
                }
                reverse {
                  fieldText
                  innerInscript
                  intermediateInscript
                  outerInscript
                  misc
                }
                cursiveScript
                literature
                pieces
                }
              }`
          );

          const data = children.data.data.getTypesByOverlord;

          if (!data || data.length == 0) {
            return [{ name: "KEINE EINTRÄGE!", key: this.twigId++ }];
          }

          let output = {};
          data.forEach((type) => {
            if (!output[type.yearOfMinting]) {
              output[type.yearOfMinting] = [];
            }

            output[type.yearOfMinting] = output[type.yearOfMinting]
              ? output[type.yearOfMinting]
              : {};

            console.log(type);
            const mint =
              type.mint && type.mint.name ? type.mint.name : "NO MINT";

            output[type.yearOfMinting][mint] = output[type.yearOfMinting][mint]
              ? output[type.yearOfMinting][mint]
              : {};

            output[type.yearOfMinting][mint][type.projectId] = type;
          });

          let that = this;
          function mapMints(mint) {
            return Object.entries(mint).map(([name, project]) => {
              return {
                name,
                collapsed: false,
                inline: true,
                key: that.twigId++,
                children: Object.entries(project).map(([name, data]) => {
                  return {
                    name,
                    preventCollapse: true,
                    collapsed: true,
                    leaf: "TypeLeaf",
                    data,
                  };
                }),
              };
            });
          }

          const mapped = Object.entries(output).map(([name, mint]) => {
            console.log(mapMints(mint));

            return {
              name,
              key: this.twigId++,
              collapsed: false,
              children: mapMints(mint),
            };
          });

          console.log(mapped);

          return mapped;

          // return data.map((type) => {
          //   return {
          //     key: this.twigId++,
          //     name: type.year,
          //     children: type.filter(type => type.year ==)
          //   };
          // });
        },
      };

      this.twigs.push(twig);
    });
  },
  data: function () {
    return {
      twigId: 0,
      twigs: [],
      selected: null,
    };
  },
  methods: {
    setData: function (data) {
      console.log("SETDATA: " + data);

      this.$data.selected = data;
    },
  },
};
</script>

<style scoped>
.tree-item.leaf {
  display: none !important;
}
</style>

<style lang="scss">
body {
  height: 100%;
}
.tree-explorer > .tree-view > .tree-item::before {
  content: none;
}

.main {
  display: flex;
  width: 100%;
  margin-top: 50px;
  position: relative;
}

nav {
  width: 420px;
  margin-right: 100px;
  max-height: 80vh;
  overflow: auto;
}
.content {
  flex: 1;
  width: 67%;
  min-height: 100px;
}

h1 {
  margin-top: 0;
}

.leafItem {
  box-sizing: border-box;
  border: 1px solid black;
  display: inline-block;

  header {
    background-color: whitesmoke;
  }
}
</style>
