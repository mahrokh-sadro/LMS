import SideBarNav from "./../_components/SideBarNav";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div style={{ display: "flex", height: "100vh" }}>
        <SideBarNav />
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flexGrow: 1, padding: "20px" }}>{children}</div>
        </div>
      </div>
    </>
  );
}
