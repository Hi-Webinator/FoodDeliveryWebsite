interface NavLink {
  id: string;
  label: string;
}

interface NavLinksProps {
  /** Section targets rendered in order. */
  links: readonly NavLink[];
  /** Id of the section currently in view. */
  activeId?: string;
  /** Called with a section id when a link is clicked. */
  onNavigate: (id: string) => void;
}

/**
 * Smooth-scroll navigation links. Rendered as buttons rather than anchors so
 * the URL hash never changes — this is a single page with no routing.
 */
const NavLinks = ({ links, activeId = "", onNavigate }: NavLinksProps) => (
  <ul className="links">
    {links.map(({ id, label }) => (
      <li key={id}>
        <button
          type="button"
          onClick={() => onNavigate(id)}
          className={`link ${activeId === id ? "link--active" : ""}`}
          aria-current={activeId === id ? "true" : undefined}
        >
          {label}
        </button>
      </li>
    ))}
  </ul>
);

export default NavLinks;
