/* eslint-disable */
import { useState } from 'react';

function ConMuchosRenders() {
    const [contador, setContador] = useState(0);
    setContador(contador + 1);
    
    return (
        <div>
        <h3>❌ Caso 2 — Con Muchos Re-renders</h3>
        <p>Contador: {contador}</p>
        <button onClick={setContador(contador + 1)}>Incrementar</button>
        </div>
    );
}

export default ConMuchosRenders;