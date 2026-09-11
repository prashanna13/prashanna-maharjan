import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import './ProjectPage.css'

function ProjectPage() {
  const project = useMemo(() => {
    const slug = window.location.pathname.split('/').filter(Boolean).pop()
    return projects.find((item) => item.slug === slug) || projects[0]
  }, [])

  if (!project) return null

  return (
    <article className="project-page section-pad">
      <div className="container">
        <header className="project-header">
          <p className="eyebrow">{project.category}</p>
          <h1 className="page-title">{project.title}</h1>
          <div className="project-meta-row">
            <span>{project.discipline}</span>
            <span>{project.year}</span>
            <span>{project.summary}</span>
          </div>
        </header>

        <div className="hero-shot">
          <img src={project.image} alt={project.title} />
        </div>

        <div className="project-body">
          <div className="project-description">
            <p>{project.description}</p>
            {project.externalUrl ? (
              <a className="project-external-link" href={project.externalUrl} target="_blank" rel="noreferrer">
                Open live website <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>

          <dl className="project-details">
            {project.credits.map((credit) => (
              <div key={credit.label}>
                <dt>{credit.label}</dt>
                <dd>{credit.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="project-gallery">
          {project.gallery.map((image, index) => (
            <img key={`${project.slug}-${index}`} src={image} alt={`${project.title} gallery ${index + 1}`} />
          ))}
        </div>

        {project.landscapeGallery?.length ? (
          <div className="project-gallery project-gallery-landscape">
            {project.landscapeGallery.map((image, index) => (
              <img key={`${project.slug}-landscape-${index}`} src={image} alt={`${project.title} landscape gallery ${index + 1}`} />
            ))}
          </div>
        ) : null}

        {project.video ? (
          <div className="project-video">
            <video controls poster={project.image}>
              <source src={project.video} type="video/mp4" />
            </video>
          </div>
        ) : null}

        <div className="project-tech">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <nav className="project-footer-nav">
          <Link to="/" className="nav-prev"><span>Previous</span><strong>Home</strong></Link>
          <Link to="/" className="nav-next"><span>Next</span><strong>Selected Works</strong></Link>
        </nav>
      </div>
    </article>
  )
}

export default ProjectPage
