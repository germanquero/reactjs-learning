import ReactDOM from "react-dom/client";
import axios from "axios";
import { useState, useEffect, React } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import ListaParticipantes from "./Components/ListaParticipantes";
import Partidos from "./Components/Partidos";

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


// Developed by: German Quero Jimenez