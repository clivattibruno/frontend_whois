import api from "../../api";
import React, { useState, useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';

function ASPathFilter() {
    const [Lista, setLista] = useState([]);

    //Lista inicial
    useEffect(() => {
        async function getfunc() {
            await api
                .get("/aspathfilter")
                .then((response) => setLista(response.data.ListaClientes));
        }
        getfunc();
        console.log(Lista);
    }, []);

    const listItems = Lista.map((client) =>
        <ListGroup.Item>{client}</ListGroup.Item>
    );

    return (
        <div>
            <ListGroup variant="flush">
                {listItems}
            </ListGroup>
        </div>
    )
}

export default ASPathFilter;
