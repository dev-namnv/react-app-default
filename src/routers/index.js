import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Layouts
import LayoutAppAdmin from '../views/admin/layouts/App'
import LayoutAppMain from  '../views/main/layouts/App'

// Pages main
import Home from '../views/main/pages/home'
import Error404 from '../views/main/pages/errors/404'

// Pages admin
import Dashboard from '../views/admin/pages/dashboard'
import CategoryManager from '../views/admin/pages/category'

const Routers = () => {

    return (
        <Router>
            <Switch>
                <Route path="/admin/:path?/:path?" exact>
                    <LayoutAppAdmin>
                        <Switch>
                            <Route path="/admin" exact>
                                <Dashboard />
                            </Route>
                            <Route path="/admin/categories" exact>
                                <CategoryManager />
                            </Route>
                        </Switch>
                    </LayoutAppAdmin>
                </Route>
                <Route path="/:path?/:path?" exact>
                    <LayoutAppMain>
                        <Switch>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/404-not-found" exact>
                                <Error404 />
                            </Route>
                        </Switch>
                    </LayoutAppMain>
                </Route>
            </Switch>
        </Router>
    )
}

Routers.propTypes = {

}

export default Routers
