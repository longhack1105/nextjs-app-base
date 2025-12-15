import { useCallback, useRef } from 'react';
import axios from 'axios';

/********** custom hook cancel request axios **********/
export const useCancelToken = () => {
  const axiosSource = useRef<any>(null);
  const newCancelToken = useCallback(() => {
    axiosSource.current = axios.CancelToken.source();
    return axiosSource.current?.token;
  }, []);
  const cancel = useCallback(() => {
    return axiosSource?.current?.cancel();
  }, []);
  return { newCancelToken, cancelAxios: cancel };
};

/*
// Cách dùng
import { useEffect, useState } from 'react';
import axios from 'axios';
// 1. Import hook từ file bên trên
import { useCancelToken } from '../hooks/useCancel';

// Giả sử chúng ta có một component UserProfile
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<any>(null); // State để lưu data
  const [loading, setLoading] = useState(false); // State loading
  const [error, setError] = useState<Error | null>(null); // State lỗi
  
  // 2. Khởi tạo hook
  const { newCancelToken, cancelAxios } = useCancelToken();

  useEffect(() => {
    // 3. Định nghĩa hàm fetch data
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      setUser(null);
      
      // 4. Tạo một token MỚI cho request này
      const cancelToken = newCancelToken();

      try {
        const response = await axios.get(`https://api.example.com/users/${userId}`, {
          // 5. Gắn token vào request config của Axios
          cancelToken: cancelToken, 
        });
        
        // Chỉ set data nếu request thành công
        setUser(response.data);
        
      } catch (error: any) {
        // 6. Kiểm tra xem lỗi có phải là do ta chủ động hủy (cancel) không
        if (axios.isCancel(error)) {
          console.log('Request đã bị hủy:', error.message);
          // Khi request bị hủy, ta KHÔNG set lỗi, vì đây là hành động chủ ý
        } else {
          // Xử lý các lỗi khác (404, 500, ...)
          console.error('Lỗi khi fetch data:', error);
          setError(error);
        }
      } finally {
        // Cuối cùng, tắt loading (chỉ khi nó không bị hủy)
        if (!axios.isCancel(error)) {
          setLoading(false);
        }
      }
    };

    // Gọi hàm fetch data
    fetchUser();

    // 7. PHẦN QUAN TRỌNG NHẤT: Hàm dọn dẹp (cleanup function)
    // Hàm này sẽ tự động chạy khi component bị gỡ bỏ (unmount)
    // hoặc khi `userId` thay đổi (trước khi effect mới chạy)
    return () => {
      // 8. Gọi hàm hủy request
      console.log('Component unmount/re-run, đang hủy request...');
      cancelAxios(); 
    };

  // 9. Đặt dependencies cho useEffect
  }, [userId, newCancelToken, cancelAxios]); 

  // Render UI dựa trên state
  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error.message}</p>;
  if (!user) return <p>Không tìm thấy user.</p>;

  return <div>Tên user: {user.name}</div>;
}

export default UserProfile;
*/

/********** custom hook cancel request axios new way **********/
export const useCancelTokenNewWay = () => {
  const abortController = useRef<AbortController | null>(null);

  const newCancelToken = useCallback(() => {
    abortController.current = new AbortController();
    return abortController.current.signal;
  }, []);

  const abort = useCallback(() => {
    if (abortController.current) {
      abortController.current.abort();
    }
  }, []);

  return { newCancelToken, cancelAxios: abort };
};

/*
// Cách dùng
const { newSignal, abort } = useCancelTokenNewWay();
const signal = newSignal();
axios.get('/api', { signal: signal }); // truyền 'signal' thay vì 'cancelToken'

return () => abort(); // gọi abort() để hủy
*/
