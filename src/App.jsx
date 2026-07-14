/* eslint-disable */

import ConBucleInfinito from './casos/caso1/ConBucleInfinito';
import SinBucleInfinito from './casos/caso1/SinBucleInfinito';
import ConMuchosRenders from './casos/caso2/ConMuchosRenders';
import SinMuchosRenders from './casos/caso2/SinMuchosRenders';

function App() {
  return (
    <div>
      <h1>Taller — Bucles Infinitos en React</h1>
      <hr />
      <h2>Caso 1: useEffect sin arreglo de dependencias</h2>
      {/* Se comenta este componente para no bloquear el navegador */}
      {/* <ConBucleInfinito /> */}
      {/* Versión corregida — activa por defecto */}
      <SinBucleInfinito />

      <hr />
      <h2>Caso 2: Too many re-renders</h2>
      {/* Se comenta este componente para no bloquear el navegador */}
      {/* <ConMuchosRenders /> */}
      {/* Versión corregida — activa por defecto */}
      <SinMuchosRenders />
    </div>
  );
}

export default App;