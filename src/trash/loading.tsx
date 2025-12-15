// app/profile/loading.tsx (Client Component)
"use client"; // <<< BẮT BUỘC để dùng react-lottie

import Lottie from "react-lottie";
// Giả định file JSON nằm trong thư mục 'src/app/public/static/anim'
// Trong môi trường Next.js, bạn nên dùng đường dẫn tương đối (hoặc cấu hình alias)
// Nếu file nằm trong thư mục 'public', bạn có thể dùng URL, nhưng với 'import' thì cần đường dẫn chính xác.
// Tôi sẽ giữ lại đường dẫn import của bạn.
import loadingAnimationData from "@/../public/static/anim/loading_Bibet.json";

export default function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData, // Truyền trực tiếp dữ liệu đã import
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        padding: "40px",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <h2
        style={{
          marginBottom: "8px",
        }}
      >
        Đang tải dữ liệu...
      </h2>
      <p>Vui lòng chờ trong giây lát.</p>
    </div>
  );
}
