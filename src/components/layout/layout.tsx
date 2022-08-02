import type { PropsWithChildren } from 'react';

function Layout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className="min-h-screen overflow-x-hidden p-4 flex items-center justify-center">
      <div>{children}</div>
    </div>
  );
}

export default Layout;
