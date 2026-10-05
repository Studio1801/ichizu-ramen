import { LazyMotion, domAnimation } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import Home from '@/pages/Home';

const Privacy = lazy(() => import('@/pages/privacy'));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy">
        <Suspense fallback={null}>
          <Privacy />
        </Suspense>
      </Route>
      <Route>
        <div className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground font-serif">
          <h1 className="text-4xl mb-4">404</h1>
          <p className="text-muted-foreground font-sans uppercase tracking-widest text-sm">Path not found</p>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </LazyMotion>
  );
}

export default App;
