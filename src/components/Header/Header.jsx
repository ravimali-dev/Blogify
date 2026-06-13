import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ]

  return (
    <header className='sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm'>
      <Container>
        <nav className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          {/* Desktop Nav */}
          <ul className='hidden md:flex items-center gap-1'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className='ml-2'>
                <LogoutBtn />
              </li>
            )}
            {!authStatus && (
              <li className='ml-2'>
                <button
                  onClick={() => navigate('/signup')}
                  className='px-5 py-2 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-700 rounded-lg transition-all duration-200'
                >
                  Get Started
                </button>
              </li>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors'
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label='Toggle menu'
          >
            <div className='w-5 h-0.5 bg-gray-700 mb-1.5 transition-all'></div>
            <div className='w-5 h-0.5 bg-gray-700 mb-1.5 transition-all'></div>
            <div className='w-5 h-0.5 bg-gray-700 transition-all'></div>
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className='md:hidden border-t border-gray-100 py-3 pb-4'>
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => { navigate(item.slug); setMenuOpen(false) }}
                  className='block w-full text-left px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors'
                >
                  {item.name}
                </button>
              ) : null
            )}
            {authStatus && <div className='px-4 pt-2'><LogoutBtn /></div>}
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header