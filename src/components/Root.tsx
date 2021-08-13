import React from 'react';

import { Router, RouteComponentProps } from '@reach/router';

import HomePage from './HomePage';
import ReportsPage from './ReportsPage';
import CategoriesPage from './CategoriesPage';

export interface RouteItemProps {
  path: string;
  component: React.ReactNode;
}

type RouteTypeProps = RouteItemProps;

const routes: RouteItemProps[] = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/categories',
    component: CategoriesPage,
  },
  {
    path: '/reports',
    component: ReportsPage,
  }
]

const PrivateRoute = ({ component, path, ...rest }: RouteTypeProps) => {
  const Component = component as React.FC<RouteComponentProps>;

  return <Component path={path} {...rest} />;
};

const Root = () => {
  return (
    <div data-testid="routes-builder">
      <Router>
        {routes.map((route: RouteItemProps, i: number) =>
          <PrivateRoute key={i} {...route} />
        )}
      </Router>
    </div>
  );
}

export default Root;
