// inspired by https://github.com/emilyxxie/green_rain
// displays The Selfish Gene Matrix

var streams = [];
var dna_c = [65,84,71, 67];
var symbolSize = 30;
var fadeInterval =.6;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(0);
	var x = 0;
	for( var i = 0; i <= width / symbolSize ; i++){
			var stream = new Stream();
			stream.generateSymbols(x, random(-1000,0));
			streams.push( stream );
			x += symbolSize ;
	}
	textFont('Consolas');
	textSize(symbolSize);
}

function renderGene(){
	push();
	fill(255,255,255,180);
	textSize(100);
	textAlign(CENTER);
	text("The\nSelfish Gene",width/2, height/2);
	pop();
}

function draw() {
	background(0, 150);
	renderGene();
	streams.forEach(function(stream){
		stream.render();
	});
}

function Symbol(x, y, speed, first, opacity ){
	this.x = x;
	this.y = y;
	this.value;
	this.switchInterval = round(random(2,25));
	this.speed = speed;
	this.first = first;
	this.opacity = opacity;

	this.setToRandomSymbol = function(){
		if( frameCount % this.switchInterval == 0 ){
			this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
		}
	}

	this.setRandomDNA = function(){
		//this.value = gene[round( random(0, gene.length))]
		if( frameCount % this.switchInterval == 0 ){
			this.value = String.fromCharCode(random( dna_c ));
		}
	}

	this.rain = function() {
		this.y = (this.y >= height) ? 0 : this.y += this.speed;
	}

}

function Stream(){
	this.symbols = [];
	this.totalSymbols = round( random(5, 50));
	this.speed = random( 5, 50 );

	this.generateSymbols = function(x, y){
		var opacity = 255;
		var first = round( random(0,4)) == 1;
		for (var i =0; i <= this.totalSymbols; i++){
			symbol = new Symbol(x, y, this.speed, first, opacity);
			symbol.setRandomDNA();
			// symbol.setToRandomSymbol();
			this.symbols.push(symbol);
			opacity -= (255 / this.totalSymbols) / fadeInterval;
			y -= symbolSize;
			first = false;
		}
	}

	this.render = function(){
		this.symbols.forEach( function(symbol){
			if( symbol.first ){
				fill(255, 0, 0, symbol.opacity);
			}
			else{
				fill(0, 255, 70, symbol.opacity);
			}
				text(symbol.value, symbol.x, symbol.y);
				symbol.rain();
				symbol.setRandomDNA();
				// symbol.setToRandomSymbol();
			});
	}

}



