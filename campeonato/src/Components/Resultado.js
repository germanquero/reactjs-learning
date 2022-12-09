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

export default Resultado;


// Developed by: German Quero Jimenez