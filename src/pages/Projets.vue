<template>
<div id="SJO6HRbqI">
  <div style="position: absolute; top:5px;left:50%;font-size:50px; transform: translateX(-50%)">Projets</div>
  <div style="position: absolute; top:65px;left:50%;font-size:30px; transform: translateX(-50%)">{{soldes}}</div>

  <div style="position: absolute; top:95px;left:50%;font-size:30px; transform: translateX(-50%)">{{total}}</div>
  <div style="position: absolute; top:125px;left:50%;font-size:30px; transform: translateX(-50%);color:green;width:100%;">{{epargne}}</div>

  <div style="position: absolute; top:155px;left:50%;font-size:30px; transform: translateX(-50%);color:blue;">{{$globalStore.config.epargne}}€ déja épargné </div>

  <div class="cards">
    <div class="rJUmICb9I">
    <mdc-button class="S16NL0WcU" raised @click="add">+</mdc-button>
  </div>
  <mdc-card class="r1rqyUC-cU" v-for="(card,index) in cards">
    <mdc-card-media class="SyI9JIRZ5I" height="160" src="https://material-components-web.appspot.com/images/16-9.jpg"></mdc-card-media>
  
    <mdc-card-header class="Syv5JL0-qU" :title="card.title" :subtitle="sub(index)"></mdc-card-header>
  
    <mdc-card-actions class="rJdckLRZ9L">
      <mdc-card-action-button class="BJtqyLAW5I" @click="modify(index)">Voir/Modifier</mdc-card-action-button>

      <mdc-card-action-button class="BJtqyLAW5I" @click="sup(index)">Supprimer</mdc-card-action-button>

    </mdc-card-actions>
  </mdc-card>

 </div>
</div>
</template>

<script>
export default {
  name: 'projets',
  data(){
    return {
      cards : this.$globalStore.cards,
      config : this.$globalStore.config
    }
  },
  beforeMount(){
if (this.config.months!=0) {
  console.log("UPDADE")
  this.updateCards()
}
  },
  computed:{
    soldes(){
      return this.cards.map(c=>parseFloat(c.solde)).reduce((a,b)=>a+b,0)+"€ Épargné"
    },
    total(){
      return this.cards.map(c=>parseFloat(c.max)).reduce((a,b)=>a+b,0)+"€ But Total"
    },
    epargne(){
       return this.cards.filter(a=>(a.epargneOpts||{}).epargne!="rien").map(c=>parseFloat(c.epargneOpts.meta.valeurMensualite)).reduce((a,b)=>a+b,0)+"€ À Épargné par mois "
    }
  },
  methods : {
    sub(index_){
      var index=parseInt(index_) || 0
      var ep=this.cards[index].epargneOpts.epargne!="rien" ? `
[Epargne : ${this.cards[index].epargneOpts.meta.valeurMensualite}€/Mois]` : ""
       var ttt=this.cards[index].solde+"€/"+this.cards[index].max+"€ ("+Math.round((parseFloat(this.cards[index].solde/parseInt(this.cards[index].max)||0)||0)*100)+"%) "+ep
       return ttt;
    },
    add(){
      this.cards.push({title:"newProject",solde:0,max:0,activation:true})
    },
    sup(index_){
      var index=parseInt(index_) || 0
      this.$globalStore.cards.splice(index,1)
    },
    modify(i){
      console.log(i)
       this.$router.push("projet/"+i)
    },
    updateCards(){
      var  cg=this.cards.map((c,i)=>this.updateCard(i))
      this.$set(this.$globalStore.cards,cg);
      this.$set(this.$globalStore.config,"months",0);
    },
    updateCard(i){
      console.log(this.cards,i,this.cards[i]);
      var ci=this.cards[i];
      if (ci.epargneOpts) {
        console.log("epargne "+ci.title)
      }else{
         console.log("nothing to do "+ci.title)
      }
      return ci;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cards {
  margin-top:190px;
  flex-wrap: wrap;
   display: flex;
   justify-content: start;
}
.r1rqyUC-cU {
  padding : 5px;
}
#SJO6HRbqI {
  --mdc-theme-primary: #673ab7;
  --mdc-theme-secondary: #f44336;
  --mdc-theme-background: #ffffff;
  position: relative;
  margin: auto;
  background-color: #ffffff;
  overflow: hidden;
  width: 100%;
  height: 100%;
  height: 100vh;
}

.r1rqyUC-cU {
  white-space: pre-line;
  background-color: #fff;
  position:relative;
  width: 350px;
  height: 350px;


}

.BybgICZ9I {
  background-color: #fff;
  position: absolute;
  width: 350px;
  height: 350px;
  top: 90px;
  left: 402px;
}

.S16NL0WcU {
  text-align: center;
  font-size: 100px;
  font-weight: bold;
  position: relative;
  width: 350px;
  padding : 5px;
  height: 350px;

}

.rJUmICb9I {
  border-color: rgba(0, 0, 0, 0.15);
  border-style: solid;
  border-width: 1px;
  width: 350px;
    position: relative;
  height: 350px;

}

</style>
