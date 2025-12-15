// Gợi ý tên file: hooks/useQueryParams.ts
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Hook này ĐỌC TẤT CẢ query params từ URL và trả về 3 thứ:
 * 1. `query`: Một object chứa TẤT CẢ params (dưới dạng string).
 * 2. `page`: Param 'page' đã được chuyển thành Number (mặc định là 1).
 * 3. `pageSize`: Param 'pageSize' đã được chuyển thành Number (mặc định là 10).
 */
export const useQueryParams = () => {
  const searchParams = useSearchParams();

  // 1. Chỉ cần MỘT useMemo để chuyển đổi tất cả params
  const query = useMemo(() => {
    const params: { [key: string]: string } = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  }, [searchParams]);

  // 2. Cung cấp sẵn các giá trị phổ biến đã được ép kiểu
  const page = useMemo(() => Number(query.page || 1), [query.page]);
  const pageSize = useMemo(() => Number(query.pageSize || 10), [query.pageSize]);

  return {
    query,    // Tất cả params (ví dụ: { page: "2", keyword: "abc" })
    page,     // Giá trị page (ví dụ: 2)
    pageSize, // Giá trị pageSize (ví dụ: 10)
  };
};

/**
 * Cách sử dụng:
 * * const { query, page, pageSize } = useQueryParams();
 * const { keyword, tab, workUuid } = query; // Lấy bất cứ thứ gì bạn cần
 * * console.log(page); // 2
 * console.log(keyword); // "abc"
 * console.log(workUuid); // "uuid-123" (hoặc undefined nếu không có)
 */