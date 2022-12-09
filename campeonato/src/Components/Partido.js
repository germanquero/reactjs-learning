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

export default Partido;