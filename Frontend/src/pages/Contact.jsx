import { Link } from "react-router-dom";

const contactDetails = [
  { icon: "✉️", label: "Email", value: "support@recipehub.com" },
  { icon: "📞", label: "Phone", value: "+977 9800 000 000" },
  { icon: "📍", label: "Address", value: "Kathmandu, Nepal" },
  { icon: "🕐", label: "Hours", value: "Mon – Fri, 9:00 AM – 6:00 PM" },
];

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="max-w-md mx-auto bg-white rounded-3xl border border-orange-100/60 shadow-sm p-6 md:p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mt-2">Contact Us</h2>
          <p className="text-gray-500 text-sm mt-1">
            Have a question, feedback, or a recipe to share?
          </p>
        </div>

        <div className="divide-y divide-orange-50">
          {contactDetails.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 py-4"
            >
              <span className="w-11 h-11 shrink-0 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-xl">
                {item.icon}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="mt-0.5 font-semibold text-gray-800 truncate">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6 border-t border-orange-50 pt-5">
          This is a coursework project. Head back to{" "}
          <Link to="/" className="font-semibold text-orange-600 hover:text-orange-700">
            browse recipes
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
