import React, { useState } from 'react';

const Login = () => {
  const [name, setName] = useState('Cezary');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleLogin = () => {

    const token = btoa(`${name}:${password}`);
    console.warn({ token });

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then(({ authorized }) => {
        if (authorized) {
          localStorage.setItem('token', token);
          window.location.reload();
        } else {
          setHasError(true);
        }
      })
      .catch(() => setHasError(true));
  }

  return (
    <section>
      <div>
        <label>User name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        /></div>
      {hasError && <div>Invalid credentials</div>}
      <button onClick={handleLogin}>log in</button>
    </section>
  );
}

export { Login };