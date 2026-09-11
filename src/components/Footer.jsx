function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <h3>Prashanna Maharjan</h3>
          <p>Aspiring Frontend Developer × Photographer x Videographer</p>
        </div>
        <div className="footer-links">
          <a href="mailto:prashanamahan13@gmail.com">Email</a>
          <a href="https://www.instagram.com/_prashanna.maharjan/" target="_blank" rel="noreferrer"><span>Instagram</span></a>
          <a href="tel:+9779843958426">Phone</a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://linktr.ee" target="_blank" rel="noreferrer">linktr.ee</a>
        </div>
      </div>
      <div className="container footer-copyright">
        <p>© {new Date().getFullYear()} Prashanna Maharjan. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
