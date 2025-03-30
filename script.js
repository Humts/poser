let preguntaActual = 0;
let puntos = 0;
let preguntasMezcladas = [];
let startTime;
let endTime;
let isStopMusicVisible = false;
let opcionSeleccionada = false;

const quizContainer = document.getElementById("quiz-container");
const resultadosContainer = document.getElementById("resultados-container");
const resultadosTexto = document.getElementById("resultados-texto");
const preguntaElemento = document.getElementById("question");
const opcionesElemento = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const playMusic = document.getElementById('play-music')
const stopMusic = document.getElementById('stop-music')
const audio = document.getElementById('miAudio');
const start = document.getElementById('start');
const mainPrincipal = document.getElementById("main-principal");
const mainSecundario = document.getElementById("main-secundario");
const headerBox = document.getElementById("header")
const bodyBox = document.getElementById("body")

const opcion1Btn = document.getElementById("option1");
const opcion2Btn = document.getElementById("option2");
const opcion3Btn = document.getElementById("option3");
const opcion4Btn = document.getElementById("option4");

const preguntas = [
    {
      pregunta: "¿Qué canción está sonando?",
      opciones: ["Bleed It Out", "Forgotten", "With You", "Cure for the Itch"],
      respuestaCorrecta: "With You",
      audio: "multimedia/audio/withyou.mp3"
    },
    {
      pregunta: "¿Qué canción está sonando?",
      opciones: ["Given Up", "Papercut", "Shadow of the Day", "New Divide"],
      respuestaCorrecta: "Given Up",
      audio: "multimedia/audio/givenup.mp3"
    },
    {
      pregunta: "¿A qué album pertenece esta canción?",
      opciones: ["Recharged", "A Thousand Suns", "Living Things", "One More Light"],
      respuestaCorrecta: "A Thousand Suns", //Burning in the skies
      audio: "multimedia/audio/burningintheskies.mp3"
    },
    {
      pregunta: "¿A qué album pertenece esta canción?",
      opciones: ["Hybrid Theory", "Minutes To Midnight", "Meteora", "Living Things"],
      respuestaCorrecta: "Meteora", //hit the floor
      audio: "multimedia/audio/hitthefloor.mp3"
    },
    {
      pregunta: "¿Qué canción está sonando?",
      opciones: ["Skin To Bone", "Minutes To Midnight", "Until It's Gone", "Victimized"],
      respuestaCorrecta: "Victimized",
      audio: "multimedia/audio/victimized.mp3"
    },
    {
      pregunta: "¿Qué canción está sonando?",
      opciones: ["Wastelands", "Lost", "War", "Final Masquerade"],
      respuestaCorrecta: "Wastelands",
      audio: "multimedia/audio/wastelands.mp3"
    },
    {
      pregunta: "¿Qué canción está sonando?",
      opciones: ["My December", "A Place for My Head", "Don't Stay", "Blackout"],
      respuestaCorrecta: "A Place for My Head",
      audio: "multimedia/audio/aplaceformyhead.mp3"
    },
    {
      pregunta: "¿Qué canción está sonando?",
      opciones: ["IGYEIH", "Heavy Is The Crown", "Two Faced", "The Emptiness Machine"],
      respuestaCorrecta: "IGYEIH",
      audio: "multimedia/audio/igyeih.mp3"
    },
    {
      pregunta: "¿Qué canción está sonando?",
      opciones: ["A line in the Sand", "Heavy Is The Crown", "Guilty All the Same", "Keys to the Kingdom"],
      respuestaCorrecta: "Keys to the Kingdom",
      audio: "multimedia/audio/keystothekingdom.mp3"
    },
    {
      pregunta: "¿Qué canción está sonando?",
      opciones: ["Lying from You", "Faint", "High Voltage", "Runaway"],
      respuestaCorrecta: "High Voltage",
      audio: "multimedia/audio/highvoltage.mp3"
    },
    {
      pregunta: "¿Qué canción está sonando?",
      opciones: ["In Pieces", "In Between", "Valentine's Day", "The Catalyst"],
      respuestaCorrecta: "Valentine's Day",
      audio: "multimedia/audio/valentinesday.mp3"
    },
    {
      pregunta: "¿Qué canción está sonando?",
      opciones: ["Crawling", "One Step Closer", "Be Myself", "Cure for the Itch"],
      respuestaCorrecta: "Crawling",
      audio: "multimedia/audio/crawling.mp3"
    },
    {
      pregunta: "¿Qué canción está sonando?",
      opciones: ["Nobody Can Save Me", "Lies Greed Misery", "Sharp Edges", "In My Remains"],
      respuestaCorrecta: "In My Remains",
      audio: "multimedia/audio/inmyremains.mp3"
    },
    {
      pregunta: "¿Qué canción está sonando?",
      opciones: ["Battle Symphony", "Talking to Myself", "Sorry for Now", "In My Remains"],
      respuestaCorrecta: "Sorry for Now",
      audio: "multimedia/audio/sorryfornow.mp3"
    },
    {
      pregunta: "¿A qué album pertenece esta canción?",
      opciones: ["One More Light", "Meteora", "A Thousand Suns", "From Zero"],
      respuestaCorrecta: "One More Light", //good goodbye
      audio: "multimedia/audio/goodgoodbye.mp3"
    },
    {
      pregunta: "¿Qué canción está sonando?",
      opciones: ["The Catalyst", "The Messenger", "No More Sorrow", "Across the Line"],
      respuestaCorrecta: "The Catalyst",
      audio: "multimedia/audio/thecatalyst.mp3"
    },
    {
      pregunta: "¿A qué album pertenece esta canción?",
      opciones: ["From Zero", "Minutes to Midnight", "A Thousand Suns", "Hybrid Theory"],
      respuestaCorrecta: "Minutes to Midnight", //no more sorrow
      audio: "multimedia/audio/nomoresorrow.mp3"
    },
    {
      pregunta: "¿Qué canción está sonando?",
      opciones: ["Figure.09", "Runaway", "In the End", "Somewhere I Belong"],
      respuestaCorrecta: "Runaway",
      audio: "multimedia/audio/runaway.mp3"
    },
    {
      pregunta: "¿Qué canción está sonando?",
      opciones: ["Rebellion", "Burn It Down", "All for Nothing", "In The End"],
      respuestaCorrecta: "Rebellion",
      audio: "multimedia/audio/rebellion.mp3"
    },
    {
      pregunta: "¿Qué canción está sonando?",
      opciones: ["Burn It Down", "Castle Of Glass", "The Catalyst", "Lost in the Echo"],
      respuestaCorrecta: "Castle Of Glass",
      audio: "multimedia/audio/castleofglass.mp3"
    },
    
  ];

