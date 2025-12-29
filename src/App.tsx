import { useEffect } from 'react'
import { handleLogin } from './login'
import { Client, Account } from 'appwrite'

  function App() {

    useEffect(() => {
        const client = new Client()
          .setEndpoint('https://sfo.cloud.appwrite.io/v1')
          .setProject('694c53ba002808c0b726');

        const account = new Account(client);
        account.get()
          .then(user => {
              console.log('Logged user:', user);
          })
          .catch(() => {
              console.log('not logged yet');
          });
    }, [])

    return (
      <>
        <h1>Here the Github activity page Ur commit </h1>
        <button id="login" onClick={handleLogin}>Login with Github</button>
      </>
    )
}

export default App
