<template>
  <div class="remen">
    <van-cell title="k歌热门作品" is-link @click="change" />
    <div class="main">
      <div
        class="li"
        v-for="item in list.slice(0, 3)"
        :key="item.id"
        @click="audioshow(item.id)"
      >
        <van-cell @click="showPopup">
          <img :src="item.cover" alt="" />
          <p class="p1">{{ item.name }}</p>
          <p class="p2">{{ item.artistName }}</p>
        </van-cell>
      </div>

      <van-popup v-model="show" id="content"
        ><iframe height="100%" width="100%" :src="aud" frameborder="0"></iframe
      ></van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      imgurl: "",
      list: [],
      aud: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    showPopup() {
      this.show = true;
    },
    audioshow(id) {
      console.log(id);
      this.$http.get(`/api/mv/url?id=${id}`).then((res) => {
        console.log(res.data.data.url);
        this.aud = res.data.data.url;
      });
    },
    moreshow() {
      this.$http.get(`/api/mv/all`).then((res) => {
        // console.log(res);
        this.list = res.data.data;

        console.log(this.list);
      });
    },
    change() {
      this.$router.push({
        path: "/kgebang",
      });
    },
  },
  created() {
    this.moreshow();
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
.remen {
  width: 90%;
  height: 250px;
  border-radius: 5px;
  margin: 20px auto;
}
.main {
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.main .li {
  width: 120px;
  height: 100%;
  /* background: rgb(229, 250, 250); */
  border-radius: 5px;
  text-align: center;
}
.main .li img {
  width: 100%;
  height: 80px;
  border-radius: 5px;
}
.main .li p {
  font-size: 15px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#content {
  width: 100%;
  height: 50%;
}
</style>
