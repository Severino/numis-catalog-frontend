<template>
  <div class="tree-explorer">
    <h1>Explorer</h1>
    <main>
      <tabs :tabs="['avers', 'revers']" selected="avers">
        <template #tab-0>
          <h1>Hello world</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non
            obcaecati et maiores repellat veritatis in inventore totam, dicta
            porro eum! Earum perspiciatis odio, quod maxime hic amet quidem
            autem quas.
          </p>
        </template>
        <template #tab-1>
          <h1>Tab2</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non
            obcaecati et maiores repellat veritatis in inventore totam, dicta
            porro eum! Earum perspiciatis odio, quod maxime hic amet quidem
            autem quas.
          </p>
        </template>
      </tabs>

      <nav>
        <TreeView
          :children="twigs.filter((twig) => twig.name.match(/^Rukn/g))"
          @changed="treeviewchanged"
        />
      </nav>
      <div class="content"></div>
    </main>
  </div>
</template>

<script>
import Query from "../../database/query.js";
import TreeView from "../layout/TreeView.vue";
import Tabs from "../layout/tabs/Tabs.vue";

export default {
  components: {
    TreeView,
    Tabs,
  },
  created: async function() {
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
                key: that.twigId++,
                children: Object.entries(project).map(([name, data]) => {
                  return { name, collapsed: true, type: "TypeLeaf", data };
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
  data: function() {
    return {
      twigId: 0,
      twigs: [],
    };
  },
  methods: {
    treeviewchanged: function({ path = "", object = {} } = {}) {
      console.log(path);

      const parts = path.split("/");
      const root = parts.shift();
      // let target = this.twigs[root];

      let part = parts.shift();
      let target = this.twigs[part];
      console.log(target, part);

      while (parts.length > 1) {
        let part = parts.shift();
        console.log(parts, target.children)
        target = target.children[part];
        console.log(target, part);
      }

      console.log(object.collapsed, target);

      // console.log(target.collapsed);
      // this.twigs.splice(root, 1, this.twigs[root]);

      // this.twigs[+changed].splice(1,1,this.twigs[+changed])
    },
  },
};
</script>

<style lang="scss">
.tree-explorer > .tree-view > .tree-item::before {
  content: none;
}
</style>
