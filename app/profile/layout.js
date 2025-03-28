import Footer from "../_layout/components/footer";

export default function RootLayout({ children }) {
  return (
    <div className="">
      <main className="flex-grow">{children}</main>
    </div>
  );
}
