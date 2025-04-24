// app/(home)/layout.tsx
import SideBarNav from "./../_components/SideBarNav";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <SideBarNav />
      </div>
      {children}
    </>
  ); // Renders whatever is inside (route)
}
