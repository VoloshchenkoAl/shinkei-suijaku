import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <>
      <main className="mb-10 text-center md:text-left">
        <h1 className="text-2xl font-medium mb-4">
          Hi there 👋. This is match card game, known as shinkei suijaku
        </h1>
        <p className="text-lg">Click to bottom bellow to start game ⬇️</p>
      </main>
      <footer className="text-center">
        <Link
          className="border-2 border-black py-2 px-4 font-mono uppercase"
          to="/prepare"
        >
          Start game
        </Link>
      </footer>
    </>
  );
}

export default WelcomePage;
