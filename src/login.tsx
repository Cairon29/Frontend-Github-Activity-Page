import { Client, Account, OAuthProvider } from 'appwrite';

export const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const loginButton = e.target as HTMLButtonElement
    loginButton.textContent = 'Logging in...'
    try {
        const client = new Client()
            .setEndpoint('https://sfo.cloud.appwrite.io/v1')
            .setProject('694c53ba002808c0b726')
            .setLocale('en-US');

        client.setCookieFallback(true);
        const account = new Account(client);
    
        account.createOAuth2Session({
            provider: OAuthProvider.Github,
            success: 'http://localhost:1111/',
            failure: 'http://localhost:1111/fail_login'
        })

    } catch (error) {
        console.log(error)
        loginButton.textContent = 'Login with Github'
    }
}