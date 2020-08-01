//the box class
class Box{
    constructor(x, y, width, height){
        var options = {
            //some changes in the properties of the box
            isStatic: true,
            friction:0.3,
            density:1.0
        }

        this.body = Bodies.rectangle(x, y, width, height, options);//creates the box according to the physics engine
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;

        World.add(world, this.body);//adds this box to the world so that it acts according to the physics laws
    }

    display(){
        //function for displaying the objects
        var position = this.body.position;
        rectMode(CENTER);
        fill("red");
        noStroke();
        rect(position.x, position.y, this.width, this.height); 
    }
}