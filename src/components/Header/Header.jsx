import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ]

  const handleNav = (slug) => {
    navigate(slug)
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-[#fdfbf7]/90 backdrop-blur border-b border-gray-200">
      <Container>
        <nav className="flex items-center justify-between py-3">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <Logo width="130px" />
          </Link>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => handleNav(item.slug)}
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
                    onClick={() => handleNav('/login')}
                    className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('/signup')}
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

          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <path d="M6 6L18 18M6 18L18 6" />
              ) : (
                <path d="M3 6H21M3 12H21M3 18H21" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden pb-4">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNav(item.slug)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
                      onClick={() => handleNav('/login')}
                      className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNav('/signup')}
                      className="w-full text-left px-4 py-2 rounded-lg text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                    >
                      Sign Up
                    </button>
                  </li>
                </>
              )}

              {authStatus && (
                <li>
                  <div onClick={() => setMenuOpen(false)}>
                    <LogoutBtn />
                  </div>
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header