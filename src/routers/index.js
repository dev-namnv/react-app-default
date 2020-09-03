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
import CategoryForm from "../views/admin/pages/category/form";
import BookManager from "../views/admin/pages/book";
import BookForm from "../views/admin/pages/book/form";
import ChapterForm from "../views/admin/pages/chapter/form";
import ChapterManager from "../views/admin/pages/chapter";
import BookChapters from "../views/main/pages/book";

const Routers = () => {

    return (
        <Router>
            <Switch>
                <Route path="/admin/:path?/:path?/:path?/:path?/:path?" exact>
                    <LayoutAppAdmin>
                        <Switch>
                            <Route path="/admin" exact>
                                <Dashboard />
                            </Route>

                            <Route path="/admin/categories" exact>
                                <CategoryManager />
                            </Route>
                            <Route path="/admin/category/add">
                                <CategoryForm />
                            </Route>
                            <Route path="/admin/category/edit/:id">
                                <CategoryForm />
                            </Route>
                            <Route path="/admin/category/:cate_id/books">
                                <BookManager />
                            </Route>

                            <Route path="/admin/books" exact>
                                <BookManager />
                            </Route>
                            <Route path="/admin/category/:cate_id/book/add">
                                <BookForm />
                            </Route>
                            <Route path="/admin/book/edit/:id">
                                <BookForm />
                            </Route>

                            <Route path="/admin/book/:id/chapters">
                                <ChapterManager />
                            </Route>
                            <Route path="/admin/book/:book_id/chapter/add">
                                <ChapterForm />
                            </Route>
                            <Route path="/admin/chapter/:id">
                                <ChapterForm />
                            </Route>

                        </Switch>
                    </LayoutAppAdmin>
                </Route>
                <Route path="/:path?/:path?/:path?/:path?" exact>
                    <LayoutAppMain>
                        <Switch>
                            <Route path="/" exact>
                                <Home />
                            </Route>

                            <Route path="/book/:id/chapters">
                                <BookChapters />
                            </Route>
                            <Route path="/book/:id/chapter/:chapter_id">
                                <BookChapters />
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
