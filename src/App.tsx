import { NavLink, Outlet } from 'react-router-dom';
import { BiHomeHeart, BiSearchAlt2 } from 'react-icons/bi';
import { IconType } from 'react-icons';

type Link = { to: string; label: string; Icon: IconType };
const navLinks: Link[] = [
  {
    label: 'Home',
    to: '/',
    Icon: BiHomeHeart,
  },
  {
    label: 'Search',
    to: '/search',
    Icon: BiSearchAlt2,
  },
];

function App() {
  return (
    <div className="container">
      <nav>
        <ul className="flex items-center space-x-4 text-lg py-2">
          {navLinks.map(navLink => (
            <li key={navLink.to}>
              <NavLink
                to={navLink.to}
                className={({ isActive }) =>
                  `inline-flex justify-center items-center w-10 h-10 rounded-lg
                 hover:bg-slate-800 focus:bg-slate-800 ${
                   isActive ? 'bg-slate-800 text-slate-50/80' : 'bg-slate-800/0'
                 }`
                }
                aria-label={navLink.label}
              >
                <navLink.Icon className="w-6 h-6" aria-hidden="true" />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
