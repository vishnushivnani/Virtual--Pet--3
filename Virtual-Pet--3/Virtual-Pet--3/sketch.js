var dog, happyDog, database, foodStock;
var dogImage1, dogImage2, name;
var fedTime, lastFed, foodObj;
var feedPetButton, addFoodButton;
var thanks;
var gameState = "play";


function preload() {
  sadDog = loadImage("images/dog2.png"); 
  happyDog = loadImage("images/dog1.png");
  bg        = loadImage("images/bg.jpg"); 
  bathingDog = loadImage("images/bathingdog.png");
  playingDog = loadImage("images/playingdog.png");
  sleepingDog = loadImage("images/sleepingDog.png")
}

function setup() {
  createCanvas(800, 800);
  
  database = firebase.database();
  fedTime = database.ref("feedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
  foodsRef = database.ref("Food");
  foodsRef.on("value",function(data){
    foodStock = data.val();
  });
  readState = database.ref('gameState');
    readState.on("value",function(data){
        gameState =data.val();
    })

  
  dog = createSprite(400,500,10,10);
  dog.addImage(sadDog);
  dog.scale = 0.3;

  foodObj = new Food();

 

  addFoodButton = createButton("ADD FOOD");
  addFoodButton.position(900,60);
  addFoodButton.mousePressed(addFoods);
  feedPetButton = createButton("FEED DOG");
  feedPetButton.position(1000,60);
  feedPetButton.mousePressed(feedDog);

}

function draw() {  
  background(bg);

  foodObj.display();
  foodObj.getFoodStock();

  drawSprites();

  textFont("georgia");
  fill(255,165,223);
  strokeWeight(3);
  stroke(0);
  if(foodStock !== undefined) {
    textSize(35);
    text("Food Remaining: "+foodStock, 250, 700);
  }
  if(lastFed>=12) {
    text("Last Fed: "+lastFed%12+" PM", 10, 30);
  } else if(lastFed===0) {
    text("Last Fed: Never", 10, 30);
  } else {
    text("Last Fed: "+lastFed + " AM", 10, 30);
  }
  
if(keyWentUp(DOWN_ARROW)){
    
  dog.addImage(bathingDog);
  feedPetButton.hide();
  addFoodButton.hide();
  gameState = "bathing"
  
}

if(keyWentUp(LEFT_ARROW)){
 
  dog.addImage(sleepingDog);
  dog.scale = 0.3
  
  
}

if(keyWentUp(RIGHT_ARROW)){
 
  dog.addImage(playingDog);
  dog.scale = 0.3
  feedPetButton.hide();
  addFoodButton.hide();
  gameState = "playing"
 
  
  
}

if(keyCode === 32){
  
  dog.addImage(sadDog);
  dog.scale = 0.3
  addFoodButton.show();
  feedPetButton.show();
  gameState = "hungry"
}

}

function read(data){
foodStock = data.val();
}

function decreaseFood(){
if(keyWentDown(UP_ARROW)){
foodRef = database.ref("Food");
foodStock = foodStock - 1;
foodRef.set(foodStock);
dog.addImage(happyDog);
foodObj.x = 350;
foodObj.y = 200;
foodObj.scale = 0.1;

}

if(keyWentUp(UP_ARROW)){
  
  foodStock = foodStock;
  dog.addImage(happyDog);
  fill("yellow");
  text('Thank you 🥳🥳',10,80);
  foodObj.x = 250;
  foodObj.y = 400;
  foodObj.scale = 0.2;
  
}


}


function addFoods() {
  dog.addImage(sadDog);
  foodStock++;
  database.ref("/").update({
    Food: foodStock
  });
}

function feedDog() {
  dog.addImage(happyDog);
  foodObj.deductFood(foodStock);
  database.ref("/").update({
    Food: foodStock,
    feedTime: hour()
  })
  thanks = text("thanks for feeding me ",650,300);
  //thanks.display();
  
}
function update(state){

  database.ref('/').update({
    gameState:state
  })

}
