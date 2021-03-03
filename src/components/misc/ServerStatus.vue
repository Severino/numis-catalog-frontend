<template>
  <div class="server-status">
    <div
      id="indicator"
      @mouseenter="showText"
      @mouseleave="hideText"
      :class="status ? 'online' : 'offline'"
    ></div>
    <span id="status" :class="textVisibility ? 'visible' : 'hidden'">
      {{ $t("general.server_status") }}:
      {{ status ? $t("general.online") : $t("general.offline") }}
    </span>
  </div>
</template>


<script>
import Query from "@/../src/database/query.js";
export default {
  data: function () {
    return {
      textVisibility: false,
      status: false,
      interval: null,
    };
  },
  created: function () {
    this.update();
    this.$data.interval = setInterval(this.update, 3000);
  },
  beforeDestroy: function () {
    clearInterval(this.$data.interval);
  },
  methods: {
    showText: function () {
      this.textVisibility = true;
    },
    hideText: function () {
      this.textVisibility = false;
    }, 
    update: function () {
      new Query() 
        .raw(`{ping}`)
        .then(() => {
          this.status = true;
        })
        .catch(() => {
          this.status = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/_import.scss";

$size: 16px;

.server-status {
  //   display: flex;
  //   align-items: center;
  font-size: 0.6rem;
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  cursor: pointer;
}

#status {
  position: absolute;
  background-color: white;
  box-shadow: 1px 2px 5px rgba($color: #000000, $alpha: 0.3);
  transition: opacity 0.5s;
  padding: 5px 10px;
  border-radius: 3px;
  top: -5px;
  left: $size;
  transform: translate(-100%, -100%);
  text-transform: capitalize;
  white-space: nowrap;
}

.visible {
  opacity: 1;
}

.hidden {
  opacity: 0;
}

#indicator {
  width: $size;
  height: $size;
  margin-right: 10px;
  border-radius: 50%;
  border: 1px solid black;
  box-sizing: border-box;

  &.online {
    background-color: $green;
  }

  &.offline {
    background-color: $red;
  }
}
</style>