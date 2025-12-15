import { BadgeCheck, CircleAlert, CircleCheck, CircleX, Info, Megaphone, MessageCircle, MessageCircleMore, Volume2 } from "lucide-react";
import { toast } from "react-toastify";

// Định nghĩa props
interface ToastProps {
  msg: string;
  duration?: number;
  width?: string;
}

// Hàm này đã được sửa để sử dụng 'width' truyền vào
const getCustomStyles = (width?: string) => ({
  style: {
    width: width || "400px",
    maxWidth: "max-content",
  },
});

/**
 * Hiển thị toast mặc định (giống Warn)
 */
export const toastText = ({ msg, duration = 3000, width }: ToastProps) =>
  toast(msg, {
    position: "top-center",
    autoClose: duration,
    closeButton: false,
    className: "toastify-custom toastify-custom-warn",
    icon: <Volume2 />,
    progressClassName: "toast-progress-warn",
    ...getCustomStyles(width),
  });

/**
 * Hiển thị toast Thành công
 */
export const toastSuccess = ({ msg, duration = 3000, width }: ToastProps) => {
  return toast(msg, {
    position: "top-center",
    autoClose: duration,
    closeButton: false,
    className: "toastify-custom toastify-custom-success",
    icon: <CircleCheck />,
    progressClassName: "toast-progress-success",
    ...getCustomStyles(width),
  });
};

/**
 * Hiển thị toast Thông tin
 */
export const toastInfo = ({ msg, duration = 3000, width }: ToastProps) =>
  toast(msg, {
    position: "top-center",
    autoClose: duration,
    closeButton: false,
    className: "toastify-custom toastify-custom-info",
    icon: <Info />,
    progressClassName: "toast-progress-info",
    ...getCustomStyles(width),
  });

/**
 * Hiển thị toast Cảnh báo
 */
export const toastWarn = ({ msg, duration = 3000, width }: ToastProps) =>
  toast(msg, {
    position: "top-center",
    autoClose: duration,
    closeButton: false,
    className: "toastify-custom toastify-custom-warn",
    icon: <CircleAlert />,
    progressClassName: "toast-progress-warn",
    ...getCustomStyles(width),
  });

/**
 * Hiển thị toast Lỗi
 */
export const toastError = ({ msg, duration = 3000, width }: ToastProps) =>
  toast(msg, {
    position: "top-center",
    autoClose: duration,
    closeButton: false,
    className: "toastify-custom toastify-custom-error",
    icon: <CircleX />,
    progressClassName: "toast-progress-error",
    ...getCustomStyles(width),
  });
