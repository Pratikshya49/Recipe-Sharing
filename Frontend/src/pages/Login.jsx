import { loginUser } from '../api/authApi.js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    try {
      setIsLoading(true)
      setErrors([])
      const response = await loginUser(userInfo)
      const user = response.data.data
      localStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      setErrors(prev => [...prev, error]);
    } finally {
      setIsLoading(false)
    }
  }

  function handleUserInput(e) {
    const value = e.target.value
    setUserInfo(prev => ({ ...prev, [e.target.name]: value }))
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-brand-black mb-8">Log In</h2>
      {errors.length > 0 ? (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          <p className="font-semibold">Could not log in:</p>
          <ul className="list-disc pl-5 mb-2">
            {errors.map((err, i) => (
              <li key={i}>{err.response?.data?.message || err.message || String(err)}</li>
            ))}
          </ul>
          <button
            onClick={() => setErrors([])}
            className="text-xs text-blue-600 underline cursor-pointer"
          >
            Try Again
          </button>
        </div>
      ) : isLoading ? (
        <p>Logging In...</p>
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          handleUserInput={handleUserInput}
          userInfo={userInfo}
        />
      )}
    </main>
  )
}

function LoginForm({ handleLogin, handleUserInput, userInfo }) {
  return (
    <form onSubmit={handleLogin} className="px-4 mt-6">
      <div className="space-y-4 max-w-sm mx-auto">
        <div>
          <label htmlFor="email" className="mb-2 text-slate-900 font-medium text-sm inline-block">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleUserInput}
            placeholder="john@readymadeui.com"
            required
            className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 text-slate-900 font-medium text-sm inline-block">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleUserInput}
            placeholder="••••••••"
            required
            className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
          />
        </div>

        <button
          type="submit"
          className="!mt-2 py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}