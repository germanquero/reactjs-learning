import Partido from "./Partido";

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

export default TablaPartidos;


// Developed by: German Quero Jimenez