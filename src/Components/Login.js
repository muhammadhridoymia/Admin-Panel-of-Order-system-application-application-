import React from 'react'

function Login() {

    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone, password }),
            });
            const data = await response.json();
            if (data.success) {
                console.log('Login successful', data);
        } else {
                console.log(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

  return (
    <div>
        <div>
            <h1>Login</h1>
            <div>
                <label>Phone:</label>
                <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <div>
                <button onClick={handleSubmit}>Login</button>
            </div>
        </div>
    </div>
  )
}

export default Login