var width;
var height;
var rho = 28;
var sigma = 10;
var beta = 8/3;
var dt = 0.01;
let array = [[]];
var numberOfLines = 50;
var scaleFactor = 10;
var maxPoints = 30;
class p{

    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
    scale(scale){
        return new p(this.x * scale, this.y * scale, this.z * scale);
    }
}

function setup(){
    width = window.innerWidth-10;
    height = window.innerHeight-10;
    createCanvas(width, height, WEBGL);

    frameRate(60);
    background(0);
    
    for(let number = 0; number < numberOfLines; number++){
        array.push([]);
    }
    for(let number = 0; number < numberOfLines; number++){
        var point = new p(number/5,number/5,number/5);
        array[number].push(point);
    }
    
    
}

function draw(){
    
    strokeWeight(0.5);
    orbitControl();

    for(let number = 0; number < numberOfLines; number++){
        if(array[number].length >= maxPoints){
            array[number].shift();
        }
        var lastElementOfArray = array[number].length-1;
        var p = lorenz(array[number][lastElementOfArray]);
        array[number].push(p);
    }
    
    
    noFill();
    
    clear();
    
    for(let number = 0; number < numberOfLines; number++){
        
        beginShape();
        for(let i = 0; i < array[number].length; i++){
            var displayPoint = array[number][i].scale(scaleFactor);
            var color = i*255/array[number].length;
            stroke(color*1.6, color+30, color*3);
            // point(displayPoint.x, displayPoint.y, displayPoint.z);
            vertex(displayPoint.x, displayPoint.y, displayPoint.z);
        }
        endShape(); 
    }
    
    
}

function lorenz(point){
    var x = point.x;
    var y = point.y;
    var z = point.z;

    var dx = (sigma*(y-x))*dt;
    var dy = (x*(rho-z) -y)*dt;
    var dz = (x*y - beta * z)*dt;

    return new p(x+dx, y+dy, z+dz);
}
