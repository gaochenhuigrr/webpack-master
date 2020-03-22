<template>
  <div id="app">
    <h1>{{theme}}</h1>
    <ul v-if="roles.length">
        <li v-for="(role, i) in roles" :key="i">{{role}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
      return {
          theme: 'Offensive Leaders',
          roles: [
              'Jordan',
              'Kobe',
              'James'
          ]
      }
  }
}
</script>

<style lang="scss" scoped>
    h1 {
        color: aquamarine!important;
    }
    li {
        list-style: none;
    }
</style>
