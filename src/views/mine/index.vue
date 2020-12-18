<template>
  <div id="app">
    <!-- 侧边栏 -->
    <van-cell @click="showPopup" id="hahah"
      ><van-icon name="wap-nav" id="haha"
    /></van-cell>
    <van-popup
      v-model="show"
      position="left"
      :style="{ width: '30%', height: '100%' }"
    >
      <!-- 账户 -->
      <van-cell-group id="woqu">
        <van-cell is-link>
          <img :src="img" alt="" class="tu" />
          <span>{{ val }}</span></van-cell
        >
      </van-cell-group>

      <van-cell title="我的消息" is-link url="/vant/mobile.html" />
      <van-cell title="云贝中心" is-link to="index" />
      <van-cell title="创作者中心" is-link to="index" />

      <van-cell title="云村有票" is-link url="/vant/mobile.html" />
      <van-cell title="商城" is-link to="index" />
      <van-cell title="游戏专区" is-link to="index" />
      <van-cell title="我的消息" is-link url="/vant/mobile.html" />
      <van-cell title="云贝中心" is-link to="index" />
      <van-cell title="创作者中心" is-link to="index" />

      <van-cell title="口袋彩铃" is-link url="/vant/mobile.html" />
      <van-cell title="设置" is-link to="index" />
      <van-cell title="夜间模式" is-link to="index" />
      <van-cell title="定时关闭" is-link url="/vant/mobile.html" />
      <van-cell title="个性装扮" is-link to="index" />
      <van-cell title="创作者中心" is-link to="index" />

      <van-cell title="帮助与反馈" is-link url="/vant/mobile.html" />
      <van-cell title="分享网易音乐" is-link to="index" />
      <van-cell title="关于" is-link to="index" />
      <van-cell title="退出登录/关闭" to="index" @click="out" />
    </van-popup>

    <!-- 登录 -->
    <van-cell-group @click="godeng">
      <van-cell is-link class="woqu">
        <img :src="img" alt="" class="tu" />
        <span>{{ val }}</span></van-cell
      >
    </van-cell-group>
    <!-- 导航 -->
    <div id="nav">
      <van-grid class="navv">
        <van-grid-item icon="photo-o" text="本地/下载" id="women" />
        <van-grid-item icon="photo-o" text="云盘" />
        <van-grid-item icon="photo-o" text="已购" />
        <van-grid-item icon="photo-o" text="最近播放" />
        <van-grid-item icon="photo-o" text="我的好友" />
        <van-grid-item icon="photo-o" text="收藏和赞" />
        <van-grid-item icon="photo-o" text="我的博客" />
        <van-grid-item icon="photo-o" text="音乐应用" />
      </van-grid>
    </div>

    <!-- 我喜欢的音乐 -->
    <van-cell-group>
      <van-cell is-link>
        <img :src="img" alt="" class="tu" />
        <span @click="moreshow">我喜欢的音乐</span>
      </van-cell>
    </van-cell-group>
    <!-- 歌单 -->
    <div id="gedan">
      <van-tabs v-model="active" @click="addgedan">
        <van-tab title="创建歌单">
          <ul>
            <li v-for="item in list" :key="item.id" @click="getSongs(item.id)">
              {{ item.name }}
            </li>
          </ul>

          <van-popup
            v-model="showw"
            position="bottom"
            :style="{ height: '30%' }"
          >
            <p>新建歌单</p>
            <input type="text" v-model="oinp" class="tex" />
            <button @click="queding">确定</button>
          </van-popup>
        </van-tab>
        <van-tab title="收藏歌单"> </van-tab>
        <van-tab title="歌单助手"> </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oinp: "",

      show: false,
      active: "",
      showw: false,
      val: "请登录",
      img: "",
      uid: 0,
      list: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    getUsers() {
      this.uid = Number(localStorage.getItem("userid"));
      this.$http.get(`api/user/detail?uid=${this.uid}`).then((res) => {
        console.log(res.data.profile.nickname);
        this.val = res.data.profile.nickname;
        this.img = res.data.profile.avatarUrl;
      });
    },
    getSongs(id) {
      this.$http.get(`api/playlist/highquality/tags`).then((res) => {
        console.log(res);
        localStorage.setItem("jump", JSON.stringify(id));
        this.$router.push(`../jump/${id}`);
      });
    },
    queding() {
      this.$http.get(`/api/playlist/create?name=${this.oinp}`).then((res) => {
        console.log(res);
      });
    },
    getgedan() {
      this.uid = Number(localStorage.getItem("userid"));

      this.$http.get(`/api/user/playlist?uid=${this.uid}`).then((res) => {
        console.log("rtrtr", res.data.playlist);
        this.list = res.data.playlist;
      });
    },

    addgedan() {
      console.log("1");
      this.showw = true;
    },
    out() {
      this.$http.get("/api/logout").then((res) => {
        console.log(res);
        localStorage.removeItem("userid");
        localStorage.removeItem("img");
        this.$router.push("../deng");
        this.val = "请登录";
      });
    },
    godeng() {
      if (this.val.length <= 3) {
        this.$router.push("./deng");
      }
    },
    showPopup() {
      this.show = true;
    },
    moreshow() {
      this.$http.get("/api/song/url?id=33894312").then((res) => {
        console.log(res);
      });
    },
  },
  created() {
    this.img = JSON.parse(localStorage.getItem("img"));

    this.getUsers();
    this.getgedan();
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  components: {},
};
</script>

<style scoped>
#app {
  background: #e4e4e4;
}
.woqu {
  background: #e4e4e4;
}
#hahah {
  background: #e4e4e4;
}
.van-cell-group {
  width: 90%;
  margin-left: 5%;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
}
#haha {
  font-size: 30px;
}
.tex {
  border: 1px solid black;
}
#women {
  border: 0;
}

.tu {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
#nav {
  width: 90%;
  margin-left: 5%;
  border-radius: 20px;
  overflow: hidden;
  background: #f8f2f2;
}
ul li {
  width: 100%;
  height: 50px;

  margin-bottom: 5px;

  text-align: center;
  line-height: 50px;
}
.van-tab {
  background: red;
  font-size: 40px;
}
.van-tab__pane {
  background: #fff;
}
#gedan {
  width: 90%;
  margin-left: 5%;
  border-radius: 10px;
  overflow: hidden;
  background: #f8f2f2;
  margin-bottom: 40px;
}
</style>
