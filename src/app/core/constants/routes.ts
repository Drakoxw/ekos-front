export const PATH = {
  HOME: 'home',
  ME: 'me',
  PRODUCTS: 'products',
}

export const ROUTES = [
  {
    label: 'Inicio',
    path: `/${PATH.HOME}`,
    private: true
  },
  {
    label: 'Productos',
    path: `/${PATH.PRODUCTS}`,
    private: true
  },
  {
    label: 'Yo',
    path: `/${PATH.ME}`,
    private: true
  },
];

export const PRIVATES_ROUTES = ROUTES.filter((route) => route.private).map((route) => route.path)
export const PUBLIC_ROUTES = ROUTES.filter((route) => !route.private).map((route) => route.path)
