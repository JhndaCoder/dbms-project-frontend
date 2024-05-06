import { Suspense } from "react";

const withSuspense = (Component, fallback = <h1>Loading...</h1>) => {
    const WrappedComponent = props => (
        <Suspense fallback={fallback}>
            <Component {...props} />
        </Suspense>
    );

    WrappedComponent.displayName = `withSuspense(${Component.displayName || Component.name})`;

    return WrappedComponent;
};

export default withSuspense;
