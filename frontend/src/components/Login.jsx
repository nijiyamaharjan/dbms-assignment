import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
    const json = await response.json();

    if (response.ok) {
        navigate(`/user-profile/${json.userId}`);
    } else {
    console.error('Login failed', json);
    } 
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <button className="bg-indigo-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200">
            <Link to='/'>User Registration</Link>
        </button>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">Log In</h3>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email address:</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
    
  )
}

export default Login