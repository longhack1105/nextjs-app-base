import { toastText } from "../funcs/toast";


/**
 * Hook copy to clipboard phiên bản hiện đại, sử dụng
 * API 'navigator.clipboard' bất đồng bộ.
 */
export function useCopy(text: string, message?: string) {
  const copyToClipboard = async () => {
    // 1. Kiểm tra xem trình duyệt có hỗ trợ API này không
    if (!navigator.clipboard) {
      // Nếu không (trình duyệt quá cũ), dùng lại cách cũ của bạn
      try {
        var input = document.createElement('input');
        input.setAttribute('value', text);
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        toastText({ msg: message || 'Copy thành công!' });
        return true;
      } catch (err) {
        toastText({ msg: 'Copy thất bại!' });
        return false;
      }
    }

    // 2. Dùng cách hiện đại
    try {
      await navigator.clipboard.writeText(text);
      toastText({ msg: message || 'Copy thành công!' });
      return true;
    } catch (err) {
      console.error('Failed to copy: ', err);
      toastText({ msg: 'Copy thất bại!' });
      return false;
    }
  };

  // Trả về một hàm để component có thể gọi
  return { copyToClipboard };
}

/*
// Cách dùng trong component:
const { copyToClipboard } = useCopy("Hello World");

<button onClick={copyToClipboard}>
  Copy
</button>
*/
