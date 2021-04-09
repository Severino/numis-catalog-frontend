<template>
  <div :class="`overview type-page`">
    <BackHeader />
    <h1>{{ $t("attribute.test") }}</h1>

    <div
      class="button"
      @click="create"
      tabindex="1"
      autofocus
      @keydown.enter="create"
    >
      <PlusCircleOutline />
      <span>{{ $t("form.create") }}</span>
    </div>

    <ListFilterContainer :filtered="isListFiltered">
      <SearchField v-model="textFilter" />
      <ButtonGroup
        id="completeFilterButtonGroup"
        v-model="completeFilter"
        :labels="['work', 'completed', 'none']"
        :options="['work', 'completed', 'none']"
      />
    </ListFilterContainer>

    <List
      :error="error"
      :items="list"
      :filteredItems="filteredList"
      :loading="loading"
    >
      <ListItem
        v-for="item of filteredList"
        v-bind:key="item.key"
        @click="edit(item.id)"
        :class="item.completed ? 'completed' : 'incomplete'"
      >
        <ListItemIdField :value="item.id" />
        <ListItemCell>
          {{ item.projectId }}
        </ListItemCell>
        <CompletedToggle
          :value="item.completed"
          @input="changeCompleteState($event, item)"
        />
        <!-- <DynamicDeleteButton @click="remove(item.id)" /> -->
      </ListItem>
    </List>
  </div>
</template>

<script>
import PlusCircleOutline from "vue-material-design-icons/PlusCircleOutline";
import List from "../layout/List.vue";
import Query from "../../database/query.js";
import BackHeader from "../layout/BackHeader.vue";
import SearchField from "../forms/SearchField.vue";
import ListItem from "../layout/ListItem.vue";
import CompletedToggle from "../layout/buttons/CompletedToggle.vue";
import DynamicDeleteButton from "../layout/DynamicDeleteButton.vue";
import ListItemIdField from "../layout/list/ListItemIdField.vue";
import ListItemCell from "../layout/list/ListItemCell.vue";
import ListFilterContainer from "../layout/list/ListFilterContainer.vue";
import ButtonGroup from "../forms/ButtonGroup.vue";
import AxiosHelper from "@/utils/AxiosHelper.js";
import SearchUtils from "@/utils/SearchUtils.js";

export default {
  name: "TypeOverviewPage",
  components: {
    PlusCircleOutline,
    List,
    BackHeader,
    SearchField,
    ListItem,
    CompletedToggle,
    DynamicDeleteButton,
    ListItemIdField,
    ListItemCell,
    ListFilterContainer,
    ButtonGroup,
  },
  created: function () {
    new Query(`
     getReducedCoinTypeList`)
      .list(["id", "projectId", "treadwellId", "completed"])
      .then((result) => {
        if (AxiosHelper.ok(result)) {
          this.$data.items = result.data.data["getReducedCoinTypeList"];
        } else {
          this.error = AxiosHelper.getErrors(result).join("\n");
        }
      })
      .catch(() => {
        this.error = this.$t("error.loading_list");
      })
      .finally(() => {
        this.$data.loading = false;
      });
  },
  computed: {
    isListFiltered: function () {
      return !(this.completeFilter == "none" && !this.textFilter);
    },
    filteredList: function () {
      let list = this.$data.items;

      list = SearchUtils.filter(this.textFilter, list, "projectId");

      if (this.completeFilter == "work" || this.completeFilter == "completed") {
        const state = this.completeFilter == "completed";
        list = list.filter((item) => item.completed == state);
      }

      return list;
    },
    list: function () {
      return this.$data.items;
    },
  },
  data: function () {
    return {
      loading: true,
      items: [],
      error: "",
      textFilter: "",
      completeFilter: "none",
    };
  },
  methods: {
    handleKeys(event) {
      console.log(event.key);
    },
    create() {
      this.$router.push({
        name: `TypeCreationPage`,
      });
    },
    changeCompleteState(state, item) {
      console.log(state, item);

      Query.raw(
        `
        mutation{
          setTypeComplete(id: ${item.id}, completed: ${state})
        }
      `
      )
        .then((result) => {
          if (result.status >= 200 && result.status <= 200) {
            item.completed = state;
          }
        })
        .catch((err) => {
          this.error = err;
        });
    },
    remove(id) {
      Query.raw(
        `mutation{
  removeCoinType(id: ${id})
}`
      )
        .then(() => {
          console.log("HALLO");
          const idx = this.$data.items.findIndex((item) => item.id == id);
          if (idx != -1) this.$data.items.splice(idx, 1);
        })
        .catch((answer) => {
          console.dir(
            answer.response.data.errors.map((item) => item.message).join("\n")
          );
          // this.error =
          // console.error(err);
        });
    },
    edit(id) {
      this.$router.push({
        name: "EditTypePage",
        params: { id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_import.scss";
.list {
  display: flex;
  flex-direction: column;
  margin: $padding 0;
  // padding: $padding;
  overflow: hidden;
  background-color: rgb(78, 78, 78);

  background-color: whitesmoke;
  border-radius: 3px;

  box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.1);
}

.list-item {
  align-items: center;
  display: flex;

  transition: background-color 0.15s;

  &.completed {
    background-color: rgb(243, 242, 242);
  }

  > :first-child {
    flex: 1;
  }
}

.edit {
  display: flex;
  height: 100%;
  flex: 1;

  background-color: whitesmoke;
  @include interactive();
  margin-right: $padding;
  padding: $padding $padding;

  &:hover {
    background-color: gray;
  }
}

.button {
  @include interactive();
  display: flex;
  align-items: center;
  padding: $padding;

  border-radius: $border-radius;

  > * {
    margin-right: $padding;
  }
}

.overview > * {
  margin-bottom: $padding;
}
</style>
