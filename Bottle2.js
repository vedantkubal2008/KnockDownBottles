class Bottle2 {
    constructor(x, y, width, height){
      var option = { 
        isStatic: true,
        'friction':0.5,
        'density':20,
      }
          this.body = Bodies.rectangle(x,y,width,height, option);
          this.width = width;
          this.height = height;
          this.Image= loadImage("b.png");
          World.add(world, this.body);
     }
             
display(){
          image(this.Image,this.body.position.x, this.body.position.y,110,90)
          if(this.body.position.y>200 && this.body.position.x<1200 && this.body.speed>2){
             score=score+1;
          }
}

}
