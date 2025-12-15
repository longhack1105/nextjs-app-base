import { Button as RadixButton } from "@radix-ui/themes";
import { ButtonProps } from "@radix-ui/themes";
import styles from "./Button.module.scss";
import { useRef } from "react";

// Sử dụng interface ButtonProps của Radix để đảm bảo nhận đầy đủ props
// Đảm bảo PropsButton nhận tất cả thuộc tính của RadixButton
interface PropsButton extends ButtonProps {}

// Component nhận trực tiếp các props (bao gồm onClick, radius, variant...)
function Button({
  radius = "large",
  variant = "solid",
  children, // Nhận nội dung nút
  disabled = false,
  onClick,
  ...restProps
}: PropsButton) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const button = buttonRef.current;
    if (!button) return;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add(styles.ripple);

    const ripple = button.getElementsByClassName(styles.ripple)[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(event);
    onClick?.(event);
  };

  return (
    <RadixButton
      ref={buttonRef}
      className={styles.container}
      radius={radius}
      variant={variant}
      disabled={disabled}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </RadixButton>
  );
}

export default Button;
