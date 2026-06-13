import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#fdfbf7]/90 backdrop-blur border-b border-gray-200">
      <Container>
        <nav className="flex items-center justify-between py-3">
          <Link to="/">
            <Logo width="140px" />
          </Link>

          <ul className="flex items-center gap-1">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      location.pathname === item.slug
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {!authStatus && (
              <>
                <li>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/signup')}
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                  >
                    Sign Up
                  </button>
                </li>
              </>
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header