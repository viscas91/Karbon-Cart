import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import LoginForm from '../../../auth/src/forms/LoginForm';
import { ProductCreate } from '../../../products/src/components/ProductCreate';
import { ProductList } from '../../../products/src/components/ProductList';
import { VerifiedPage } from '../../../auth/src/pages/VerifiedPage';
import { PasswordResetPage } from '../../../auth/src/pages/PasswordResetPage';
import { ResendEmailTokenPage } from '../../../auth/src/pages/ResendEmailTokenPage';
import { PasswordResetRequestPage } from '../../../auth/src/pages/PasswordResetRequestPage';
import { VendorCreate } from '../../../vendors/src/components/VendorCreate';
import { VendorList } from '../../../vendors/src/components/VendorList';
import AuthRequired from '../../../auth/src/components/AuthRequired';
import { RegisterForm } from '../../../auth/src/forms/RegisterForm';
import { CategoryEditCreate } from '../../../categories/src/components/CategoryEditCreate';
import { CategoryList } from '../../../categories/src/components/CategoryList';

const App: React.FC = () => {
    return (            
        <Router>
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
                        <Route path='/categories/create' element={<CategoryEditCreate />} />
                        <Route path='/categories/:slug/edit' element={<CategoryEditCreate />} />
                        <Route path='/products' element={<ProductList />} />
                        <Route path='/products/create' element={<ProductCreate />} />
                        <Route path='/products/:productId/edit' element={<ProductCreate />} />
                        <Route path='/vendors' element={<VendorList />} />
                        <Route path="/vendors/create" element={<VendorCreate />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default App;