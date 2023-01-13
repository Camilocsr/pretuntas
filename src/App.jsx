import preguntas from "./preguntas"
import { useState, useEffect } from "react"
function App() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuacon, setPuntuacion]= useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(100);
  const [areDisabled, setAreDisabled] = useState (false);

  function handleAnswerSubmit(isCorret,e){
    if(isCorret) setPuntuacion(puntuacon +1);
    e.target.classList.add(isCorret ? "correct": "incorrect");
    setTimeout(()=>{
      if (preguntaActual == preguntas.length -1){
        setIsFinished(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
      }
    },1500);
  }


  useEffect(()=>{
    // let tiempo = 100
    const intervalo = setInterval(()=>{

      // if(tiempoRestante > 0) setTiempoRestante(()=>tiempo - 1);
      if(tiempoRestante == 0) setAreDisabled(true);

      return ()=> clearInterval(intervalo);

    },1000);

  },[tiempoRestante]);


  if(isFinished) return(
    <main className="app">
      <div className="juego-terminado">
        <span>tubiste {puntuacon} de {preguntas.length}{" "}
        <button onClick={()=>window.location.href="/"}>Volver a jugar</button></span>
      </div>
    </main>
  )
  return (
  <main className="app">
    <div className="lado-izquierdo">
  <div className="nuero-pregunta">
    <span>{preguntaActual + 1} de </span>{preguntas.length}
  </div>
  <div className="titulo-pregunta">
    {preguntas[preguntaActual].titulo}
  </div>
  <div>
    <span className="tiempo-restante">Tiempo restante: {tiempoRestante}</span>
  </div>
    </div>
    <div className="lado-derecho">
      {preguntas[preguntaActual].opciones.map((respuesta)=>(
        <button disabled={areDisabled} onClick={(e)=>handleAnswerSubmit(respuesta.isCorret,e)} key={respuesta.textoRespuesta}>{respuesta.textoRespuesta}</button>
      ))}
    </div>
  </main>
)
}

export default App
