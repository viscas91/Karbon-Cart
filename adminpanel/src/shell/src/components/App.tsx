import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import BrandList from '../../../brands/src/components/BrandList';
import BrandCreate from '../../../brands/src/components/BrandCreate';
import BrandEdit from '../../../brands/src/components/BrandEdit';
import OrderList from '../../../orders/src/components/OrdersList';
import PaymentList from '../../../payments/src/components/PaymentList';
import { useAuthUser } from '../../../auth/src/hooks/useAuth';
import { isTokenExpired } from '../../../common/src/utils/isTokenExpired';
import SiteSettings from '../../../site/src/components/SiteSettings';
const Layout = lazy(() => import('./Layout'));
const LoginForm = lazy(() => import('../../../auth/src/forms/LoginForm'));
const ProductCreate = lazy(() => import('../../../products/src/components/ProductCreate'));
const ProductEdit = lazy(() => import('../../../products/src/components/ProductEdit'));
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
const Dashboard = lazy(() => import('../../../dashboard/Dashboard'));

const App: React.FC = () => {
    const obj = useAuthUser() ?? undefined;
    const role = obj?.role;
    const exp = obj?.exp;

    useEffect(() => {
        if((role && window.location.pathname === '/login') && (!isTokenExpired(exp))){
          window.history.back()
        }
      }, [role, window.location, window.history, exp])

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
                    <Route path="/vendor/signup" element={<VendorCreate />} />
                    <Route element={<AuthRequired />}>
                        <Route path="/admin" element={<Layout />}>
                            <Route path='' element={<Dashboard />} />
                            <Route path='brands' element={<BrandList />} />
                            <Route path='brands/create' element={<BrandCreate />} />
                            <Route path='brands/:id/edit' element={<BrandEdit />} />
                            <Route path='categories' element={<CategoryList />} />
                            <Route path='categories/create' element={<CategoryCreate />} />
                            <Route path='categories/:id/edit' element={<CategoryEdit />} />
                            <Route path='subcategories' element={<SubCategoryList />} />
                            <Route path='subcategories/create' element={<SubCategoryCreate />} />
                            <Route path='subcategories/:id/edit' element={<SubCategoryEdit />} />
                            <Route path='childcategories' element={<ChildCategoryList />} />
                            <Route path='childcategories/create' element={<ChildCategoryCreate />} />
                            <Route path='childcategories/:id/edit' element={<ChildCategoryEdit />} />
                            <Route path='products' element={<ProductList />} />
                            <Route path='products/create' element={<ProductCreate />} />
                            <Route path='products/:productId/edit' element={<ProductEdit />} />
                            <Route path='orders' element={<OrderList />} />
                            <Route path='payments' element={<PaymentList />} />
                            <Route path='vendors' element={<VendorList />} />
                            <Route path="vendors/create" element={<VendorCreate />} />
                            <Route path="site" element={<SiteSettings />} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App;