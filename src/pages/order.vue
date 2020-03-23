<template>
  <div>
    <h1>订单页面</h1>
    <h2 @click="increment">{{count}}</h2>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'order',
  components: {},
  filters: {},
  mixins: [],
  props: {

  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['count'])
  },
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    ...mapActions(['increment'])
  }
}
</script>

<style lang="scss" scoped>

</style>
