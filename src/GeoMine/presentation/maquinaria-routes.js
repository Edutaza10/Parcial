const maquinariaList = () => import('./views/maquinaria-list.vue');
const maquinariaForm = () => import('./views/maquinaria-form.vue');

const maquinariaRoutes = [
    {   path: 'maquinarias',             name: 'maquinaria-list',      component: maquinariaList, meta: {title: 'Maquinarias'}},
    {   path: 'maquinarias/new',         name: 'maquinaria-new',    component: maquinariaForm, meta: {title: 'New Maquinaria'}},
];

export default maquinariaRoutes;