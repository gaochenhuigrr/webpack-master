<template>
  <div>
    <h1>订单页面</h1>
    <el-button type="success" plain @click="increment">{{count}}</el-button>
    <h3>Articles</h3>
    <ul v-for="({node}, i) in articles" :key="i">
      <li @click="jump(node.originalUrl)">{{node.title}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'order',
  components: {},
  filters: {},
  mixins: [],
  props: {

  },
  data() {
    return {
      articles: []
    }
  },
  computed: {
    ...mapState(['count'])
  },
  watch: {},
  created () {

  },
  mounted () {
    this.getHotArticles()
  },
  methods: {
    ...mapActions(['increment']),
    getHotArticles () {
      axios.post('https://web-api.juejin.im/query', {
        operationName: '',
        query: '',
        variables:{
          first: 20,
          after: '',
          order: 'THREE_DAYS_HOTTEST'
        },
        extensions:{
          query:{
              id: '21207e9ddb1de777adeaca7a2fb38030'
          }
        }
      }, {
        headers: {'X-Agent': 'Juejin/Web'},
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH',
        'Access-Control-Allow-Origin': '*'
      }).then(res => {
        this.articles = res.data.data.articleFeed.items.edges
      })
    },
    jump (url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
