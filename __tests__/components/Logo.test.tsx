import { render, screen } from '@testing-library/react'
import Logo from '@/components/Logo'

describe('Logo', () => {
  it('renders the logo image', () => {
    render(<Logo />)
    const logoImage = screen.getByAltText('PlayersArcadia Logo')
    expect(logoImage).toBeInTheDocument()
  })

  it('renders with custom image path', () => {
    const customPath = '/custom/logo.png'
    render(<Logo imagePath={customPath} />)
    const logoImage = screen.getByAltText('PlayersArcadia Logo')
    // Next.js Image component transforms the src, so we check for URL-encoded version
    expect(logoImage).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(customPath)))
  })

  it('links to home page', () => {
    render(<Logo />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')
  })
})

