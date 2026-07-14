/* eslint-disable */
import { useState, useEffect } from 'react';

function ConBucleInfinito() {
    const [contador, setContador] = useState(0);

    useEffect(() => {
        setContador(contador + 1);
    });

    return (
        <div>
            <h3>Caso 1 - Con Bucle Infinito</h3>
            <p>Contador: {contador}</p>
        </div>
    );
}

export default ConBucleInfinito;