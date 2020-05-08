<template>
  <div id="app">
  	 <mdc-layout-app>
  <mdc-toolbar slot="toolbar" fixed>
    <mdc-toolbar-row>
      <mdc-toolbar-section align-start >
        <mdc-toolbar-menu-icon event="toggle-drawer"></mdc-toolbar-menu-icon>
        <mdc-toolbar-title>Epargne -  {{$route.name}}</mdc-toolbar-title>
      </mdc-toolbar-section>
    </mdc-toolbar-row>
  </mdc-toolbar>
  <mdc-drawer slot="drawer" toggle-on="toggle-drawer">
    <mdc-drawer-list>
        <mdc-drawer-item start-icon="inbox" @click='handler("/")'>Config</mdc-drawer-item>
        <mdc-drawer-item  start-icon="send" @click='handler("/projets")'>Projets</mdc-drawer-item>
    </mdc-drawer-list>
  </mdc-drawer>
  <main class="content" >
  	    <router-view></router-view>
  </main>
</mdc-layout-app>

  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
  	handler(i){
  		this.$router.push(i);
  	}
  }
}
</script>

<style>
html, body, #app {
  height: 100%;
  width: 100%;
}

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
