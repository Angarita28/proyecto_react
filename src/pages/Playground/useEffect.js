import { useState, useEffect } from 'react';

function Useffect() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup
  }, []);

  return <div class="d-flex justify-content-center align-items-center vh-100" ><p class="fs-1 text-primary fw-bold" >Hora actual: {hora.toLocaleTimeString()}</p></div>;
}

export default Useffect;