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

export default Participante;


// Developed by: German Quero Jimenez