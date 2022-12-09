import TablaPartidos from "./TablaPartidos";
import MuestrarioResultados from "./MuestrarioResultados";
import { useState } from "react";

function Partidos(props) {
    const [partidos, setPartidos] = useState([]);
    function generarGrupos(participantes) {
        const participantesBarajados = participantes.sort((a, b) => 0.5 - Math.random());
        var grupos = [];

        for (var i = 0; i < participantesBarajados.length; i += 2) {
            grupos.push(participantesBarajados.slice(i, i + 2));
        }
        return grupos;
    }

    function formatearPartidos(grupos) {
        return (grupos.map((partido, index) => [index].concat(partido).concat(['PENDIENTE'])));
    }

    function generarPartidos() {
        const participantes = props.participantes.map((participante) => participante.username);
        let grupos = generarGrupos(participantes);
        setPartidos(formatearPartidos(grupos));
    }

    function generarResultados() {
        const ganadores = partidos.map((partido) => [partido[0], partido[1], partido[2], partido[Math.random() < 0.5 ? 1 : 2]]);
        setPartidos(ganadores);
    }

    return (
        <>
            <div className='row mt-2 mb-5'>
                <button className='btn btn-outline-primary' onClick={() => generarPartidos()}><strong>GENERAR PARTIDOS</strong></button>
            </div>
            <div className='row'>
                <div>
                    <TablaPartidos partidos={partidos} />
                </div>
            </div>
            <div className='row mt-2 mb-5'>
                <button className='btn btn-outline-primary' onClick={() => generarResultados()}><strong>GENERAR RESULTADOS</strong></button>
            </div>
            <div className='row'>
                <MuestrarioResultados partidos={partidos} />
            </div>
        </>
    );
}

export default Partidos;


// Developed by: German Quero Jimenez