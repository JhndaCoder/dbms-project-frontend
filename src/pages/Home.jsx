import { Fragment } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const Home = () => {
    return (
        <Fragment>
            <div className="hero">
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
        </Fragment>
    )
}
export default Home