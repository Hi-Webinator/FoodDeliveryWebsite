interface MenuStateProps {
  /** Decorative emoji shown above the message. */
  icon: string;
  title: string;
  text?: string;
  /** Renders a button when paired with `onAction`. */
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Shared presentation for the menu's loading, error and empty states.
 */
const MenuState = ({
  icon,
  title,
  text = "",
  actionLabel = "",
  onAction = undefined,
}: MenuStateProps) => (
  <div className="state" role="status">
    <span className="state__icon" aria-hidden="true">
      {icon}
    </span>
    <p className="state__title">{title}</p>
    {text ? <p className="state__text">{text}</p> : null}
    {actionLabel && onAction ? (
      <button type="button" className="state__action" onClick={onAction}>
        {actionLabel}
      </button>
    ) : null}
  </div>
);

export default MenuState;
