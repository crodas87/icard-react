import React, { useState,useEffect  } from 'react'
import {Menu, Icon,Accordion,Form} from "semantic-ui-react"
import { Link, useLocation } from "react-router-dom"
import {useAuth} from "../../../hooks"
import "./SideMenu.scss"
import 'semantic-ui-css/components/accordion.min.css'
import 'semantic-ui-css/components/form.min.css'
import 'semantic-ui-css/components/icon.min.css'
import 'semantic-ui-css/components/menu.min.css'

export function SideMenu(props) {
  const {children} = props
  const {pathname} = useLocation()
  

  return (
    <div className='side-menu-admin'>
        <MenuLeft pathname={pathname}/>
        <div className='content'>{children}</div>
    </div>
  )
  
}

function MenuLeft(props) {
  
    const { auth } = useAuth();
    const location = useLocation();
    const { pathname } = location;
    const [activeIndex, setActiveIndex] = useState(null);



    const handleClick = (e, titleProps) => {
      console.log('titleProps ',titleProps)
      const { index } = titleProps;
      console.log('index ',index)
      setActiveIndex(activeIndex === index ? null : index);
      console.log('activeIndex ',activeIndex)
     
    };
    


    const SizeForm = (
      <Form>
        <Menu.Item
              key="Products" // Agregar una clave única
              name="Products"
              as={Link}
              to={"/admin/products/"}
              active={pathname === "/admin/products"}
            >
            <Icon name="shopping basket"/> Productos
        </Menu.Item>
        <Menu.Item
              key="Ingredients" // Agregar una clave única
              name="Ingredients"
              as={Link}
              to={"/admin/ingredients/"}
              active={pathname === "/admin/ingredients"}
            >
            <Icon name="shopping basket"/> Ingredientes
        </Menu.Item>
    
          <Menu.Item key="IngredientsXProduct" // Agregar una clave única
              name="IngredientesXProducto"
              as={Link}
              to={"/admin/ingredienteProducto/"}
              active={pathname === "/admin/ingredienteProducto"}>
              <Icon name="clipboard outline" key="lista"/> Ingredientes por producto
          </Menu.Item>
      </Form>
    );

  
    return (
      <Menu fixed="left" borderless className="side" vertical>
        <Menu.Item as={Link} to={'/admin'} 
        active={pathname === '/admin'}>
          <Icon name="home" /> Pedidos
        </Menu.Item>

        <Menu.Item as={Link} to={'/admin/tables'}
         active={pathname === '/admin/tables'}>
          <Icon name="table" /> Mesas
        </Menu.Item>

        <Menu.Item
            as={Link}
            to={"/admin/payments-history"}
            active={pathname === "/admin/payments-history"}>
            <Icon name="history" /> Historial de pagos
        </Menu.Item>

        <Menu.Item
            as={Link}
            to={"/admin/categories"}
            active={pathname === "/admin/categories"}>
            <Icon name="folder" /> Categorias
        </Menu.Item>

        {auth.me?.is_staff && (
            <Menu.Item
                as={Link}
                to={"/admin/users"}
                active={pathname === "/admin/users"}
                >
                <Icon name="users" /> Usuarios
            </Menu.Item>
        )}

  
      <Accordion as={Menu} vertical exclusive>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
          ><Icon name='cart' /> Productos </Accordion.Title>
          <Accordion.Content active={activeIndex === 0} content={SizeForm} />
        </Menu.Item>
      </Accordion>

      <Menu.Item
            as={Link}
            to={"/admin/reporte-venta"}
            active={pathname === "/admin/reporte-venta"}>
            <Icon name="list ol" /> Reporte de Venta
        </Menu.Item>

   
       </Menu>

    );
  }
