const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var invisiblegrd;
var Insgrd1;
var Island1,Island2,Island3,Island4;
var bottle1,bottle2,bottle3,bottle4,bottle5,bottle6,bottle7;
var ball,sling1;
var hurdle;
var score=0;
var count=0;
var gameState=0;

function preload(){
 bgimg=loadImage("Bg.png");
 bgimg2=loadImage("starter.jpg");
}

function setup() {

  createCanvas(1200,500);
  engine = Engine.create();
  world=engine.world;

  Insgrd1= new Invisiblegrd(600,600,20000,20);
  Island1= new Island(200,230);
  Island2= new Island(900,300);
  Island3= new Island(1100,300);
  Island4= new Island(1000,100);
  bottle1= new Bottle(900,250,50,90);
  bottle2= new Bottle(870,245,50,90);
  bottle3= new Bottle(930,245,50,90);
  bottle4= new Bottle(1100,250,50,90);
  bottle5= new Bottle(1070,245,50,90);
  bottle6= new Bottle(1130,245,50,90);
  bottle7= new Bottle2(1000,50,50,90);
  hurdle= new Hurdle(550,200,30,150);
  hurdle2=new Hurdle(700,350,200,10)
  hurdle3=new Hurdle(800,100,30,150)
  hurdle4= new Hurdle(550,200,30,150);
  hurdle5=new Hurdle(800,100,30,150)
  ball= new Ball(207,70,15);
  sling1= new SlingShot(ball.body,{x:200,y:50});
 
  Engine.run(engine);
  
}

function draw() {

  background(bgimg);
  if (gameState===0){
      background(bgimg2);
      textSize(30);
      fill("red");
      text("Press 'space' to continue...",830,480);
      if(keyCode===32){
         gameState=1;
       }
  }
  if (gameState===1){
      background("yellow");
      textSize(30);
      fill("red");
      text("*Instructions*",500,50);
      textSize(20);
      fill("blue");
      text("1. The goal of the game is to hit the bottles with ball and score higher as much as you can!",200,150);
      text("2. You have to drag and release the sling to launch the ball.",200,200);
      text("3. You can press space key to reset the ball after launching.",200,250);
      text("4. You have to score 50 points to win.",200,300);
      text("5. You have 10 chances to hit the bottles.",200,350);
      text("Enjoy playing :)",200,420);
      text("Press 's' to play",200,460);
      if(keyCode===115){
         gameState=2;
        
      }
  }

  if (gameState===2){

      noStroke();
      textSize(30);
      fill("RED");
      text("Score: " + score,1050, 50);
     
  
      Engine.update(engine);
      Insgrd1.display();
      Island1.display();
      Island2.display();
      Island3.display();
      Island4.display();
      bottle1.display(); 
      bottle2.display(); 
      bottle3.display();
      bottle4.display();
      bottle5.display();
      bottle6.display();
      bottle7.display();
      hurdle.display();
      hurdle2.display();
      hurdle3.display();
      ball.display();
      sling1.display();

    

      detectCollision(ball,bottle1);
      detectCollision(ball,bottle2);
      detectCollision(ball,bottle3);
      detectCollision(ball,bottle4);
      detectCollision(ball,bottle5);
      detectCollision(ball,bottle6);
      detectCollision(ball,bottle7);
  
      if (count>=11){
          gameState=3;
  
      }
  }

      if(gameState===3){
         if(score>=50){
            background("Yellow");
            textSize(150);
            fill('green');
            text("You Win!!",280,250);
            textSize(20);
            text("Refresh the page or press ctlr+r key to replay",400,300);
            textSize(20);
            text("Your score: "+score+"/50",500,400);
  
          }else{
               background("Yellow");
               textSize(150);
               fill('red');
               text("Gameover!",200,250);
               textSize(20);
               text("Refresh the page or press ctlr+r key to replay",400,300);
               textSize(20);
               text("Your score: "+score+"/50",500,400);
               
              } 
       }
           drawSprites();
}


function detectCollision(body1,body2){
         body1pos = body1.body.position;
         body2pos = body2.body.position;

         var distance = dist(body1pos.x,body1pos.y,body2pos.x,body2pos.y)
         if(distance <=body2.width + body1.r){
            Matter.Body.setStatic(body2.body,false);
         }
}

function keyPressed(){
        if(keyCode === 32){
           ball.trajectory =[];
           Matter.Body.setPosition(ball.body, {x:200 , y: 50});
           sling1.attach(ball.body);
        }
}

function mouseDragged(){
         Matter.Body.setPosition(ball.body, {x: mouseX , y: mouseY});
}


function mouseReleased(){
         count+=1
         sling1.fly();
}
