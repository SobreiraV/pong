//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete1
let xRaquete = 5;
let yRaquete = 150;
let wRaquete = 10;
let hRaquete = 90;
let vYRaquete = 3;

let colidiu = false;

//variáveis da raquete2
let xRaquete2 = 585;
let yRaquete2 = 150;
let velocidadeYOponente;
//let chanceDeErrar = 0;
let lOponente = 10;
let aOponente = 90;
let vYOponente;

//variáveis de pontuação
let meusPontos = 0;
let pontosOponente = 0;
let dOponenteBolinha = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.wav");
  ponto = loadSound("ponto.wav");
  raquetada = loadSound("hit.wav");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaquete2, yRaquete2);
  movimentaRaquete();
  movimentaRaquete2();
  //verificaColisaoRaquete();
  colisãoRaqueteBiblioteca(xRaquete, yRaquete);
  colisãoRaqueteBiblioteca(xRaquete2, yRaquete2);
  incluiPlacar();
  pontua();
  bolinhaNaoFicaPresa()
}

function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro)
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}
/*
function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + wRaquete && yBolinha - raio < yRaquete + hRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
  }
}
*/
function colisãoRaqueteBiblioteca(x,y){
  colidiu =
  collideRectCircle(x, y, wRaquete, hRaquete, xBolinha, yBolinha, raio);
  if (colidiu){ 
    velocidadeXBolinha *= -1
    raquetada.play();
  }
}

function mostraRaquete(x,y){
  rect (x, y, wRaquete, hRaquete);
}

function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function movimentaRaquete2()
{
  vYOponente = yBolinha - yRaquete2 - lOponente/2 -dOponenteBolinha;
  yRaquete2 += vYOponente;

  if(pontosOponente > meusPontos)
  {
    dOponenteBolinha = 100;
  }
  if(pontosOponente < meusPontos && dOponenteBolinha > 50)
  {
    dOponenteBolinha -= 3;
  }
}

/*
function movimentaRaquete2(){
  velocidadeYOponente = yBolinha - yRaquete2 - wRaquete / 2 - 30;
  yRaquete2 += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
}

function movimentaRaquete2(){
  if (keyIsDown(87)){
    yRaquete2 -= 10;
  }
  if (keyIsDown(83)){
    yRaquete2 += 10;
  }
}
*/
function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill('#FF8C00')
  rect(130, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 26);
  fill('#FF8C00')
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function pontua(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}
/*
function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
*/
function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}