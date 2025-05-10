import {Link} from "react-router-dom";

const tools = [
  {label: "🔗 URL Shortener", path: "/url-shortner"},
  {label: "📷 Link to QR Code Generator", path: "/link-to-qr"},
];

const LandingPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex  justify-center bg-gradient-to-br bg-gray-100 to-white px-4 py-10">
      <div className="max-w-4xl w-full text-center md:mt-10 mt-3">
        <p className="text-lg text-gray-700 mb-10">
          A simple toolset to make your online life easier
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((tool, index) => {
            const row = Math.floor(index / 2);
            const col = index % 2;

            const isMobileDark = index % 2 === 0;

            const isDesktopDark = (row + col) % 2 === 0;

            const base =
              "block py-5 px-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 text-lg font-medium";

            const mobileBg = isMobileDark
              ? "bg-purple-700 text-white hover:bg-purple-800"
              : "bg-purple-200 text-purple-900 hover:bg-purple-300";

            const desktopBg = isDesktopDark
              ? "md:bg-purple-700 md:text-white md:hover:bg-purple-800"
              : "md:bg-purple-200 md:text-purple-900 md:hover:bg-purple-300";

            return (
              <Link
                key={index}
                to={tool.path}
                className={`${base} ${mobileBg} ${desktopBg}`}
              >
                {tool.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
