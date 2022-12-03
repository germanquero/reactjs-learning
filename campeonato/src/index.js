import ReactDOM from "react-dom/client";
import axios from "axios";
import { useState, useEffect, React } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "bootstrap";



function ListaParticipantes(props) {
    const participantes = props.participantes.map((participante) => <Participante key={participante.id} datos={participante} />);
    return (
        <div className='accordion accordion-flush' id='acordionLista'>
            {participantes}
        </div>
    )
}




function Participante(props) {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={'heading' + props.datos.id}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={'#collapse' + props.datos.id} aria-expanded="false" aria-controls={'collapse' + props.datos.id}>
                    {props.datos.username}
                </button>
            </h2>
            <div id={'collapse' + props.datos.id} className="accordion-collapse collapse collapse" aria-labelledby={'heading' + props.datos.id} data-bs-parent="#accordionLista">
                <div className="accordion-body">
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>{props.datos.name}</li>
                        <li className='list-group-item'>Tel: {props.datos.phone}</li>
                        <li className='list-group-item'>Email: {props.datos.email}</li>
                        <li className='list-group-item'>Web: {props.datos.website}</li>
                    </ul>
                </div>
            </div>
        </div>
    )

}

function Partido(props) {
    if (typeof props.partido != 'undefined')
        return (
            <tr>
                <th scope="row">{props.partido[0]}</th>
                <td>{props.partido[1]}</td>
                <td>{props.partido[2]}</td>
                <td>{props.partido[3]}</td>
            </tr>
        );
}

function TablaPartidos(props) {
    const partidos = props.partidos.map((partido) => <Partido key={partido[0]} partido={partido} />);
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">PISTA</th>
                    <th scope="col">JUGADOR 1</th>
                    <th scope="col">JUGADOR 2</th>
                    <th scope="col">RESULTADO</th>
                </tr>
            </thead>
            <tbody>
                {partidos}
            </tbody>
        </table>
    );
}

function Resultado(props) {
    if (typeof props.partido != 'undefined')
        if (props.partido[0] != 0)
            return (
                <div className='carousel-item'>
                    <div className='d-block w-100 text-center'>
                        En la pista: {props.partido[0]}
                        <h5>{props.partido[1] + '   VS   ' + props.partido[2]}</h5>
                        <h6>Ganador:</h6>
                        <h1>{props.partido[3]}</h1>
                    </div>
                </div>
            );
        else
            return (
                <div className='carousel-item active'>
                    <div className='d-block w-100 text-center'>
                        En la pista: {props.partido[0]}
                        <h5>{props.partido[1] + '   VS   ' + props.partido[2]}</h5>
                        <h6>Ganador:</h6>
                        <h1>{props.partido[3]}</h1>
                    </div>
                </div>
            );
}


function MuestrarioResultados(props) {
    const partidos = props.partidos.map((partido) => <Resultado key={partido[0]} partido={partido} />);
    if (typeof props.partidos != 'undefined')
        return (
            <div id='carouselResultados' className='carousel carousel-dark slide' data-bs-ride='carousel'>
                <div className='carousel-inner'>
                    {partidos}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselResultados" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselResultados" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        );
}

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

function App() {
    const URLparticipantes = 'https://jsonplaceholder.typicode.com/users';
    const [participantes, setParticipantes] = useState([]);
    useEffect(() => {
        axios.get(URLparticipantes).then((json) => setParticipantes(json.data)).catch((err) => console.log(err));
    }, []);
    console.log(participantes)
    return (
        <>
            <div className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className='container'>
                    <h1 className='navbar-brand'>CAMPEONATOS</h1>
                    <h6 className='text-white'>German Quero Jimenez</h6>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-3'>
                        <ListaParticipantes participantes={participantes} />
                    </div>
                    <div className='col'>
                        <Partidos participantes={participantes} />
                    </div>
                </div>
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);