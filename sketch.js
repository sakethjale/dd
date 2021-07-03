var dog,sadDog,happyDog;
var button1;
var foodObj,foodStock,foodS;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database()
  createCanvas(1000,400);

  foodObj=new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;


  button1=createButton("feed dog")
  button1.position(200,200)
  button1.mousePressed(feedDog)

 
  button2=createButton("add Food")
  button2.position(300,200)
  button2.mousePressed(addFood)

}

function draw() {
  background(46,139,87);

  foodObj.display()

  
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

//function to update food stock and last fed time
function feedDog(){
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock
  })
}
//function to add food in stock
function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}