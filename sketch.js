
var pou, pouImg;
var fundo;
var comidas, laranjaImg, morangoImg, lancheImg, roscaImg, balaImg;
var naocomidas, tenisImg, aviaoImg;
var fundo, fundoImg;
var pontuacao = 0
var cair = 5
var ENCERRAR = 0
var estadoJogo = 1
var PLAY = 1

function preload() {
  pouImg = loadImage("Pou.webp");
  fundoImg = loadImage("fundo.jpeg");
  laranjaImg = loadImage("laranja.webp");
  morangoImg = loadImage("morango.png");
  tenisImg = loadImage("tenis.png");
  aviaoImg = loadImage("aviao.jpeg");
  lancheImg = loadImage("lanche.jpeg");
  roscaImg = loadImage("doce1.webp");
  balaImg = loadImage("doce2.png");
  resetImg = loadImage("reset.png")
  
  soundpou = loadSound("pousound.mp3")
  //carregar todas as imagens das comidas
}
function setup() {
  createCanvas(800, 475);
  fundo = createSprite(400, 1300);
  fundo.addImage(fundoImg);

  pou = createSprite(400, 400, 50, 50);
  pou.addImage(pouImg);
  pou.scale = 0.4;

  reset1 = createSprite(500, 200);
  reset1.addImage(resetImg);
  reset1.scale = 0.2
  reset1.visible = false;


  naocomidasG = new Group();
  comidasG = new Group();

  pou.debug = true//faz aparecer o raio de colisao
  pou.setCollider("rectangle", 0, 0,200,200)
  //quanto longe fica do trex a distancia
  
}

function draw() {
  background("white");
  textSize(20)
  text("vidas:" + cair, 100, 90);
  text("Pontuação:" + pontuacao, 100, 60);
  
  //if(comidasG.isTouching(pou)){
  //pontuacao = pontuacao +1
  // comidasG.destroyEach();
  //}
  /* if(naocomidasG.isTouching(pou)){
     pontuacao=  0
     naocomidasG.destroyEach();
     estadoJogo= ENCERRAR
   }*/
  if (estadoJogo === PLAY) {
    pou.x = mouseX;
    comidas();
    Naocomidas();
    reset1.visible = false;
    
    
  }
  if (cair === 0) {
    estadoJogo = ENCERRAR
    if (mousePressedOver(reset1)) {
      reset();
      console.log("clicado")
    }
  }
  if (estadoJogo === ENCERRAR) {
    soundpou.play();
    if(soundpou.isPlaying())
    {
      soundpou.stop();
    }
    comidasG.destroyEach()
    naocomidasG.destroyEach()
    comidasG.setVelocityYEach(0)
    naocomidasG.setVelocityYEach(0)
    background("lightblue")
    text("Game Over :( ", 300, 200)
    textSize(40)
    fill("black");
    reset1.visible = true;
    
   
  }

  drawSprites();
  destruir();
  destruir2();
}
function comidas() {
  if (frameCount % 35 === 0) {
    var comidas = createSprite(200, 0, 10, 40);
    comidas.x = Math.round(random(0, 750));
    comidas.velocityY = 7
    var rand = Math.round(random(1, 5));

    switch (rand) {
      case 1: comidas.addImage(morangoImg);
        comidas.scale = 0.2
        break;
      case 2: comidas.addImage(laranjaImg);
        comidas.scale = 0.09
        break;
      case 3: comidas.addImage(lancheImg);
        comidas.scale = 0.2
        break;
      case 4: comidas.addImage(roscaImg);
        comidas.scale = 0.06
        break;
      case 5: comidas.addImage(balaImg);
        comidas.scale = 0.2
      default: break;
      // colocar var rand e comidas q ele pode comer

    }
    comidasG.add(comidas);
  }
}
function Naocomidas() {
  if (frameCount % 35 === 0) {
    var naocomidas = createSprite(200, 0, 10, 40);
    naocomidas.x = Math.round(random(0, 600));
    naocomidas.velocityY = 7
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: naocomidas.addImage(aviaoImg);
        naocomidas.scale = 0.1
        break;
      case 2: naocomidas.addImage(tenisImg);
        naocomidas.scale = 0.2
      default: break;
    }
    naocomidasG.add(naocomidas);
  }
}
function destruir() {
  pou.overlap(comidasG, function (collector, collected) {
    pontuacao = pontuacao + 1
    collected.remove();
  })
}
function destruir2() {
  pou.overlap(naocomidasG, function (collector, collected) {
    cair = cair - 1
    collected.remove();
  })
}
function reset() {
  estadoJogo = PLAY
  pou.x = mouseX;
  comidas();
  Naocomidas();
  cair=5
}
