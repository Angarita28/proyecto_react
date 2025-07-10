import { useMemo, useState } from 'react';

function Usememo() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');

  const resultado = useMemo(() => {
    const n1 = parseFloat(num1) || 0;
    const n2 = parseFloat(num2) || 0;
    return n1 + n2;
  }, [num1, num2]);

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Suma con <code class= "text-primary">useMemo</code></h3>

        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Número 1"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Número 2"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
          />
        </div>

        <p className="text-center fw-bold fs-5">Resultado: {resultado}</p>
      </div>
    </div>
  );
}

export default Usememo;
