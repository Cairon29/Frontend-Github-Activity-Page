import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/roles/users/Home.tsx';
import Header from '../pages/base/header.tsx';
import Footer from '../pages/base/footer.tsx';
import Landing from '../pages/base/landing.tsx';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Header />
            <main className="main">
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/landing' element={<Landing />} />
                    <Route path='/home' element={<Home />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}
