import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(async res => {
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.detail || 'Invalid credentials')
        }
        return data
      })
      .then(data => {
        localStorage.setItem('medfinder_user', data.data.email)
        localStorage.setItem('medfinder_role', data.data.role)
        localStorage.setItem('medfinder_name', data.data.name)
        
        if (data.data.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/app')
        }
      })
      .catch((err) => {
        setError(err.message || 'Invalid email or password')
        setLoading(false)
      })
  }

  return (
    <>
      <Head>
        <title>Login - MedFinder</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-5xl">💊</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to compare medicine prices</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="demo@medfinder.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-3">Demo Credentials:</h3>
            <div className="space-y-2 text-sm">
              <div className="bg-white p-3 rounded">
                <div className="font-semibold text-gray-700">User Account:</div>
                <div className="text-gray-600">Email: demo@medfinder.com</div>
                <div className="text-gray-600">Password: demo123</div>
              </div>
              <div className="bg-white p-3 rounded">
                <div className="font-semibold text-gray-700">Admin Account:</div>
                <div className="text-gray-600">Email: admin@medfinder.com</div>
                <div className="text-gray-600">Password: admin123</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
