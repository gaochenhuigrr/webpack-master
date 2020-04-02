<template>
  <div>
    <h1>商品页面</h1>
    <h1>All Star</h1>
    <p v-for="(item, idx) in candidateSet" :key="idx">{{item.star}}</p>
  </div>
</template>

<script>
const Mock = require('mockjs')
export default {
  name: 'product',
  components: {},
  filters: {},
  mixins: [],
  props: {

  },
  data() {
    return {
      candidateSet: []
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {
    this.getMockData()
  },
  methods: {
    getMockData () {
      const mockData = Mock.mock({
        "data|1-5": [
          {
            "star|1": [
              "Curry",
              "James",
              "Davis",
              "Harden",
              "KD",
              "Irving"
            ]
          }
        ]
      })
      this.candidateSet = mockData.data
      return mockData
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
