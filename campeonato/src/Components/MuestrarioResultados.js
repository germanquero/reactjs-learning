import Resultado from "./Resultado";
import { Button } from "bootstrap";


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

export default MuestrarioResultados;