import { NavLink, Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div id="root"> {}
      <header>
          <h1>W42</h1>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/authors">Authors</NavLink></li>
            <li><NavLink to="/books">Books</NavLink></li>
          </ul>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <em>Made with React & react-router</em>
      </footer>
    </div>
  );
}
