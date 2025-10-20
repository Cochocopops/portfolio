export default function Footer() {
  return (
    <footer className="mt-32 mb-10 text-center text-xs text-gray-500">
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://linkedin.com" target="_blank" className="hover:text-gray-900 transition">LinkedIn</a>
        <a href="https://github.com" target="_blank" className="hover:text-gray-900 transition">GitHub</a>
        <a href="/assets/home/CORENTIN CHANTEREAU.pdf" download className="hover:text-gray-900 transition">CV</a>
      </div>
      <p>© 2025 Corentin Chantereau — All rights reserved</p>
    </footer>
  );
}
