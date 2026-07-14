/* eslint-disable */
import { useState, useEffect } from 'react';

function SinBucleInfinito() {
    const [contador, setContador] = useState(0);

    useEffect(() => {
        setContador(contador + 1);
    }, []); // ← arreglo vacío = solo se ejecuta al montar

    return (
        <div>
            <h3>✅ Caso 1 — Sin Bucle Infinito</h3>
            <p>Contador: {contador}</p>
        </div>
    );
}

export default SinBucleInfinito;