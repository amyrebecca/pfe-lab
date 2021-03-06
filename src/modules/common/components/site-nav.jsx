import React from 'react';
import { Link } from 'react-router';
import { ZooniverseLogo } from 'Zooniverse-react-components';
import SiteNavItems from './site-nav-items';
import HeaderAuth from '../containers/header-auth';

function renderNavItem(item) {
  if (item.to.match(/^https?:/ig)) {
    return (
      <li key={item.label}>
        <a href={item.to} className="site-nav__link">{item.label}</a>
      </li>
    );
  }
  return (
    <li key={item.label}>
      <Link to={item.to} className="site-nav__link" activeClassName="site-nav__link--active">
        {item.label}
      </Link>
    </li>
  );
}

const SiteNav = () => {
  let nav = null;
  if (SiteNavItems) {
    nav = (
      <nav className="site-nav">
        <a href="https://www.zooniverse.org/" className="site-nav__link">
          <ZooniverseLogo height='1.75em' width='1.75em' />
        </a>
        <ul className="site-nav__main-links">
          {SiteNavItems.map(renderNavItem)}
        </ul>
        <HeaderAuth />
      </nav>
    );
  }
  return nav;
};

export default SiteNav;
