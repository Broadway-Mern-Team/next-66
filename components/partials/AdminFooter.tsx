export const AdminFooter = () => {
  return (
    <footer className="flex h-12 shrink-0 items-center justify-between border-t border-slate-200 bg-white px-4 text-sm text-slate-500 sm:px-6">
      <span>&copy; 2025-{new Date().getFullYear()} Broadway Infosys</span>
      <span>v1.0.0</span>
    </footer>
  );
}