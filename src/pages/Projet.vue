<template>
    <div>
    <div v-if="modifyOK" style=" width:100%;height:100vh;text-align: center; top: 0px; position: absolute;background-color: rgba(0,0,0,0.5  );z-index:100000;">
      <span style="position: absolute;top:5px; color:white;left:5px; width: 20px; font-size:40px" @click="modifyOK=false">X</span>
      <div style="text-align: center; top:50%; position:absolute;left:50%;transform : translateX(-100%) translateY(-50%)">
      <span style="font-size:50px;font-weight: bold; color:white">{{modif.label}}</span></br>
      <input  @input="modif.change" :type="modif.type || 'text'" autofocus="true" ref="in" class="SkMxvRbqL2" :value="modif.value" overflow="hidden" text-overflow="ellipsis"/>
      </br v-if="modif.comment"> 
       </br v-if="modif.comment"> 
      <input  v-if="modif.comment"  placeholder="comment"  type="text" ref="in2" class="SkMxvRbqL2"  overflow="hidden" text-overflow="ellipsis"/>
    </br></br>  <button style="width: 100px;height: 50px;margin-left:-20px;" @click="modifyOK=false;modif.ok($refs.in.value,($refs.in2 || {value:undefined}).value);if(modif.comment){modif.comment($refs.in2.value)}" ref="okButton"> OK </button>
    </div>
    </div>
  <div id="rywc8AWcL">
    <span @dblclick="changeTitle" style="position:absolute; left:0%;top:0px; font-size:50px; color: rgb(83, 58, 183)">{{card.title}} {{months}}</span>

    <mdc-switch align-end class="SygLSwRbqI" label="Activation" :checked="card.activation" @change="changeActivation"></mdc-switch>

  <div style="margin-top:80px">
   <div style="display:flex">
      <span class="BJfnwR-9U">Solde</span><span class="SkMxvRbqL noSelect" @dblclick="editSolde">{{parseFloat(card.solde)+solde2}}({{card.solde}})€</span><mdc-linear-progress class="HJgu2I0ZqU" open :progress="pg" buffer="1"></mdc-linear-progress>  <span class="SyhyOR-qL noSelect" @dblclick="editMax">{{card.max}}€ ({{Math.round(pg*100)}}%)</span>

   </div>
   <div style="display:flex">
    <span class="BJfnwR-9U">Dépenses</span> <span class="SkMxvRbqL SkMxvRbqL3 noSelect" >{{getDepenses2}}€</span><mdc-linear-progress class="HJgu2I0ZqU SkMxvRbqL3" open :progress="pg2" buffer="1"></mdc-linear-progress>   <span class="SyhyOR-qL SkMxvRbqL3 noSelect" 
  >{{parseFloat(card.solde)+solde2}}€ ({{getDepenses3}}%) ({{getDepenses4}}€)</span>


   </div>
     </br>
   <div style="text-align: center !important;width: 90%;text-align: center;"><span style="text-align: center !important;padding-top:30px;font-size:30px;">Date de commencement</span><datepicker :inputClass="'dclass'" style="text-align: center !important;"  :minimumView="'month'" :value="card.date" ref="dateDebut" :disabled-dates="{to : new Date(config.dateDebut), from: (new Date(config.dateFin)) || undefined}" format="MMMM yyyy" @input="changeDateDebut"></datepicker></div>
</br>
 <button style="text-align: center !important;width: 90%;text-align: center;"><span style="text-align: center !important;padding-top:30px;font-size:30px;" @click="addDepense">Ajouter Un Dépense (-{{getDep()}}€)</span></button>

  </div>
      <hr style="margin-top:100px; border-color: rgb(83, 58, 183); margin-left:-200px; width:100%">
Transactions:
<ul>
  <li v-for="(c,i) in getTransactions" :key="i">
    <span>{{c.date}} : {{c.value}}€ ({{c.quoi}}) [{{c.previous}}€]</span>
  </li> 
</ul>
Transactions (automatique):
<ul>
  <li v-for="(c,i) in getTransactions2()" :key="i">
    <span>{{c.date}} : {{c.value}}€ ({{c.quoi}}) [{{c.previous}}€]</span>
  </li> 
</ul>
Dépenses:
<ul>
  <li v-for="(c,i) in getDepenses()" :key="i">
    <span>{{c.date}} : -{{c.value}}€ ({{c.comment}})€ <button @click="deleteDepense(c)">X</button></span>
  </li> 
