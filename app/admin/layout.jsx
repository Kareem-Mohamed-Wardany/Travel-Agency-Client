import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
export const metadata = {
  title: "Travel Admin Panel",
  description: "Panel for Travel Agency for Admins",
};
function AdminLayout({ children }) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}

export default AdminLayout;
