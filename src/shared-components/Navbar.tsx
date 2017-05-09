import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Arrow,
  Button,
  Dropdown,
  DropdownMenu,
  Fixed,
  NavItem,
  Space,
  Toolbar,
} from 'rebass';

import { ToggleDropdown } from '../app/reducer';
import { LoginRequest, Logout } from '../auth/reducer';

interface NavbarProps {
  profile: auth0.Auth0UserProfile | null;
  handleLogin: () => LoginRequest;
  handleLogout: () => Logout;
  onToggleDropdown: () => ToggleDropdown;
  isDropdownOpen: boolean;
}

const activeStyle = {
  color: '#111',
};

const Navbar: React.StatelessComponent<NavbarProps> = ({
  profile,
  handleLogin,
  handleLogout,
  onToggleDropdown,
  isDropdownOpen,
}) => (
  <Fixed top left right zIndex={1}>
    <Toolbar backgroundColor="#fff">
      <NavItem is="object">
        <NavLink to="/" exact activeStyle={activeStyle}>
          Home
        </NavLink>
      </NavItem>
      {
        profile &&
        <NavItem is="object">
          <NavLink to="/books" activeStyle={activeStyle}>
            Books
          </NavLink>
        </NavItem>
      }
      <Space auto />
      <NavItem is="object">
        {
          !profile ?
            <Button backgroundColor="green">
              <div onClick={handleLogin}>
                Login
              </div>
            </Button> :
            <Dropdown>
              <NavItem color="black">
                <div onClick={onToggleDropdown}>
                  {profile.name}
                  <Arrow />
                </div>
              </NavItem>
              <DropdownMenu
                right
                onDismiss={onToggleDropdown}
                open={isDropdownOpen}
              >
                <NavItem>
                  <div onClick={handleLogout}>
                    Logout
                  </div>
                </NavItem>
              </DropdownMenu>
            </Dropdown>
        }
      </NavItem>
    </Toolbar>
  </Fixed>
);

export default Navbar;
