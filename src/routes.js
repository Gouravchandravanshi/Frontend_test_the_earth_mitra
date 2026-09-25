import { createBrowserRouter } from 'react-router';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { BlogsListPage, BlogDetailPage } from './pages/BlogsPage';
import { CollectionsListPage, CollectionDetailPage } from './pages/CollectionsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            { index: true, Component: HomePage },
            { path: 'products', Component: ProductsPage },
            { path: 'products/:slug', Component: ProductDetailPage },
            { path: 'blogs', Component: BlogsListPage },
            { path: 'blogs/:slug', Component: BlogDetailPage },
            { path: 'collections', Component: CollectionsListPage },
            { path: 'collections/:slug', Component: CollectionDetailPage },
            { path: 'about', Component: AboutPage },
            { path: 'contact', Component: ContactPage },
        ],
    },
]);
