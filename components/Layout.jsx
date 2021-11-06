import React from 'react';
import {Header} from "./index";

const MyComponent = ({children} ) => {
    return (
        <>
         <Header/>
            {children}
        </>
    );
};

export default MyComponent;
