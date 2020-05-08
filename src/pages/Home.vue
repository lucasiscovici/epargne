<template>
<div id="BJlsH4RW58">
<div class="Hkl0oNC-cU" >
           <mdc-textfield trailing-icon="euro" v-model="config.epargne" style="text-align: center" label="Epargne Actuelle" value="0" type="text" rows="100" cols="100"></mdc-textfield>

      <mdc-textfield trailing-icon="euro" v-model="config.epargnePerMonth" style="margin-top:100px;text-align: center" label="Epargne / mois" value="100" type="text" rows="100" cols="100"></mdc-textfield>

<!--   <button class="H1N7BAZ9L">OK</button>
 --> 
 <br> <br> <br> <br> <br> Ajouter mois : <mdc-slider min=0 max=12 step=1 display-markers v-model="sliderValue" />

</div>

</div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return {
      sliderValue:  0,
      config : this.$globalStore.config
    }
  },
  methods : {
    kk(i){
      if (this.sliderValue != i) {
      console.log(i)
    }else{
      console.log("no")
    }
    }
  },
  watch:{
    sliderValue(ne,p){
      this.$set(this.$globalStore.config,"months",ne);
    }
  }
}
</script>

<style>
.Hkl0oNC-cU {
  position : fixed !important;
  top:50%;
  right:50%;
  transform : translateX(50%) translateY(-50%);

}
.Hkl0oNC-cU .mdc-text-field__input {
    text-align : center;
        padding-bottom: 10px;
        color: #6200ee !important;
  font-size:50px !important;
}
.Hkl0oNC-cU .mdc-floating-label {
    text-align : center;
   font-size:40px !important;
       line-height: 2.15rem !important;

}

</style>

<style scoped>
#BJlsH4RW58 {


  text-align : center;
}


</style>
