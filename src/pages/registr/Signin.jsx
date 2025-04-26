import { useState } from "react"

export default function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const handleSignin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        window.location.href = "/"
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Sign in</h1>
      <form onSubmit={handleSignin}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Sign in</button>
      </form>
    </div>
  )
}
