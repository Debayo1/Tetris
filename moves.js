

alert("Play using arrow keys or WASD")
onload = ()=>{
var color,
    pos,
    rot,
    globalTout,
    rand = Math.floor(Math.random()*7),
    speed = 1000,
    level = 1,
    state = 0;
const Field = [];
const preview =['<rect width="104.64"height="26.16"fill="crimson"x="0"y="39.24"></rect>','<rect width="52.32"height="52.32"fill="blue"x="26.16" y="26.16"></rect>','<rect width="78.48"height="26.16"fill="cyan"x="13.08"y="52.32"></rect><rect width="26.16"height="26.16"fill="cyan"x="39.24"y="26.16"></rect>','<rect width="78.48"height="26.16"fill="magenta"x="13.08"y="52.32"></rect><rect width="26.16"height="26.16"fill="magenta"x="13.08"y="26.16"></rect>','<rect width="78.48"height="26.16"fill="orange"x="13.08"y="52.32"></rect><rect width="26.16"height="26.16"fill="orange"x="65.4"y="26.16"></rect>','<rect width="52.32"height="26.16"fill="LawnGreen"x="13.08"y="52.32"></rect><rect width="52.32"height="26.16"fill="LawnGreen"x="39.24"y="26.16"></rect>','<rect width="52.32"height="26.16"fill="yellow"x="39.24"y="52.32"></rect><rect width="52.32"height="26.16"fill="yellow"x="13.08"y="26.16"></rect>'];



for(let n = 0,container = document.getElementById("field"); n < 200;++n){
    let square = document.createElement("div");
    square.id = n;
    if(n%10!==0){
        container.appendChild(square);
    }else{
        container.appendChild(document.createElement("br"));
        container.appendChild(square);
    }
}
const reload = ()=>{
    document.getElementById("score").innerText = "0";
    clearInterval(globalTout);
    state = 0;
    speed = 1000;
    level = 1;
    rand = Math.floor(Math.random()*7);
    for (let i = 0;i<200;i++){
        Field[i]="";
        document.getElementById(i).style.backgroundColor = "black";
    }
    genTile();
}
const score = (arg)=>{
   let points = Number(document.getElementById("score").innerText) + arg; document.getElementById("score").innerText = points;
   if(points>=level*20000){
       level++;
       speed-=100;
   }
    
}
const checkField = ()=>{

    for(let i=0;i<200;i+=10){
        if(Field[i]==="fixed"){
         let counter=1;
         for(let n=i+1;n<=i+9;n++){
             if(Field[n]==="fixed"){
                 counter++;
             }else{
                 break;
            }
         }
         if(counter===10){
               score(2000);
               for(let d=i+9;d>=20;d--){
                document.getElementById(d).style.backgroundColor = document.getElementById(d-10).style.backgroundColor;
               Field[d]=Field[d-10];
            };
         }
      }
   }
}
const rotate = ()=>{
      if(color==="blue"){
          return;
      }
      let nextPos=[null,null,null,null];
      for(let i=0;i<4;i++){
          nextPos[i]=pos[i]+rot[state][i];
         }
      let bool = nextPos.some((val)=>val%10===0) && nextPos.some((val)=>(val+1)%10===0);

      if(!bool && nextPos.every((val)=>val>=0 && val<200 && Field[val]!=="fixed")){
         erase();
         pos=[...nextPos];
         draw();
         state=(state+1)%4;
      }
   
}
const down = ()=>{
    if(pos.every((val)=>(val+10)<200 && Field[val+10]!=="fixed")) {
        erase();
        for(let i=0;i<4;i++) {
            pos[i]+=10;
        }
        draw();

    }else{
        for(let val of pos) {
            if(val<=39) {
               alert("YOU LOST"+"\n"+"Play Again"+`\nLevel: ${level}`);
//               window.location.reload();
                reload();
                return;
            }
            Field[val]="fixed";
         }
    score(500); 
    checkField();    
    clearInterval(globalTout); 
    genTile();
    }

}
const left = ()=>{
    if(pos.every((val)=>val%10!=0 && Field[val-1]!=="fixed")){
        erase();
        for(let i=0;i<4;i++){
            pos[i]-=1;
        }
        draw();
    }
}
const right = ()=>{
    if(pos.every((val)=>(val+1)%10!=0 && Field[val+1]!=="fixed")){
        erase();
        for(let i=0;i<4;i++){
            pos[i]+=1;
        }
        draw();
    }
}
const drop = ()=>{
    clearInterval(globalTout);
    globalTout=setInterval(down,0);
}
const erase = ()=>{
    for(let val of pos){
        document.getElementById(val).style.backgroundColor = "black";
      }  
   }
const draw = ()=>{
   let val;
       for(val of pos){
           document.getElementById(val).style.backgroundColor=color;
       }
}
const genTile = ()=>{
 switch (rand){
   case 0:
    pos=[4,4+1,4+2,4+3];
    color="crimson";
    rot=[[-9,0, 9, 18],[ 9,0,-9,-18],[-9,0, 9, 18],[ 9,0,-9,-18]];
    break;
   case 1:
    pos=[4,4+1,4+10,4+11];
    color="blue";
    break;
   case 2:
    pos=[4,4+9,4+10,4+11];
    color="cyan";
    rot=[[11,-9,0, 9],[9,11,0,-11],[-11,9,0,-9],[-9,-11,0, 11]];
    break;
   case 3:
    pos=[4,4+10,4+11,4+12];
    color="magenta";
    rot=[[2,-9,0,9],[20,11,0,-11],[-2,9,0,-9],[-20,-11,0,11 ]]
    break;
   case 4:
    pos=[4,4+8,4+9,4+10];
    color="orange";
    rot=[[20,-9,0,9],[-2,11,0,-11 ],[-20,9,0,-9],[2,-11,0,11]];
    break;
   case 5:
    pos=[4,4+1,4+9,4+10];
    color="LawnGreen";
    rot=[[0, 9,-20,-11],[0,-9, 20, 11],[0, 9,-20,-11],[0,-9, 20, 11]];
    break;
   case 6:
    pos=[4,4+1,4+11,4+12];
    color="yellow";
    rot=[[-9,0,-11,-2],[ 9,0, 11, 2],[-9,0,-11,-2],[ 9,0, 11, 2]];
    break;
   }
  state=0;
  draw();
  rand=Math.floor(Math.random()*7);
  document.getElementById("next").innerHTML = preview[rand];
globalTout=setInterval(down,speed)
}
const keyPressFunc = (e)=>{
    switch(e.key){
        case "ArrowLeft":
        case "a":
            left();
            break;
        case "ArrowRight":
        case "d":
            right();
            break;
        case "ArrowUp":
        case "w":
            rotate();
            break;
        case "ArrowDown":
        case "s":
            drop();
            break;
    }
}
const leftb = document.getElementById("left");
const rightb = document.getElementById("right");
const rotb = document.getElementById("rotate");
const dropb = document.getElementById("drop");

window.addEventListener("keypress", keyPressFunc);
dropb.addEventListener("click",drop);
leftb.addEventListener("click",left);
rightb.addEventListener("click",right);
rotb.addEventListener("click",rotate);
genTile();
}
