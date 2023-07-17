import React from "react";
import { Icon, Menu, Image } from "semantic-ui-react";
import { useAuth } from "../../../hooks";
import parador from "./parador.jpg";
import "./TopMenu.scss";

export function TopMenu() {
  const { auth, logout } = useAuth();

  const renderName = () => {
    if (auth.me?.first_name && auth.me?.last_name) {
      console.log('UNO');
      return `${auth.me.first_name} ${auth.me.last_name}`;
    }else if (auth.me?.username){
      console.log('DOS');
      return auth.me?.username;
    }else{
      console.log('TRES');
      logout();
    }
      
    
    
  };

  return (
    <Menu fixed="top" className="top-menu-admin">
      <Menu.Item className="top-menu-admin__logo">
      <Image src={parador} />
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>Hola, {renderName()}</Menu.Item>
        <Menu.Item onClick={logout}>
          <Icon name="sign-out" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
