<template>
  <div class="footer">
    <!-- <ul>
      <router-link to="/find" tag="li"><dt><van-icon name="service-o" size=25px /><dl>发现</dl></dt></router-link>
      <router-link to="/boke" tag="li"><dt><van-icon name="music-o" size=25px active-class="color"/><dl>播客</dl></dt></router-link>
      <router-link to="/mine" tag="li"><dt><van-icon name="smile-o" size=25px active-class="color"/><dl>我的</dl></dt></router-link>
      <router-link to="/kge" tag="li"><dt><van-icon name="play-circle-o" size=25px active-class="color" /><dl>唱歌</dl></dt></router-link>
      <router-link to="/yuncun" tag="li"><dt><van-icon name="shop-collect-o" size=25px active-class="color" /><dl>云村</dl></dt></router-link>
    </ul> -->

    <van-tabbar
      v-model="active"
      active-color="#ee0a24"
      inactive-color="#000"
      route
    >
      <van-tabbar-item icon="service-o" to="/find" tag="li"
        >发现</van-tabbar-item
      >
      <van-tabbar-item icon="music-o" to="/boke" tag="li">播客</van-tabbar-item>
      <van-tabbar-item icon="smile-o" to="/mine" tag="li">我的</van-tabbar-item>
      <van-tabbar-item icon="play-circle-o" to="/kge" tag="li"
        >k歌</van-tabbar-item
      >
      <van-tabbar-item icon="shop-collect-o" to="/yuncun" tag="li"
        >云村</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
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
.footer .van-tabbar li.active {
  color: #f03d37;
}
</style>
