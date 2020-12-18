<template>
  <div class="search">
    <div class="title">
      <div>歌曲</div>
      <div>歌手</div>
      <div>专辑</div>
    </div>
    <div class="box">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          offset="30"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            v-for="item in list"
            :key="item._id"
            class="case"
            @click="play(item.id)"
          >
            <div class="van-ellipsis">{{ item.name }}</div>
            <div class="van-ellipsis">{{ item.artists[0].name }}</div>
            <div class="van-ellipsis">{{ item.album.name }}</div>
          </div>
          <!-- 弹窗 -->
          <van-popup
            v-model="show"
            position="bottom"
            :style="{ height: '20%' }"
          >
            <span>{{ songName }}</span>
            <span>{{ art }}</span>
            <p>
              <audio
                :src="box"
                ref="audio"
                controls
                autoplay="autoplay"
              ></audio>
            </p>
          </van-popup>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      count: 0,
      num: 12,
      art: "", //歌手名字
      songName: "", //歌曲名字
      show: false,
    };
  },
  computed: {},
  watch: {
    "$store.state.search"() {
      console.log(123456);
      this.onRefresh();
      this.onLoad();
    },
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    async play(id) {
      this.songName = "";
      this.show = true;
      const result = await this.$http.get(`api/song/detail?ids=${id}`);
      if (result.status === 200) {
        this.art = result.data.songs[0].ar[0].name;
        this.songName = result.data.songs[0].name;
      }
      const result1 = await this.$http.get(`api/song/url?id=${id}`);
      if (result1.status === 200) {
        this.box = result1.data.data[0].url;
        localStorage.setItem("id", JSON.stringify(this.id));
      }
    },

    onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.refreshing = true;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    onLoad() {
      if (this.$store.state.search) {
        setTimeout(() => {
          if (this.refreshing) {
            this.list = [];
            this.count = 0;
            this.num = 12;
            this.refreshing = false;
          }
          this.$http
            .get(
              "/api/search?keywords=" +
                this.$store.state.search +
                "&end=" +
                "&offset=" +
                this.count +
                "&limit=" +
                this.num
            )

            .then((res) => {
              console.log(res);
              if (res.data.result.songs.length == 0) {
                this.finished = true;
                console.log("3333333333333333333了");
              }
              // console.log(res.data.data.films);
              for (let i = 0; i < res.data.result.songs.length; i++) {
                this.list.push(res.data.result.songs[i]);
              }
              console.log(this.list);
              this.count++;
              this.num = 5;
              this.loading = false;
            });

          // 加载状态结束
          // this.loading = false;

          // 数据全部加载完成
          // if (this.list.length >= 45) {
          //   this.finished = true;
          //   // this.refreshing = false;
          // }
        }, 0);
      }
    },
  },
  created() {
    // this.getplaylist();
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

<style lang="scss" scoped>
.search {
  position: fixed;
  top: 100px;
  left: 0;
  width: 100%;
  bottom: 0;
  overflow: scroll;
  z-index: 10;
  background: rgb(161, 154, 154);
}
.box {
  padding-top: 1rem;
}
.case {
  border-top: 1px solid rgba(198, 189, 189, 0.313);
  width: 95%;
  height: 100px;
  margin: 0 auto;
  > div {
    font-size: 14px;
    height: 100%;
    line-height: 100px;
    float: left;
  }
  > div:nth-of-type(1) {
    width: 40%;
  }
  > div:nth-of-type(2) {
    width: 20%;
  }
  > div:nth-of-type(3) {
    width: 40%;
  }
}
.title {
  position: fixed;
  top: 100px;

  border-top: 1px solid rgba(198, 189, 189, 0.313);
  width: 100%;
  height: 50px;
  margin: 0 auto;
  background: floralwhite;
  z-index: 1;
  > div {
    font-size: 14px;
    height: 100%;
    line-height: 50px;
    //   text-align: center;
    float: left;
  }
  > div:nth-of-type(1) {
    text-indent: 20px;
    width: 40%;
  }
  > div:nth-of-type(2) {
    width: 20%;
  }
  > div:nth-of-type(3) {
    width: 40%;
    //   text-align: center;
  }
}
</style>
