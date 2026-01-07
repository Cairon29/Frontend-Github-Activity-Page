import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/roles/users/Home.tsx';
import Login from '../pages/auth/login/Login.tsx';
import Header from '../pages/base/header.tsx';
import Footer from '../pages/base/footer.tsx';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Header />
            <main className="main">
                <Routes>
                    {/* <Route path='/' element={<Landing />} /> */}
                    <Route path='/' element={<Login />} />

                    {/* <Route path='/landing' element={<Landing />} /> */}
                    <Route path='/login' element={<Login />} />
                    {/* <Route path='/register' element={<Register />} /> */}
                    <Route path='/home' element={<Home />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}
