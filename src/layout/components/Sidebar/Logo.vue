<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <!-- <img v-if="logo" :src="logo" class="sidebar-logo"> -->
        <!-- id为1就添加类名：text-gradient -->
        <h1 ref="aaa" :class="{'sidebar-title':true,'gradient':id === '1'}">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Nice',
      logo: require('@/assets/Nice/logo1.png')
    }
  },
  computed: {
    ...mapGetters(['themeId']),
    id() {
      return this.themeId + ''
    }
  },
  watch: {
    id: {
      handler(id) {
        console.log(id)
        if (id === '1') {
          // console.log(this.$refs)
          // console.log(document.querySelector('.sidebar-title'), 6666666)

          this.logo = require('@/assets/Nice/logo2.png')
        } else {
          this.logo = require('@/assets/Nice/logo1.png')
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.gradient {
  display: inline-block;
  color: #8f75da;
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(#8f75da),
    to(#727cf5)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  // background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: $title;
      font-weight: 600;
      line-height: 50px;
      font-size: 23px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