function mezclarPreguntas(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function mezclarOpciones(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function mostrarPregunta() {
  nextBtn.disabled = true;
  opcionSeleccionada = false;
  const pregunta = preguntasMezcladas[preguntaActual]
  preguntaElemento.textContent = pregunta.pregunta;
  const opcionesMezcladas = mezclarOpciones([...pregunta.opciones]);
  
  opcionesElemento.innerHTML = "";
  opcionesMezcladas.forEach((opcion, index) => {
      const opcionBtn = document.createElement("button");
      opcionBtn.textContent = opcion; 
      opcionBtn.classList.add("button_options");
      opcionBtn.dataset.correct = opcion === pregunta.respuestaCorrecta;
      opcionesElemento.appendChild(opcionBtn);

      opcionBtn.addEventListener("click", () => verificarRespuesta(opcionBtn));
  });

  audio.src = pregunta.audio;
  audio.load();
    
  playMusic.addEventListener('click', function() {
    playMusic.style.display = "none"; 
    stopMusic.style.display = "block";
    isStopMusicVisible = true;
    audio.play();
    miImagen.classList.add('rotating-shadow');
    });
    
  stopMusic.addEventListener('click', function(){
    stopMusic.style.display = "none"; 
    playMusic.style.display = "block";
    isStopMusicVisible = false;
    audio.pause();
    miImagen.classList.remove('rotating-shadow');
  }); 

  audio.addEventListener('ended', function() {
    stopMusic.style.display = "none";
    playMusic.style.display = "block";
    miImagen.classList.remove('rotating-shadow');
  });

  // Cambiar el texto del botón en la última pregunta
  nextBtn.textContent = preguntaActual === preguntasMezcladas.length - 1 ? "Fin" : "Next";
  // actualizarEstadoBotonNext(); 
} 

function formatDuration(duration) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');
  const secondsStr = String(seconds).padStart(2, '0');

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
}

function verificarRespuesta(respuestaSeleccionada) {
  const pregunta = preguntasMezcladas[preguntaActual];
  const opciones = opcionesElemento.querySelectorAll(".button_options");

  opciones.forEach(opcion => {
      opcion.disabled = true;
      if (opcion.dataset.correct === "true") {
          opcion.classList.add("correcta");
      }
  }); 

  if (respuestaSeleccionada.dataset.correct === "true") {
      puntos++;
      respuestaSeleccionada.classList.add("correcta");
  } else {
      respuestaSeleccionada.classList.add("incorrecta");
  }  

  nextBtn.disabled = false;
  opcionSeleccionada = true; // Establecer a true cuando se selecciona una opción
  actualizarEstadoBotonNext();
}

function actualizarEstadoBotonNext() {
  if (nextBtn.disabled) {
      nextBtn.classList.remove("enabled");
  } else {
      nextBtn.classList.add("enabled");
  }
}

opcion1Btn.addEventListener("click", () => verificarRespuesta(opcion1Btn.textContent));
opcion2Btn.addEventListener("click", () => verificarRespuesta(opcion2Btn.textContent));
opcion3Btn.addEventListener("click", () => verificarRespuesta(opcion3Btn.textContent));
opcion4Btn.addEventListener("click", () => verificarRespuesta(opcion4Btn.textContent)); 

nextBtn.addEventListener("click", () => {
    if (!opcionSeleccionada) {
        return;
    }
    preguntaActual++;
    if (preguntaActual < preguntasMezcladas.length) {
        stopMusic.style.display = "none";
        playMusic.style.display = "block";
        miImagen.classList.remove('rotating-shadow');
        mostrarPregunta();
    } 
    else {
        quizContainer.style.display = "none";
        headerBox.style.display = "none"
        bodyBox.style.gridTemplateAreas = `
          "main main"
          "main main"
        `;
        resultadosContainer.style.display = "flex";

        endTime = Date.now();
        const duration = (endTime - startTime) / 1000; 
        const formattedDuration = formatDuration(duration);
        kofiWidgetOverlay.draw('poseroficial', {
          'type': 'floating-chat',
          'floating-chat.donateButton.text': 'Support me',
          'floating-chat.donateButton.background-color': '#00bfa5',
          'floating-chat.donateButton.text-color': '#fff'
        });
        resultadosTexto.innerHTML = `¡Has terminado!<br>Aciertos: ${puntos}/${preguntasMezcladas.length}<br>Tiempo: ${formattedDuration}<br>Pide a tu artista/banda favorita con una donación!`;
    }
    opcionSeleccionada = false;
    actualizarEstadoBotonNext();
});

start.addEventListener("click",() => {
  mainPrincipal.style.display= "none";
  mainSecundario.style.display= "flex";
  preguntasMezcladas = [...preguntas];
  mezclarPreguntas(preguntasMezcladas);
  preguntaActual = 0;
  startTime = Date.now();
  mostrarPregunta(); 
})
