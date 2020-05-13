<template>
<div id="BJlsH4RW58">
<div class="Hkl0oNC-cU" >
           <mdc-textfield trailing-icon="euro" v-model="config.salaire" style="text-align: center" label="Salaire / mois" value="2500" type="text" rows="100" cols="100"></mdc-textfield>
</br>
      <mdc-textfield :trailing-icon="tl" v-model="config.epargnePerMonth" style="margin-top:100px;text-align: center" label="Epargne / mois (% ou valeur)" value="100" type="text" rows="100" cols="100" @input="epargneInput"></mdc-textfield>

</br>
</br>

<span style="font-weight: bold;font-size:30px;width:100vw;">{{getText}}</span>

</br>
</br>
</br>
  
<div style="text-align: center !important;width: 100%;"><span style="padding-top:30px;font-size:30px;">Date de commencement</span><datepicker :inputClass="'dclass'"  :minimumView="'month'" v-model="dateDebut" ref="dateDebut" format="MMMM yyyy" @input="changeDateDebut"></datepicker></div>
</br>

<div style="text-align: center !important;width: 100%;"><span style="padding-top:30px;font-size:30px;">Date Actuelle</span><br>
  <span @click="delete $globalStore.config['dateFin'];dateActuelle=undefined">[X]</span><datepicker :inputClass="'dclass'"  :minimumView="'month'" v-model="dateActuelle" format="MMMM yyyy" @input="changeDateActuelle" :disabled-dates='{ to: new Date(dateDebut)}'></datepicker></div>
</br></br>
<span style="font-weight: bold;font-size:30px;width:100vw;">{{getText2}}</span>

<!-- <datepicker placeholder="Select Date"></datepicker> -->
<!--   <button class="H1N7BAZ9L">OK</button>
 --> 
 <!-- <br> <br> <br> <br> <br> Ajouter mois : <mdc-slider min=0 max=12 step=1 display-markers v-model="sliderValue" /> -->

</div>

</div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return {
      sliderValue:  0,
      tl:"euro",
      dateDebut: this.$globalStore.config.dateDebut,
      dateActuelle: this.$globalStore.config.dateFin || new Date(),
      config : this.$globalStore.config
    }
  },
  methods : {
    changeDateDebut(e){
      this.$set(this.$globalStore.config,"dateDebut",Date.parse(e));
    },changeDateActuelle(e){
      this.$set(this.$globalStore.config,"dateFin",Date.parse(e));
    },
    kk(i){
        if (this.sliderValue != i) {
        console.log(i)
      }else{
        console.log("no")
      }
    },
    epargneInput(e){
      var d=e.value;
      console.log(d);
      if (parseFloat(d) < 1 && parseFloat(d)>0) {
        this.tl="%"
        ttl
      }else{
        this.tl="euro"
      }
    },
  },
  computed: {
    getText2(){
      return moment(this.dateActuelle).diff(this.dateDebut,'months')+" Mois passé" ;

    },
    getText(){
      var salaire = parseFloat(this.config.salaire);
      var epargnePerMonth=parseFloat(this.config.epargnePerMonth);
      var epargne = epargnePerMonth;
      if (epargne<1 && epargne>=0) {
        epargne = salaire*epargnePerMonth
      }else{
        epargnePerMonth= epargne/salaire;
      }
      epargnePerMonth=Math.round(epargnePerMonth*100)
      return "Salaire de "+this.config.salaire+"€ - Épargne de "+epargne+'€ ('+epargnePerMonth+'%) par mois'
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
.vdp-datepicker{
  text-align:center !important;
}

.vdp-datepicker input{
  text-align:center !important;
  font-size: 40px;
  color:rgb(83, 58, 183);
}
.Hkl0oNC-cU {
  position : fixed !important;
  top:50%;
  right:50%;
  width: 100%;
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


#BJlsH4RW58 {


  text-align : center;
}


</style>
