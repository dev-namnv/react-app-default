import React from 'react'
import {Link} from 'react-router-dom'

const Sidebar = props => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        {/* Sidebar - Brand */}
        <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">Bookstore</div>
        </Link>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <Link className="nav-link" to="/admin">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span></Link>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">
          Interface
        </div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
            <i className="fas fa-align-left" />
            <span>Categories</span>
          </Link>
          <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Components:</h6>
              <Link className="collapse-item" to="/admin/categories">List</Link>
              <Link className="collapse-item" to="/admin/category/add">Create record</Link>
            </div>
          </div>
        </li>
        {/* Nav Item - Utilities Collapse Menu */}
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/admin/books">
            <i className="fas fa-book" />
            <span>Book</span>
          </Link>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">
          Addons
        </div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
            <i className="fas fa-fw fa-folder" />
            <span>Pages</span>
          </a>
          <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Login Screens:</h6>
              <a className="collapse-item" to="login.html">Login</a>
              <a className="collapse-item" to="register.html">Register</a>
              <a className="collapse-item" to="forgot-password.html">Forgot Password</a>
              <div className="collapse-divider" />
              <h6 className="collapse-header">Other Pages:</h6>
              <a className="collapse-item" to="404.html">404 Page</a>
              <a className="collapse-item" to="blank.html">Blank Page</a>
            </div>
          </div>
        </li>
        {/* Nav Item - Charts */}
        <li className="nav-item">
          <a className="nav-link" to="charts.html">
            <i className="fas fa-fw fa-chart-area" />
            <span>Charts</span></a>
        </li>
        {/* Nav Item - Tables */}
        <li className="nav-item">
          <a className="nav-link" to="tables.html">
            <i className="fas fa-fw fa-table" />
            <span>Tables</span></a>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />
        {/* Sidebar Toggler (Sidebar) */}
        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle" />
        </div>
      </ul>
    )
}

Sidebar.propTypes = {

}

export default Sidebar
