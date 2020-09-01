import React from 'react'
import MainHeader from "./Header";
import MainFooter from "./Footer";

const LayoutAppMain = ({children}) => {
    return (
        <div>
            <MainHeader />
            <main role="main">
                {children}
            </main>
            <MainFooter />
        </div>
    )
}

LayoutAppMain.propTypes = {

}

export default LayoutAppMain
