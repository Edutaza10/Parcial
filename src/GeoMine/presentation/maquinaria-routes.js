const maquinariaList = () => import('./views/maquinaria-list.vue');
const maquinariaForm = () => import('./views/maquinaria-form.vue');

const maquinariaRoutes = [
    {   path: 'maquinarias',             name: 'maquinaria-list',      component: maquinariaList, meta: {title: 'Maquinarias'}},
    {   path: 'maquinarias/new',         name: 'maquinaria-new',    component: maquinariaForm, meta: {title: 'New Maquinaria'}},
    {   path: 'categories/:id/edit',    name: 'publishing-category-edit',   component: categoryForm, meta: {title: 'Edit Category'}},
    {   path: 'tutorials',              name: 'publishing-tutorials',       component: tutorialList, meta: {title: 'Tutorials'}},
    {   path: 'tutorials/new',          name: 'publishing-tutorial-new',    component: tutorialForm, meta: {title: 'New Tutorial'}},
    {   path: 'tutorials/:id/edit',     name: 'publishing-tutorial-edit',   component: tutorialForm, meta: {title: 'Edit Tutorial'}}
];

export default maquinariaRoutes;