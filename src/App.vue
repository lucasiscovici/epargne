<template>
  <div id="app">
  	 <mdc-layout-app>
  <mdc-toolbar slot="toolbar" fixed>
    <mdc-toolbar-row>
      <mdc-toolbar-section align-start >
        <mdc-toolbar-menu-icon event="toggle-drawer"></mdc-toolbar-menu-icon>
        <mdc-toolbar-title>Epargne -  {{$route.name}}</mdc-toolbar-title>
      </mdc-toolbar-section>
      <mdc-toolbar-section align-end>
      <mdc-toolbar-icon @click="download" icon="help"></mdc-toolbar-icon>
        <mdc-toolbar-icon @click="upload" icon="power"></mdc-toolbar-icon>

    </mdc-toolbar-section>
    </mdc-toolbar-row>
  </mdc-toolbar>
  <mdc-drawer slot="drawer" toggle-on="toggle-drawer" style="z-index: 9999999999;">
    <mdc-drawer-list>
        <mdc-drawer-item start-icon="inbox" @click='handler("/")'>Config</mdc-drawer-item>
        <mdc-drawer-item  start-icon="send" @click='handler("/projets")'>Projets</mdc-drawer-item>
    </mdc-drawer-list>
  </mdc-drawer>
  <main class="content" >
  	    <router-view></router-view>
  </main>

</mdc-layout-app>
<input id="caca" type="file" name="somename" size="chars" accept=".json" @change="changeFile">

  </div>
</template>

<script>
 function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
export default {
  name: 'app',
  methods: {
    changeFile(d){
      console.log(d);
      var ff=document.querySelector("#caca").files;
      if (ff.length>0) {
        var filp=ff[0];
        // console.log(filp);
        var thiso=this;
        if (filp.type=="application/json") {
           var reader = new FileReader();
        reader.onload = (d)=>{
              var obj = JSON.parse(event.target.result);
              if (obj.config ) {
                thiso.$set(thiso.$globalStore,"config",obj.config)
              }
              if (obj.cards ) {
                thiso.$set(thiso.$globalStore,"cards",obj.cards)
              }
              
        };
        reader.readAsText(filp);

        }
      }
    },  
    upload(){
 document.querySelector('#caca').click();

    },
    download(){
      downloadObjectAsJson({cards:this.$globalStore.cards,config:this.$globalStore.config})
    },
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
#caca {
    display: block;
    visibility: hidden;
    width: 0;
    height: 0;
}

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.dclass{
  z-index: 9 !important;
  text-align: center;
}
.mdc-layout-app--drawer-wrapper{
  z-index: 9999999;
}
.vdp-datepicker {
    left: 39%;
    width: 40px;
    transform: translateX(-50%);
  }
  .vdp-datepicker__calendar{
    z-index:999999999999 !important;
  }
</style>
