import Participante from "./Participante";

function ListaParticipantes(props) {
    const participantes = props.participantes.map((participante) => <Participante key={participante.id} datos={participante} />);
    return (
        <div className='accordion accordion-flush' id='acordionLista'>
            {participantes}
        </div>
    )
}

export default ListaParticipantes;