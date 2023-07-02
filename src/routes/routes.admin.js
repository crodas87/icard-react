import {AdminLayout} from '../layout';
import { 
    UsersAdmin,
    CategoriesAdmin,
    ProductAdmin, 
    IngredientAdmin, 
    TablesAdmin,
    OrdersAdmin,
    TableDetailsAdmin,
    PaymentsHistory,
    IngredienteProductoAdmin,
    ReporteVentas
} from '../Pages/Admin';

const routesAdmin = [
    {
        path: '/admin',
        layout: AdminLayout,
        component: OrdersAdmin,
        exact: true
    },
    {
        path: '/admin/users',
        layout: AdminLayout,
        component: UsersAdmin,
        exact: true
    },
    {
        path: "/admin/categories", 
        layout: AdminLayout,
        component: CategoriesAdmin,
        exact: true
    },
    {
        path: "/admin/products", 
        layout: AdminLayout,
        component: ProductAdmin,
        exact: true
    },
    {
        path: "/admin/ingredients", 
        layout: AdminLayout,
        component: IngredientAdmin,
        exact: true
    },
    {
        path: "/admin/ingredienteProducto", 
        layout: AdminLayout,
        component: IngredienteProductoAdmin,
        exact: true
    },
    {
        path: "/admin/tables", 
        layout: AdminLayout,
        component: TablesAdmin,
        exact: true
        
    },
    {
        path: "/admin/table/:id", 
        layout: AdminLayout,
        component: TableDetailsAdmin,
        exact: true
    },
    {
        path: "/admin/payments-history",
        layout: AdminLayout,
        component: PaymentsHistory,
        exact: true
    },
    {
        path: "/admin/reporte-venta",
        layout: AdminLayout,
        component: ReporteVentas,
        exact: true
    },
];


export default routesAdmin;