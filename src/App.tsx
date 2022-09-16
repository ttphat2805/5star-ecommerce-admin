import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DefaultLayout } from '~/layouts/';
import { privateRoutes, publicRoutes } from '~/routes';
import './App.css';
import PrivateRoutes from './components/PrivateRoutes';

interface FragmentLayoutProps {
    Children: React.ComponentType;
}

function FragmentLayout({ Children }: FragmentLayoutProps) {
    return <Children />;
}

function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.Component;

                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = FragmentLayout;
                    }
                    return <Route key={index} path={route.path} element={<Layout Children={Page} />} />;
                })}
                <Route element={<PrivateRoutes />}>
                    {privateRoutes.map((route, index) => {
                        const Page = route.Component;

                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = FragmentLayout;
                        }
                        return <Route key={index} path={route.path} element={<Layout Children={Page} />} />;
                    })}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
