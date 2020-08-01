var helicopterIMG, helicopterSprite;
var packageSprite, packageIMG;

var packageBody, ground;

//the objects stored in their constants
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var boxSide1, boxSide2, boxSide3;
var touchDetectorSprite;

function preload() {
	//loads the images
	helicopterIMG = loadImage("helicopter.png");
	packageIMG = loadImage("package.png");
}

function setup() {
	createCanvas(1500, 700);
	rectMode(CENTER);//makes the rectangle with respect to its center and not its top left corner

	//creates the ground sprite
	groundSprite = createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor = color(255);
	groundSprite.setCollider("rectangle", 0, 0, width, 50);

	//creates the package sprite
	packageSprite=createSprite(200, 80, 10,10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale=0.2;

	//creates the helicopter sprite
	helicopterSprite = createSprite(200, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale = 0.6;
	helicopterSprite.velocityX = 10;

	engine = Engine.create();//creates the engine and stores it in engine variable
	world = engine.world;//stores the world created into the world variable

	//makes the package object and adds it to the physics engine via physics engine's world
	packageBody = Bodies.circle(200 , 200 , 5 , {restitution:0, isStatic:true});
	World.add(world, packageBody);
	
	//makes the ground object and adds it to the physics engine via physics engine's world
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true, friction: 0} );
 	World.add(world, ground);

	//makes the box's sides classes as objects
	boxSide1 = new Box(750, 635, 200, 20);
	boxSide2 = new Box(640, 595, 20, 100);
	boxSide3 = new Box(860, 595, 20, 100);

	//this sprite will detect whether the packet was dropped inside the box or not
	touchDetectorSprite = createSprite(boxSide1.x, boxSide2.y, boxSide1.width, boxSide2.height);
	touchDetectorSprite.visible = false;

	Engine.run(engine);//updates the physics engine continuously
}


function draw() {
  	background(0, 0, 0);//clears the background

	rectMode(CENTER);

	packageSprite.y = packageBody.position.y;

	if(packageSprite.y == 200){
		//make the packet move with the helicopter when the -acket is not released
		packageSprite.x = helicopterSprite.x;
	} 	

	if(keyDown(DOWN_ARROW)) {
		//makes the packet fall when down arrow is pressed
		Body.setStatic(packageBody, false);
	}

	//displays the objects
	boxSide1.display();
	boxSide2.display();
	boxSide3.display();

	if(packageSprite.isTouching(touchDetectorSprite)){
		helicopterSprite.velocityX = 0;//stops the helicopter
		//displays this instruction when the packet is dropped inside the box
		displayText("YAY! MISSION COMPLETE.", "green", 600, height/2);
	}
	else if(packageSprite.isTouching(groundSprite) || helicopterSprite.x > width){
		helicopterSprite.destroy();//prevents memory leak
		//displays this instuction when the packet is dropped outside the box or the helicopter crosses the canvas
		displayText("YOU LOSE!", "red", 650, height/2);
	}
	else if(helicopterSprite.x < width){
		//displays this instruction when the helicopter is still in the canvas
		displayText("PRESS DOWN ARROW KEY TO RELEASE THE PACKET.", "white", 500, height/2);
	}

	drawSprites();//draws the sprites
}