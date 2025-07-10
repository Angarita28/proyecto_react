import { useRef, useEffect } from 'react';

function Useref() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <div class="d-flex justify-content-center align-items-center vh-100"><input ref={inputRef} placeholder="Escribe algo..." />;</div>
}

export default Useref