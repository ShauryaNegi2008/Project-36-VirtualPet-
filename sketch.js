var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood;
var foodObj;
var foodA, fedtime;
var rand,obj;

let feed, lastfed;

function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  rand = Math.round(random(0, 12))
 
 
  foodObj = new Food();


  var rand2 = database.ref('FeedTime');
  rand2.on("value",(data)=>{
    obj=data.val()
  })




  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;


  feed = createButton("Feed Milk")
  feed.position(700, 95)
  feed.mousePressed(deductFood)

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46, 139, 87);
  foodObj.display();
textSize(15);
fill(255,255,254)
  if(obj>=12){
    text(obj+"PM",400, 30)
  }else if(obj==0){
  text(12+"AM",400, 30)
  }else{
  if (rand <= 12) {
    text("Last Fed:" + rand + "AM", 400, 30)
  }
  }
  ;

changeTime();
  if (frameCount % 180 === 0) {
    dog.addImage(sadDog);
  }
  drawSprites();
}


function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
  foodA = foodS - 1;
  console.log(foodA)
}


function feedDog() {
  dog.addImage(happyDog);
}


function changeTime() {
  database.ref('/').update({
    "FeedTime": rand
  })

}
function addFoods() {
  foodS++;
  database.ref('/').update({
    "Food": foodS
  })


}

function deductFood() {
  if (foodA > -1) {
    database.ref('/').update({
      "Food": foodA
    })
    feedDog();
  }
}
