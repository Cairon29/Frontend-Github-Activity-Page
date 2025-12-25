import { handleLogin } from './login'

function App() {
  return (
    <>
      <h1>Here the Github activity page Ur commit </h1>
      <button id="login" onClick={handleLogin}>Login with Github</button>
    </>
  )
}

export default App
