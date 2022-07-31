import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen overflow-x-hidden p-4 flex items-center justify-center">
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
