import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { isAuthorized } from '@/hoc/withAuth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import ActiveLink from '@/components/shared/ActiveLink';
import ReactResizeDetector from 'react-resize-detector';


const BsNavLink = props => {
  const { href, title, className=''} = props;
  return (
    <ActiveLink activeClassName="active" href={href}>
      <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
    </ActiveLink>
  )
}

const LoginLink = () => 
  <BsNavLink title="Login" href="/api/auth/login" />

const LogoutLink = () => 
  <BsNavLink title="Logout" href="/api/auth/logout" />

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown
      className="port-navbar-link port-dropdown-menu"
      nav
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}>
        <DropdownToggle className="port-dropdown-toggle" nav caret>
          Admin
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <BsNavLink
              className="port-dropdown-item"
              href="/portfolios/new"
              title="Create Portfolio"
            />
          </DropdownItem>
          <DropdownItem>
            <BsNavLink
              className="port-dropdown-item"
              href="/blogs/editor"
              title="Blog Editor"
            />
          </DropdownItem>
          <DropdownItem>
            <BsNavLink
              className="port-dropdown-item"
              href="/dashboard"
              title="Dashboard"
            />
          </DropdownItem>
        </DropdownMenu>
    </Dropdown>
  )
}

const Header = ({className}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { user, error, isLoading } = useUser();

  return (
    <ReactResizeDetector handleWidth>
      {({width}) => 
        <Navbar
          className={`port-navbar port-default absolute ${className} ${isOpen && width <= 766 ? 'is-open' : 'is-closed'}`}
          dark
          expand="md">
          <div className="navbar-brand">
            <Link href="/">
              <a className="port-navbar-brand">My Portfolio {width}</a>
            </Link>
          </div>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/" title="Home"/>
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/about" title="About"/>
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/portfolios" title="Portfolios"/>
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/blogs" title="Blogs"/>
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/cv" title="Cv"/>
              </NavItem>
              
            </Nav>
            <Nav navbar>
              {!user &&
                <NavItem className="port-navbar-item">
                  <LoginLink />
                </NavItem>
              }
              {user && 
                <>
                  {
                    isAuthorized(user, 'admin') && <AdminMenu />
                  }
                  <NavItem className="port-navbar-item">
                    <LogoutLink />
                  </NavItem>
                </>
              }
              
            </Nav>
          </Collapse>
        </Navbar>
      }
      
    </ReactResizeDetector>
  );
}

export default Header;