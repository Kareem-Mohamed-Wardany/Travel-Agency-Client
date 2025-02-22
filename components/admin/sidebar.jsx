import { BadgeCheck, BarChartBig, Plane, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "Home",
    label: "Home",
    path: "/",
    icon: <Home />,
  },
  {
    id: "trips",
    label: "Trips",
    path: "/admin/trips",
    icon: <Plane />,
  },
];

function MenuItems({ setOpen }) {
  const router = useRouter();

  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map(({ id, label, path, icon }) => (
        <div
          key={id}
          onClick={() => {
            router.push(path);
            if (setOpen) setOpen(false);
          }}
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {icon}
          <span>{label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const router = useRouter();

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex items-center gap-2 mt-5 mb-5">
                <BarChartBig size={30} />
                <span className="text-2xl font-extrabold">
                  Admin Panel
                </span>{" "}
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => router.push("/admin")}
          className="flex cursor-pointer items-center gap-2"
        >
          <BarChartBig size={30} />
          <span className="text-2xl font-extrabold">Admin Panel</span>{" "}
        </div>
        <MenuItems setOpen={setOpen} />
      </aside>
    </>
  );
}

export default AdminSideBar;
