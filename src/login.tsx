export const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const loginButton = e.target as HTMLButtonElement
    loginButton.textContent = 'Logging in...'

    const response = await fetch('http://localhost:5555/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: '123456',
            user: 'test user name'
        }),
    })
    if (response.ok) {
        const data = await response.json()
        loginButton.textContent = data
    }
}