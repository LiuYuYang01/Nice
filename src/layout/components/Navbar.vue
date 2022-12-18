<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <div class="app-breadcrumb">
      也许将会是最强的后台管理系统
      <!-- <span class="breadBtn">正式版</span> -->
    </div>

    <!-- 快捷菜单 -->
    <div class="shortcutMenu">
      <div>
        <a href="https://github.com/LiuYuYang01/Nice" target="_blank">Github</a>
      </div>

      <div>
        <a href="http://liuyuyang.net" target="_blank">作者博客</a>
      </div>
    </div>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 仪表盘 </el-dropdown-item>
          </router-link>

          <router-link to="/my">
            <el-dropdown-item> 个人设置 </el-dropdown-item>
          </router-link>

          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import { getUser } from '@/utils/auth'

export default {
  components: {
    Hamburger
  },
  data() {
    return {
      avatar: ''
    }
  },
  computed: {
    // ...mapGetters(['sidebar', 'avatar'])
    ...mapGetters(['sidebar'])
  },
  created() {
    this.avatar = getUser() && JSON.parse(getUser()).avatar
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/login`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 2;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.app-breadcrumb {
  display: inline-block;
  font-size: 15px;
  line-height: 50px;
  margin-left: 40px;
  color: #6c757d;
  cursor: text;
  .breadBtn {
    color: #fff;
    background: #727cf5;
    font-size: 14px;
    padding: 0 10px;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    margin-left: 15px;
  }
}

// 快捷导航
.shortcutMenu {
  position: absolute;
  top: 50%;
  right: 130px;
  transform: translateY(-50%);
  display: flex;
  color: #666;
  font-size: 14px;

  div {
    margin-left: 30px;
    transition: all 0.3s;

    &:hover{
      color: #727cf5;
    }
  }
}

.navbar .right-menu .avatar-container .avatar-wrapper .user-avatar{
  border-radius: 50%;
}
</style>