</ul>
  <div class="kk" >
    <hr style="margin-top:100px; border-color: rgb(83, 58, 183); margin-left:-200px; width:100%">
     <mdc-select style="width:500px; font-size:30px !important; margin-top:50px" class="SJXBnuA-qU" label="Options d'épargne" :value="card.epargneOpts.epargne" ref="epargne" @change="changeEpargne">
      <optgroup label="">

      <option class="SJLB2d0b9L" value="rien">Pas d'option</option>

      <option class="Sk4BnORb5U" value="a">Somme/Pourcentage par interval</option>
    
    </optgroup>
    </mdc-select>

    <div v-show="epargne=='a'">

   <mdc-textfield :trailing-icon="tl" ref="valeur"  @input="checkval" style="margin-top:100px;text-align: center" label="Somme à épargner" :value="card.epargneOpts.valeur" type="number" rows="100" cols="100"></mdc-textfield>

   <mdc-textfield  @change="changedFreq" ref="freq" style="margin-top:100px;text-align: center" label="Fréquence"  :value="card.epargneOpts.frequence" type="number" rows="100" cols="100"></mdc-textfield>

   <mdc-select class="Hkt8FRWqL" label="Interval" :value="card.epargneOpts.interval" ref="interval" @change="changedInterval">
      <option class="S1eFLtCZ5I" value="a">Jours</option>
    
      <option class="HyZFLFRZ9L" value="b">Semaines</option>
    
      <option class="SyfKIK0-cU" value="c">Mois</option>
    </mdc-select>
    </br>
    <span>{{this.text}}</span>
    </br></br>  <button style="width: 100px;height: 50px;margin-left:-20px;" ref="okButtonA" @click="okA"> OK </button>

    </div>
    <div style="display:none">
    <input class="BJi5_CZ9I" value="" placeholder="placeholder" overflow="hidden" text-overflow="ellipsis"/>

    <span class="HJDWtC-5L">Somme par mois</span>
    <input class="B1umK0-5U" value="" placeholder="placeholder" overflow="hidden" text-overflow="ellipsis"/>
    <span class="HyxOmFCW5L">Pourcentage par mois</span>
    <mdc-select class="Hkt8FRWqL" label="Priorité" value="a">
      <option class="S1eFLtCZ5I" value="a">Option A</option>
    
      <option class="HyZFLFRZ9L" value="b">Option B</option>
    
      <option class="SyfKIK0-cU" value="c">Option C</option>
    </mdc-select>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
  var hash = require('object-hash');

