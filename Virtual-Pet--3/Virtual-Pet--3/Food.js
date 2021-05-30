class Food {
    constructor() {
        this.image = loadImage("images/Bone.png");
        this.foodStock = database.ref("Food");
        this.foodStock = foodStock;
        this.lastfed = database.ref("feedTime");
        this.petName =  createInput("Name of pet")
        this.saveButton  = createButton('save')
        this.savedName = createElement('h2');

    }
    

    

    getFoodStock() {
        var foodRef = database.ref("Food");
        foodRef.on("value",function(data){
            foodStock = data.val();
        })
    }
        
    updateFoodStock(food) {
        database.ref("/").update({
            Food : food
        })
    }
    
    deductFood(x) {
        if(x <= 0) {
            x = 0;
          } else {
            x--;
          }
        database.ref("/").update({
            Food: x
        })
    }

    display() {
      var Title  = createElement('h1');
      Title.html("Your own pet");
      Title.position(650,50);

      this.saveButton.position(500,800);
      this.petName.position(450,700);

      //button functions
      this.saveButton.mousePressed(()=>{
        this.saveButton.hide();
        this.petName.hide();
        var petsName = this.petName.value();
        this.savedName.html("Hy I Am Your Pet  "+ petsName +"🐶");
        this.savedName.position(500,160)

      })


        var x = 80
        var y = 100;
        imageMode(CENTER);
        if(foodStock!==0) {
            for(var i=0;i < foodStock;i++) {
                if(i%10===0) {
                    x=80;
                    y=y+50;
                }
                image(this.image,y,x,50,50);
                x = x+30;
            }
        }
    }

}
