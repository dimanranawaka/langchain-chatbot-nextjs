import React from 'react';

const Layout: React.FC = ({ children }) => {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    );
};

export default Layout;