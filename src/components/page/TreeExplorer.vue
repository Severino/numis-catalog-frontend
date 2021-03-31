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
      
      <!-- <nav><TreeView :children="twigs.filter(twig => )" /></nav> -->
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
          console.log(children);
          if (!data || data.length == 0) {
            return [{ name: "KEINE EINTRÄGE!", key: this.twigId++ }];
          }

          return data.map((type) => {
            console.log(type);
            return {
              key: this.twigId++,
              name: type.projectId,
              leaf: "TypeLeaf",
              data: type,
            };
          });
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
};
</script>

<style lang="scss">
.tree-explorer > .tree-view > .tree-item::before {
  content: none;
}
</style>
