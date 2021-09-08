var objetoCanvas = document.getElementById("villaPlatzi_canvas");
var papel = objetoCanvas.getContext("2d");
var botonJugar = document.getElementById("boton_Jugar");
var botonPausar = document.getElementById("boton_Pausar");
var textoP = document.getElementById("texto_p");
var textoP2 = document.getElementById("texto_p2");

var movimiento = 5;
var vidasIniciales = 3;
var vidas = vidasIniciales;
var limiteLargo = 20;
var teclas = {
  Arriba: 38,
  Abajo: 40,
  Derecha: 39,
  Izquierda: 37
};
var pared ={
  url: "pared.webp",
  cargaOK: false,
  imagen: new Image(),
  width: 20,
  height: 20
};
var cuadroNegro = {
  url: "cuadroNegro.webp",
  cargaOK: false,
  imagen: new Image(),
  width: 20,
  height: 20
};
var cabeza = {
  url: "cuadroNegroConPunto.webp",
  cargaOK: false,
  imagen: new Image(),
  width: 20,
  height: 20
};
var comida = {
  url: "estrella.webp",
  cargaOK: false,
  imagen: new Image(),
  width: 20,
  height: 20
};
var culebrita ={
  largo: 1,
  ubicacionX: [],
  ubicacionY: []
};

inicializarMatrizJuego();

textoP.innerHTML ='Vidas Restantes: '+ vidas + '&nbsp &nbsp &nbsp Largo Culebirta: '+culebrita.largo;

pared.imagen.src = pared.url;
pared.imagen.addEventListener("load",cargarPared);
cuadroNegro.imagen.src = cuadroNegro.url;
cuadroNegro.imagen.addEventListener("load",cargarCuadroNegro);
cabeza.imagen.src = cabeza.url;
cabeza.imagen.addEventListener("load",cargarCabeza);
comida.imagen.src = comida.url;
comida.imagen.addEventListener("load",cargarComida);

document.addEventListener("keydown",cambiarDirMovimiento);
botonJugar.addEventListener("mouseup",jugar);
botonPausar.addEventListener("mouseup",pausar);

var timerJuego;

function inicializarMatrizJuego()
{
  inicializarCulebirta();
  matrizJuego = [[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2]];
  matrizJuego=formarCulebritaEnMatriz(matrizJuego);
  calcularComida(matrizJuego);
  matrizJuego[comida.ubicacionX][comida.ubicacionY]=-1;
}
function inicializarCulebirta()
{
  culebrita.ubicacionX = [numAleatorio(4,20)];
  culebrita.ubicacionY = [numAleatorio(4,20)];
  switch (numAleatorio(0,3)) {
    case 0:
      culebrita.dirMovimiento = teclas.Izquierda;
      culebrita.ubicacionX[1]=culebrita.ubicacionX[0]+1;
      culebrita.ubicacionY[1]=culebrita.ubicacionY[0];
      break;
    case 1:
      culebrita.dirMovimiento = teclas.Arriba;
      culebrita.ubicacionX[1]=culebrita.ubicacionX[0];
      culebrita.ubicacionY[1]=culebrita.ubicacionY[0]+1;
      break;
    case 2:
      culebrita.dirMovimiento = teclas.Derecha;
      culebrita.ubicacionX[1]=culebrita.ubicacionX[0]-1;
      culebrita.ubicacionY[1]=culebrita.ubicacionY[0];
      break;
    case 3:
      culebrita.dirMovimiento = teclas.Abajo;
      culebrita.ubicacionX[1]=culebrita.ubicacionX[0];
      culebrita.ubicacionY[1]=culebrita.ubicacionY[0]-1;
      break;
    default:
  }
  culebrita.largo=2;
}

function jugar()
{
  if(vidas==0)
  {
    vidas = vidasIniciales;
    textoP2.innerHTML ='';
  }
  if(culebrita.largo==limiteLargo)
  {
    vidas = vidasIniciales;
    inicializarMatrizJuego();
    textoP2.innerHTML ='';
  }
  clearInterval(timerJuego);
  timerJuego = setInterval(actualizarJuego, 200);
}

function pausar()
{
  clearInterval(timerJuego);
}

function formarCulebritaEnMatriz(matriz) {
  for(i=0;i<culebrita.largo;i++)
  {
    matriz[culebrita.ubicacionX[i]][culebrita.ubicacionY[i]]=i+1;
  }
  return matriz;
}

