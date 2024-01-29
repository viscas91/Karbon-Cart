import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
const Layout = lazy(() => import('./Layout'));
const LoginForm = lazy(() => import('../../../auth/src/forms/LoginForm'));
const ProductCreate = lazy(() => import('../../../products/src/components/ProductCreate'));
const ProductList = lazy(() => import('../../../products/src/components/ProductList'));
const VerifiedPage = lazy(() => import('../../../auth/src/pages/VerifiedPage'));
const PasswordResetPage = lazy(() => import('../../../auth/src/pages/PasswordResetPage'));
const ResendEmailTokenPage = lazy(() => import('../../../auth/src/pages/ResendEmailTokenPage'));
const PasswordResetRequestPage = lazy(() => import('../../../auth/src/pages/PasswordResetRequestPage'));
const VendorCreate = lazy(() => import('../../../vendors/src/components/VendorCreate'));
const VendorList = lazy(() => import('../../../vendors/src/components/VendorList'));
const AuthRequired = lazy(() => import('../../../auth/src/components/AuthRequired'));
const RegisterForm = lazy(() => import('../../../auth/src/forms/RegisterForm'));
const CategoryCreate = lazy(() => import('../../../categories/src/components/CategoryCreate'));
const CategoryList = lazy(() => import('../../../categories/src/components/CategoryList'));
const SubCategoryEdit = lazy(() => import('../../../categories/src/components/SubCategoryEdit'));
const SubCategoryList = lazy(() => import('../../../categories/src/components/SubCategoryList'));
const ChildCategoryEdit = lazy(() => import('../../../categories/src/components/ChildCategoryEdit'));
const SubCategoryCreate = lazy(() => import('../../../categories/src/components/SubCategoryCreate'));
const CategoryEdit = lazy(() => import('../../../categories/src/components/CategoryEdit'));
const ChildCategoryCreate = lazy(() => import('../../../categories/src/components/ChildCategoryCreate'));
const ChildCategoryList = lazy(() => import('../../../categories/src/components/ChildCategoryList'));

const App: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path='/verified' element={<VerifiedPage />} />
                    <Route path='/password-reset' element={<PasswordResetPage />} />
                    <Route path='/resend-email' element={<ResendEmailTokenPage />} />
                    <Route path='/pcr' element={<PasswordResetRequestPage />} />
                    <Route element={<AuthRequired />}>
                        <Route path="/" element={<Layout />}>
                            <Route path='/categories' element={<CategoryList />} />
                            <Route path='/categories/create' element={<CategoryCreate />} />
                            <Route path='/categories/:id/edit' element={<CategoryEdit />} />
                            <Route path='/subcategories' element={<SubCategoryList />} />
                            <Route path='/subcategories/create' element={<SubCategoryCreate />} />
                            <Route path='/subcategories/:id/edit' element={<SubCategoryEdit />} />
                            <Route path='/childcategories' element={<ChildCategoryList />} />
                            <Route path='/childcategories/create' element={<ChildCategoryCreate />} />
                            <Route path='/childcategories/:id/edit' element={<ChildCategoryEdit />} />
                            <Route path='/products' element={<ProductList />} />
                            <Route path='/products/create' element={<ProductCreate />} />
                            <Route path='/products/:productId/edit' element={<ProductCreate />} />
                            <Route path='/vendors' element={<VendorList />} />
                            <Route path="/vendors/create" element={<VendorCreate />} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App;