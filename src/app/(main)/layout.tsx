import BaseLayout from "@/components/layout/BaseLayout";
import React from "react";

// Layout này sẽ áp dụng cho tất cả trang bên trong (main)
export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return <BaseLayout>{children}</BaseLayout>;
}