function moverCulebrita(nuevoXCabeza,nuevoYCabeza)
{
  switch (matrizJuego[nuevoXCabeza][nuevoYCabeza])
  {
    case -2:
      vidas--;
      inicializarMatrizJuego();
      break;
    case -1:
      culebrita.ubicacionX.unshift(nuevoXCabeza);
      culebrita.ubicacionY.unshift(nuevoYCabeza);
      matrizJuego = [[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2]];
      culebrita.largo++;
      matrizJuego=formarCulebritaEnMatriz(matrizJuego);
      calcularComida(matrizJuego);
      matrizJuego[comida.ubicacionX][comida.ubicacionY]=-1;
      break;
    case 0:
      culebrita.ubicacionX.pop();
      culebrita.ubicacionY.pop();
      culebrita.ubicacionX.unshift(nuevoXCabeza);
      culebrita.ubicacionY.unshift(nuevoYCabeza);
      matrizJuego = [[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2]];
      matrizJuego=formarCulebritaEnMatriz(matrizJuego);
      matrizJuego[comida.ubicacionX][comida.ubicacionY]=-1;
      break;
    case culebrita.largo:
      culebrita.ubicacionX.pop();
      culebrita.ubicacionY.pop();
      culebrita.ubicacionX.unshift(nuevoXCabeza);
      culebrita.ubicacionY.unshift(nuevoYCabeza);
      matrizJuego = [[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2],[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2]];
      matrizJuego=formarCulebritaEnMatriz(matrizJuego);
      matrizJuego[comida.ubicacionX][comida.ubicacionY]=-1;
      break;
    default:
      vidas--;
      inicializarMatrizJuego();
  }
  textoP.innerHTML ='Vidas Restantes: '+ vidas + '&nbsp &nbsp &nbsp Largo Culebirta: '+culebrita.largo;
  if(vidas==0)
  {
    textoP2.innerHTML ='Perdiste';
    clearInterval(timerJuego);
  }
  if(culebrita.largo==limiteLargo)
  {
    textoP2.innerHTML ='Ganaste';
    clearInterval(timerJuego);
  }
}
function actualizarJuego()
{
  switch (culebrita.dirMovimiento) {
    case teclas.Arriba:
        moverCulebrita(culebrita.ubicacionX[0],culebrita.ubicacionY[0]-1);
      break;
    case teclas.Abajo:
        moverCulebrita(culebrita.ubicacionX[0],culebrita.ubicacionY[0]+1);
      break;
    case teclas.Derecha:
        moverCulebrita(culebrita.ubicacionX[0]+1,culebrita.ubicacionY[0]);
      break;
    case teclas.Izquierda:
        moverCulebrita(culebrita.ubicacionX[0]-1,culebrita.ubicacionY[0]);
      break;
    default:
  }
  dibujarJuegoCompleto();
}
function cambiarDirMovimiento(evento)
{
  var orientacionCulebrita = 2*(culebrita.ubicacionX[0]-culebrita.ubicacionX[1])+(culebrita.ubicacionY[0]-culebrita.ubicacionY[1]);
  switch (evento.keyCode) {
    case teclas.Arriba:
      if(orientacionCulebrita != 1)
      {
        culebrita.dirMovimiento = evento.keyCode;
      }
      break;
    case teclas.Abajo:
      if(orientacionCulebrita != -1)
      {
        culebrita.dirMovimiento = evento.keyCode;
      }
      break;
    case teclas.Derecha:
      if(orientacionCulebrita != -2)
      {
        culebrita.dirMovimiento = evento.keyCode;
      }
      break;
    case teclas.Izquierda:
      if(orientacionCulebrita != 2)
      {
        culebrita.dirMovimiento = evento.keyCode;
      }
      break;
    default:
  }
}
function dibujarJuegoCompleto()
{
  papel.clearRect(0,0,objetoCanvas.width,objetoCanvas.height);
  if (cuadroNegro.cargaOK)
  {
    for(i=0;i<25;i++)
    {
      for(j=0;j<25;j++)
      {
        if(matrizJuego[i][j]>1)
        {
          papel.drawImage(cuadroNegro.imagen,i*20,j*20);
        }
      }
    }
  }
  if (cabeza.cargaOK)
  {
    for(i=0;i<25;i++)
    {
      for(j=0;j<25;j++)
      {
        if(matrizJuego[i][j]==1)
        {
          papel.drawImage(cabeza.imagen,i*20,j*20);
        }
      }
    }
  }
  if(comida.cargaOK)
  {
    for(i=0;i<25;i++)
    {
      for(j=0;j<25;j++)
      {
        if(matrizJuego[i][j]==-1)
        {
          papel.drawImage(comida.imagen,i*20,j*20);
        }
      }
    }
  }
  if(pared.cargaOK)
  {
    for(i=0;i<25;i++)
    {
      for(j=0;j<25;j++)
      {
        if(matrizJuego[i][j]==-2)
        {
          papel.drawImage(pared.imagen,i*20,j*20);
        }
      }
    }
  }
}
function calcularComida(matriz)
{
  var faltaComida = true;
  var x;
  var y;
  while(faltaComida)
  {
    x=numAleatorio(0,24);
    y=numAleatorio(0,24);
    if(matriz[x][y]==0)
    {
        comida.ubicacionX = x;
        comida.ubicacionY = y;
        faltaComida = false;
    }
  }
}
function cargarPared()
{
  pared.cargaOK = true;
  dibujarJuegoCompleto;
}
function cargarCuadroNegro()
{
  cuadroNegro.cargaOK = true;
  dibujarJuegoCompleto();
}
function cargarCabeza()
{
  cabeza.cargaOK = true;
  dibujarJuegoCompleto();
}
function cargarComida()
{
  comida.cargaOK = true;
  dibujarJuegoCompleto();
}

function numAleatorio(min,max)
{
  var resultado;
  resultado = Math.floor((max-min+1)*Math.random())+min;
  return resultado;
}
function crearMatrizDeCeros(dimencionX,dimencionY)
{
  var matriz = new Array(dimencionX);
  for(i=0;i<dimencionX;i++)
  {
    matriz[i] = new Array(dimencionY);
  }
  for(i=0;i<dimencionX;i++)
  {
    for(j=0;j<dimencionY;j++)
    {
      matriz[i][j]=0;
    }
  }
  return matriz;
}
function encontrarValorEnMatrizJuego(valor)
{
  var lugarX;
  var lugarY;
  for(i=0;i<25;i++)
  {
      for(j=0;j<25;j++)
      {
        if(matrizJuego[i][j]==valor)
        {
          lugarX=i;
          lugarY=j;
        }
      }
  }
  return [lugarX,lugarY];
}

/*function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}*/
