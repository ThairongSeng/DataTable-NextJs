import Footer from "./footer"
import NavBar from "./navbar"


const Layout = ({children}) => {
    return(
        <>
            <NavBar/>
                <main>{children}</main>
            <Footer/>
        </>
    )
}
export default Layout