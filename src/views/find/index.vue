<template>
  <div class="content">
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
    <div class="sousuo">
      <form action="/">
        <van-search
          @click="search"
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </div>

    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="green">
        <van-swipe-item v-for="item in bannerImgs" :key="item.id"
          ><img :src="item.imgUrl" alt=""
        /></van-swipe-item>
      </van-swipe>
    </div>

    <van-grid :gutter="10">
      <van-grid-item>
        <van-icon name="send-gift-o" />
        每日推荐</van-grid-item
      >
      <van-grid-item>
        <van-icon name="vip-card-o" />
        私人FM</van-grid-item
      >
      <van-grid-item>
        <van-icon name="music-o" />
        歌单</van-grid-item
      >
      <van-grid-item>
        <van-icon name="discount" />
        排行榜</van-grid-item
      >
    </van-grid>
    <div class="ul">
      <span class="title">推荐歌单</span>

      <ul>
        <li v-for="item in list.slice(0, 4)" :key="item._id">
          <div class="icon" @click="selectList(item)">
            <img :src="item.picUrl" />
            <p class="play-count">
              <i class="fa fa-headphones"></i>
              {{ Math.floor(item.playCount / 10000) }}万
            </p>
          </div>

          <div class="text">
            <p class="name">{{ item.name }}</p>
          </div>
        </li>
      </ul>
    </div>
    <router-view></router-view>
    <div class="seach"></div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      oinp: "",

      active: "",
      showw: false,
      val: "请登录",
      img: "",
      uid: 0,

      show: false,
      value: "",
      list: [],
      bannerImgs: [
        {
          imgUrl:
            "http://p1.music.126.net/GOUS07Q9pm88X9EWbSQI6A==/109951165542504475.jpg?",
          id: 1,
        },
        {
          imgUrl:
            "http://p1.music.126.net/MHD3ztZuIQIPZagMgR8h2w==/109951165542304054.jpg?imageView&quality=89",
          id: 2,
        },
        {
          imgUrl:
            "http://p1.music.126.net/gvxPTf98GNgyM_Jm8XpNbw==/109951165542270577.jpg?imageView&quality=89",
          id: 3,
        },
        {
          imgUrl:
            "http://p1.music.126.net/1b2syjXOWlPZEYUpqdW6OQ==/109951165542511113.jpg?imageView&quality=89",
          id: 4,
        },
      ],
      movies: [],
      hotMovies: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    out() {
      this.$http.get("/api/logout").then((res) => {
        console.log(res);
        localStorage.removeItem("userid");
        localStorage.removeItem("img");
        this.$router.push("../deng");
        this.val = "请登录";
      });
    },
    getUsers() {
      this.uid = Number(localStorage.getItem("userid"));
      this.$http.get(`api/user/detail?uid=${this.uid}`).then((res) => {
        console.log(res.data.profile.nickname);
        this.val = res.data.profile.nickname;
        this.img = res.data.profile.avatarUrl;
      });
    },
    onSearch(val) {
      Toast(val);
      this.$store.state.search = val;
    },
    onCancel() {
      Toast("取消");
      this.$router.push("/find");
    },
    search() {
      if (this.$route.path !== "/find/search") {
        console.log(1);
        this.$router.push("/find/search");
      }
    },
    showPopup() {
      this.show = true;
    },
  },
  created() {
    this.img = JSON.parse(localStorage.getItem("img"));

    this.getUsers();

    this.$http.post(`api/dj/toplist/personalized?limit=30`).then((res) => {
      // console.log(res)

      this.list = res.data.toplist;
    });
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

<style>
html,
body {
  height: 100%;
}
.banner {
  height: 25%;
}
.my-swipe {
  height: 100%;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 35px;
  text-align: center;
}
.my-swipe .van-swipe-item img {
  height: 100%;
  width: 100%;
}
.van-grid-item .van-icon {
  font-size: 40px;
  color: red;
}
ul {
  display: flex;
  /* flex-wrap: wrap; */
}
.ul span {
  font-size: 30px;
  font-weight: 600;
  margin: 20px 10px;
}

.ul img {
  width: 100px;
  height: 100px;
}
.icon {
  position: relative;
}
.icon p {
  position: absolute;
  top: 0;
  right: 0;
}
.text {
  font-size: 15px;
  line-height: 20px;
}
.content {
  position: relative;
}
.tu {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.sousuo {
  position: absolute;
  top: 0;
  left: 50px;
}
.name {
  width: 106px;
  text-align: center;
}
.play-count {
  text-align: center;
}
#app {
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