export default {
  name: 'projet',
  mounted(){
    if (this.epargne == "a") {
      setTimeout(x => {
        this.$nextTick(() => this.changeText())    
      }, 0);

      // this.getTransactions()
       }
  },
  methods : {
    
    getTransactions2(){
      if (this.card.epargneOpts.meta == undefined || this.card.epargneOpts.meta.valeurMensualite==undefined) {
        return "";
      }
      var nbMonths = (this.$utils.diffMonths(this.config.dateFin,this.card.date));
      var base = parseFloat(this.card.solde);
      var toEpargned = this.card.epargneOpts.meta.valeurMensualite;
      var months = [];
      var dateB = this.card.date;

      this.$utils.range(0,nbMonths).forEach((a)=>{
        // console.log(a);
        var toEpargned2= base+toEpargned >parseFloat(this.card.max) ? this.card.max -base : toEpargned
        months.push({value:toEpargned2,
          quoi:"solde",previous: base,
           // id:this.$utils.getRandomString(),
                    date:moment(dateB).startOf("month").add(a,'months').format("MMMM"),
                      valueCum:base+toEpargned2})
        base+=toEpargned;
      })

      return months.filter((a)=>a.value>0)
    },
    getDepenses(){
      var fg= this.card.transactions.filter((e)=>Object.keys(e).length>0).filter((e)=>e.quoi=="depense");
      //console.log(fg);

      return fg;
    },
    deleteDepense(i){
      console.log(i,hash(i),this.card.transactions.map(
        (z)=>hash(z)));
      this.card.transactions = this.card.transactions.filter((e)=>hash(e)!=hash(i));
      // console.log(this.card.transactions); 
      this.$set(this.card,"transactions",this.card.transactions);
      // this.card.transactions=dd;
     
    },
    changeDateDebut(a){
      this.$set(this.card,"date",Date.parse(a));
      // this.$update()
      // this.card.date=Date.parse(a);
    },
    getDep(){
      return this.getDepenses().map((e)=>e.value).reduce((a,b)=>a+b,0);
    },
    editSolde(){
      this.modifyOK=true;
      var previous=parseFloat(this.card.solde);
      this.modif={label:"Solde",type:"number", value: this.card.solde, ok: (i)=>{
        this.card.solde=i
          this.card.transactions.push({quoi:"solde",value: this.card.solde,previous:previous,
             // id:this.$utils.getRandomString(),
        date:moment().format("MMMM YYYY"),dateO:Date.parse(moment())})

      },change: ()=> { 
        this.$refs.okButton.disabled = parseInt(((this.$refs.in || {value: 0}).value))>parseInt(this.card.max) // || this.checkEpargneDispo(parseInt(this.$refs.in.value),this.cardid)
      }};


      // console.log(this.$refs.in);
      // setTimeout(this.$refs.in.focus,3000);
      this.focus()  

    },
    changedInterval(f){
      //this.$refs.interval
      console.log("interval",this.$refs.interval.value,f)
      this.changeText()
    },
    changedFreq(){
      this.changeText()
    },
    changeText(){
      var e = this.$refs.interval.$refs.native_control;
    var value=e.options[e.selectedIndex].value;// get selected option value
    var text=e.options[e.selectedIndex].text;
    var vl=this.$refs["valeur"].$refs.input.value;
    // vl = this.$globalStore.config.epargne()*
    if (parseFloat(vl) < 1 && parseFloat(vl)>0) {
      vl = Math.round(this.$globalStore.config.epargne()*parseFloat(vl))
    }
    var jf_ = this.$refs.freq.$refs.input.value;
    var jf=jf_;
    if (jf_==1) {
      jf="";
     }
      var gg= this.$globalStore.cards.slice();
      gg.splice(this.cardid,1);
      var fff=gg.filter(c=>c.epargneOpts.epargne!="rien").map(c=>c.epargneOpts).map(c=>this.calculeMensualite(c.valeur,c.frequence,c.interval)).reduce((a,b)=>a+b,0) 
    // console.log(this.$globalStore.config.epargnePerMonth,fff);
    var ml=this.calculeMensualite(vl,jf_,value);
    var reste =(parseFloat(this.$globalStore.config.epargne())-parseFloat(fff));
      this.$set(this,"text", vl+"€ par "+jf + " " +text + "=> "+ml+"€ par Mois ("+Math.round(ml/this.$globalStore.config.epargne()*100.)+"%) ["+reste+"€|"+this.$globalStore.config.epargne()+"€] ")
    },
    checkval(d_,i){
      if (this.$refs.okButtonA.firstChild.data=="Validé") {
        this.$refs.okButtonA.firstChild.data="OK"
      }
      var d=this.$refs["valeur"].$refs.input.value;
      if (parseFloat(d) < 1 && parseFloat(d)>0) {
        this.tl="%"
      }else{
        this.tl="euro"
      }
      this.changeText()
      var vl=parseFloat(this.$refs["valeur"].$refs.input.value);
    if (vl < 1 && vl>0) {
      vl = Math.round(this.$globalStore.config.epargne()*parseFloat(vl))
    }
    // console.log(this.$globalStore.config.epargnePerMonth)
      var gg= this.$globalStore.cards.slice();
       var e = this.$refs.interval.$refs.native_control;
    var value=e.options[e.selectedIndex].value;// get selected option value
    var text=e.options[e.selectedIndex].text;
      gg.splice(this.cardid,1);
      var fff=gg.filter(c=>c.epargneOpts.epargne!="rien").map(c=>c.epargneOpts).map(c=>this.calculeMensualite(c.valeur,c.frequence,c.interval)).reduce((a,b)=>a+b,0) + this.calculeMensualite(vl,this.$refs.freq.$refs.input.value,value);
      this.$refs.okButtonA.disabled=parseInt(this.$globalStore.config.epargne()) <parseInt(fff)
      
      
    },
    calculeMensualite(val,freq,interval){
      var vl=val;
    if (vl < 1 && vl>0) {
      val = Math.round(this.$globalStore.config.epargne()*parseFloat(vl))
    }
    console.log(val,freq,interval);
      if (interval=="a") {
        return (31/freq)*val
      }else if (interval=="b") {
        return (4/freq)*val
      }else {
        return val/freq
      }
    },
    okA(){
       var e = this.$refs.interval.$refs.native_control;
      var value=e.options[e.selectedIndex].value;// get selected option value
          var text=e.options[e.selectedIndex].text;
      var d=this.$refs["valeur"].$refs.input.value;

      this.card.epargneOpts.epargne="a"
      this.card.epargneOpts.frequence=this.$refs.freq.$refs.input.value;
       this.card.epargneOpts.interval=value;
       this.card.epargneOpts.valeur=d;
       this.card.epargneOpts.meta={valeurMensualite:this.calculeMensualite(d,this.$refs.freq.$refs.input.value,value)};
       // console.log(this.$refs.okButtonA)
       this.$refs.okButtonA.firstChild.data="Validé"


    },
    changeActivation(o){
      console.log(o);
      é
       this.focus()
    },
    addDepense(){
      this.modifyOK=true;
      var previous= this.getDepenses().map((d)=>d.value).reduce((a,b)=>a+b,0);
      this.modif={label:"Dépense", value: 0,comment : (i)=> {
          console.log(i);
          // this.card.transactions
      }, ok: (i,i2)=>{
        this.card.transactions.push({quoi:"depense",  
            comment:i2,

          // id:this.$utils.getRandomString(),
                  value: parseFloat(i) ,previous: previous,
        date:moment().format("MMMM YYYY"),dateO:Date.parse(moment())})
      }};

       this.focus()
    },
    editMax(){
      this.modifyOK=true;
      var previous= this.card.max;
      this.modif={label:"But", value: this.card.max, ok: (i)=>{
        this.card.max=i
this.card.transactions.push({quoi:"max",
   // id:this.$utils.getRandomString(),
        value: this.card.max,previous:previous,
        date:moment().format("MMMM YYYY"),dateO:Date.parse(moment())})

      }}
      

       this.focus()
    },
    changeTitle(){
       this.modifyOK=true;
      this.modif={label:"Title", value: this.card.title, ok: (i)=>this.card.title=i}
       this.focus()
    },
    changeEpargne(){
      this.epargne=this.$refs.epargne.$refs.native_control.value;
      this.changeText();
    },
    focus(){
            setTimeout(x => {
                this.$nextTick(() => this.$refs.in.focus())    
              }, 0);
    },
    checkEpargneDispo(ii,io){
      var cc=this.$globalStore.cards.slice()
      cc.splice(io,1)
      console.log(cc.map((a)=>parseInt(a.solde)).reduce((a,b)=>a+b,0)+ii,parseInt(this.$globalStore.config.epargne))
      return cc.map((a)=>parseInt(a.solde)).reduce((a,b)=>a+b,0)+ii>(parseInt(this.$globalStore.config.epargne) || 100000000000)
    }
  },
  data (){
    return {
      modifyOK: false,
      text:"",
      tl:"euro",
      epargne: (this.$globalStore.cards[this.$route.params.id].epargneOpts || {}).epargne ,
      modif: {label:"",value:""},
      config: this.$globalStore.config,
      cardid:this.$route.params.id,
      card : {...{title:"Default",
        // id:this.$utils.getRandomString(),
      solde:0,max:100, activation: true,epargneOpts:{epargne:"rien",frequence:1,interval:"a",valeur:"0",meta:{}}, base:0,transactions:[], date: new Date()},
              ...this.$globalStore.cards[this.$route.params.id]}
    }
  },
  computed : {

getDepenses2(){
      var gg=this.getDepenses().map((e)=>e.value).reduce((a,b)=>a+b,0);
      return parseInt(gg);
    },
    getDepenses3(){
      var gg=this.getDepenses().map((e)=>e.value).reduce((a,b)=>a+b,0);
      return parseInt(parseInt(gg)/(parseFloat(this.card.solde)+this.solde2)*100);
    },
    getDepenses4(){
      var gg=this.getDepenses().map((e)=>e.value).reduce((a,b)=>a+b,0);
      return parseInt((parseFloat(this.card.solde)+this.solde2)-gg);
    },
    solde2 (){
      if (this.card.epargneOpts.meta == undefined || this.card.epargneOpts.meta.valeurMensualite==undefined) {
        return 0;
      }
      var nbMonths = (this.$utils.diffMonths(this.config.dateFin,this.card.date));
      var base = this.card.base || 0;
      var toEpargned = this.card.epargneOpts.meta.valeurMensualite;
      var months = [];
      var dateB = this.config.date;
      // var toEpargned2= base+toEpargned >this.card.max ? this.card.max -base : toEpargned

      // this.$utils.range(0,nbMonths).forEach((a)=>{
      //   // console.log(a);
      //   months.push({valueOrig:toEpargned,
      //               date:moment(dateB).startOf("month").add(a,'months').format("MMMM"),
      //                 value:base+toEpargned})
      //   base+=toEpargned;
      // })
      
      return Math.min(nbMonths*toEpargned,parseFloat(this.card.max)-parseFloat(this.card.solde));
    },
    getTransactions(){
      var fg= this.card.transactions.filter((e)=>Object.keys(e).length>0 && e.quoi!="depense");
      //console.log(fg);
      return fg;
    }, 
    pg2() {
      var g= this.getDepenses().map((e)=>e.value).reduce((a,b)=>a+b,0);
      return parseFloat(g/(parseFloat(this.card.solde)+this.solde2)) || 0;
    },
    pg() {
      return parseFloat((parseFloat(this.card.solde)+this.solde2)/parseFloat(this.card.max)) || 0;
    },
    months(){
      return "("+(this.$utils.diffMonths(this.config.dateFin,this.card.date))+" mois)" 
    }
  },
  watch:{
    card:{
        handler: function(newVal, oldVal) { // watch it
        // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
        // console.log(this.$globalStore.cards,this.cardid,newVal);
        // this.$globalStore.cards[parseInt(this.cardid)]=newVal;
      this.$set(this.$globalStore.cards,parseInt(this.cardid),newVal);
      },
      deep: true
      
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
hr {
  width: 90%;
    text-align: left;
    margin-left: 0px;
}
.kk{
  text-align : center;
}
.HJgu2I0ZqU{
  width: 800px;
  height: 50px;
}
#rywc8AWcL {
  --mdc-theme-primary: rgb(83, 58, 183);
  --mdc-theme-secondary: #f44336;
  --mdc-theme-background: #ffffff;
  position: relative;
  margin-left:80px;
  background-color: #ffffff;
  overflow: hidden;
  width: calc(100vw - 290px);
  top : 20px;
  margin-right:0px;
  height: 100%;
}

.SkMxvRbqL {

  text-overflow: ellipsis;
  text-align: center;
  font-size: 37px;
  border-right-width: 2px;
  border-right-color: darkblue;
  border-right-style: solid;
  background-color: rgb(83, 58, 183);
  color: rgb(255, 255, 255);
  position: relative;
  height: 50px;
  padding:0;
  margin:0;
}

.SkMxvRbqL3 {
    --mdc-theme-primary: red !important;
    --mdc-theme-secondary: red !important;
  background-color: red !important;

}

.SkMxvRbqL2 {
  text-overflow: ellipsis;
  text-align: center;
  border:0;
  outline: 0;
  font-size: 37px;
  background-color: rgb(83, 58, 183);
  color: rgb(255, 255, 255);
  position: relative;
  height: 50px;
  padding:0;
  margin:0;
}
.noSelect::selection {
    background-color: transparent;
    color: inherit;
}

.SygLSwRbqI {
  --mdc-theme-secondary: rgb(83, 58, 183) ;
  --mdc-theme-background: rgb(0, 0, 0);
  position: absolute;
  width: 130px;
  right:240px;
  height: 46px;
  font-size:40px
}

.BJfnwR-9U {
  font-size: 40px;
  position: relative;
  height: 48px;
  margin-right:20px;
}

.SyhyOR-qL {
  text-overflow: ellipsis;
  text-align: center;
  font-size: 40px;
  border-width: 1px;
  border-radius: 1px;
  border-style: solid;
  background-color: rgb(83, 58, 183);
  color: rgb(255, 255, 255);
  position: relative;
  height: 49px;
}

.HJDWtC-5L {
  overflow: hidden;
  text-overflow: ellipsis;
  position: absolute;
  width: 132px;
  height: 23px;
  top: 521px;
  left: 197px;
}

.HyxOmFCW5L {
  overflow: hidden;
  text-overflow: ellipsis;
  position: absolute;
  width: 166px;
  height: 24px;
  top: 575px;
  left: 165px;
}

</style>

<style>



.SJXBnuA-qU {
  margin-left: -200px;
}
#rywc8AWcL .SJXBnuA-qU.mdc-select > .mdc-floating-label {
font-size: 35px;
 line-height:normal;
 width: 100%;

}
#rywc8AWcL .SJXBnuA-qU.mdc-select optgroup  {
  font-size: 25px !important;
}
#rywc8AWcL .SJXBnuA-qU.mdc-select {
  height: 100px;
  text-align:center;
 
}
#rywc8AWcL .SJXBnuA-qU.mdc-select > .mdc-select__native-control {
padding-top: 70px;


}
optgroup { font-size:44px !important; }
</style>