import React from "react";
import {Link} from "react-router-dom";

const MainFooter = () => {
    return (
        <footer className="text-muted pt-3">
            <div className="container">
                <p className="float-right">
                    <Link to="/">Back to top</Link>
                </p>
                <p>Album example is © Bootstrap, but please download and customize it for yourself!</p>
                <p>New to Bootstrap? <Link to="../../">Visit the homepage</Link> or read our <Link
                    to="#">getting started guide</Link>.</p>
            </div>
        </footer>
    )
}

MainFooter.prototype = {}

export default MainFooter