
import { useState } from 'react';

function SinMuchosRenders() {
    const [contador, setContador] = useState(0);
    const incrementar = () => {
        setContador(contador + 1);
    };
    
    return (
        <div>
        <h3>✅ Caso 2 — Sin Muchos Re-renders</h3>
        <p>Contador: {contador}</p>
        {/* ✅ Se pasa la referencia a la función, no su ejecución */}
        <button onClick={incrementar}>Incrementar</button>
        </div>
    );
}

export default SinMuchosRenders;