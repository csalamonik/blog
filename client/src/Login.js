import React, { useState } from 'react';

const Login = () => {
    const [name, setName] = useState('Cezary');

    return (
        <section>
            <div>
                <label>User name:</label>
                <input onChange={(e) => setName(e.target.value)} value={name} />
            </div>
        </section>
    );
}

export { Login };