import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from 'react-router-dom';
function Layout({children}) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout;