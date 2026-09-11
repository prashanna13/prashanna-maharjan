import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { projects } from '../data/projects'
import './SelectedWorkPage.css'

function SelectedWorkPage() {
  const canvasRef = useRef(null)
  const viewportRef = useRef(null)
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const viewport = viewportRef.current
    if (!canvas || !viewport) return undefined

    const context = gsap.context(() => {
      gsap.set(canvas, { x: 0, y: 0 })

      const clampPosition = (x, y) => {
        const maxX = Math.max(0, (canvas.offsetWidth - viewport.clientWidth) / 2)
        const maxY = Math.max(0, (canvas.offsetHeight - viewport.clientHeight) / 2)
        return {
          x: gsap.utils.clamp(-maxX, maxX, x),
          y: gsap.utils.clamp(-maxY, maxY, y)
        }
      }

      const moveCanvas = (x, y, duration = 0.45) => {
        const nextPosition = clampPosition(x, y)
        positionRef.current = nextPosition
        gsap.to(canvas, { ...nextPosition, duration, ease: 'power3.out', overwrite: true })
      }

      let focusedCard = null

      const onPointerOver = (event) => {
        const card = event.target.closest('.project-card')
        if (!card || card === focusedCard || !viewport.contains(card)) return

        focusedCard = card
        const viewportBounds = viewport.getBoundingClientRect()
        const cardBounds = card.getBoundingClientRect()
        const deltaX = viewportBounds.left + viewportBounds.width / 2 - (cardBounds.left + cardBounds.width / 2)
        const deltaY = viewportBounds.top + viewportBounds.height / 2 - (cardBounds.top + cardBounds.height / 2)
        const safeDeltaX = gsap.utils.clamp(event.clientX - cardBounds.right, event.clientX - cardBounds.left, deltaX)
        const safeDeltaY = gsap.utils.clamp(event.clientY - cardBounds.bottom, event.clientY - cardBounds.top, deltaY)
        moveCanvas(positionRef.current.x + safeDeltaX, positionRef.current.y + safeDeltaY)
      }

      viewport.addEventListener('pointerover', onPointerOver)

      return () => {
        viewport.removeEventListener('pointerover', onPointerOver)
      }
    }, viewportRef)

    return () => context.revert()
  }, [])

  return (
    <section className="selected-work-page" ref={viewportRef} aria-label="Selected work canvas">
      <div className="selected-work-intro" data-reveal>
        <p className="eyebrow">Selected work</p>
        <h1>Move through<br />the work.</h1>
        <p className="canvas-instructions">Point to a folder to focus the work<br />Open a folder to view the work</p>
      </div>
      <div className="canvas-status" aria-hidden="true"><span />Point to folder / Open folder</div>
      <div className="project-canvas" ref={canvasRef} data-reveal>
        {projects.map((project, index) => {
          return (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className={`project-card project-${index + 1}`}
            >
              <span className="project-folder-tab" aria-hidden="true" />
              <img src={project.image} alt={project.title} />
              <div className="project-meta">
                <span>{project.category}</span>
                <strong>{project.title}</strong>
                <span>{project.year}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default SelectedWorkPage
