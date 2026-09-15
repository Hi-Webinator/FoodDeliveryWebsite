import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import "./_btn.scss";

export type Variant = "primary" | "dark" | "light";
type Size = "sm" | "md" | "lg";

interface BtnProps {
  text: string;
  variant?: Variant;
  size?: Size;
  icon?: IconDefinition | null;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Btn = ({
  text,
  variant = "primary",
  size = "md",
  icon = null,
  type = "button",
  onClick = undefined,
  disabled = false,
  className = "",
}: BtnProps) => {
  const classes = ["btn", `btn--${variant}`, `btn--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{text}</span>
      {icon ? (
        <FontAwesomeIcon icon={icon} className="btn__icon" aria-hidden="true" />
      ) : null}
    </button>
  );
};

export default Btn;
