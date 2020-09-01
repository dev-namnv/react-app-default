import React from 'react'

// Css admin
import '../assets/css/sb-admin-2.min.css'
import '../assets/vendor/fontawesome-free/css/all.min.css'
import '../assets/css/font-google.css'
// import 'bootstrap/dist/css/bootstrap.css.map'

// Js admin
import 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'jquery-easing'
import '../assets/js/sb-admin-2'

// Layouts
import Sidebar from './Sidebar'
import Footer from './Footer'
import Topbar from './Topbar'

const LayoutAppAdmin = ({children}) => {
    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar />
                    <div className="content-fluid">
                        {children}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

LayoutAppAdmin.propTypes = {

}

export default LayoutAppAdmin
