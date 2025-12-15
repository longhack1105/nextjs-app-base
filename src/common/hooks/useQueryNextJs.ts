// Gợi ý tên file: hooks/useQueryActions.ts
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useTransition } from "react";

/**
 * Hook này dùng để THỰC THI HÀNH ĐỘNG:
 * set, remove, hoặc clear query params trên URL.
 * Nó sử dụng App Router ('next/navigation').
 */
export const useQueryActions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  /**
   * Cập nhật hoặc xóa nhiều query params cùng lúc.
   * - Nếu value là 'undefined', 'null', hoặc '' (chuỗi rỗng), key đó sẽ bị xóa.
   * - Ngược lại, key đó sẽ được set/cập nhật.
   */
  const setQuery = (
    queryObject: { [key: string]: string | number | undefined | null }
  ) => {
    // 1. Tạo bản sao có thể chỉnh sửa của params hiện tại
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    // 2. Lặp qua object để set/delete
    for (const [key, value] of Object.entries(queryObject)) {
      if (value === undefined || value === null || value === "") {
        current.delete(key);
      } else {
        current.set(key, String(value));
      }
    }

    // 3. Tạo URL mới
    const search = current.toString();
    const url = search ? `${pathname}?${search}` : pathname;

    // 4. Thay thế URL mà không cuộn trang
    startTransition(() => {
      router.replace(url, { scroll: false });
    });
  };

  /**
   * Xóa một hoặc nhiều query params khỏi URL.
   */
  const removeQuery = (keys: string | string[]) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (Array.isArray(keys)) {
      keys.forEach((key) => current.delete(key));
    } else {
      current.delete(keys);
    }

    const search = current.toString();
    const url = search ? `${pathname}?${search}` : pathname;

    startTransition(() => {
      router.replace(url, { scroll: false });
    });
  };

  return {
    setQuery,
    removeQuery,
    isPending, // Trạng thái pending, có thể dùng để show loading
  };
};