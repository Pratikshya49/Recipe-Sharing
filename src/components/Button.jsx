function Button({ text, onClick, type = "button", variant = "primary", disabled = false }) {
  const variantStyles = {
    primary: "bg-orange-600 hover:bg-orange-700 text-white",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white",
    warning: "bg-amber-500 hover:bg-amber-600 text-white",
    danger: "bg-rose-600 hover:bg-rose-700 text-white",
    ghost: "bg-transparent hover:bg-orange-50 text-orange-700 border border-orange-200",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium shadow-sm transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant] || variantStyles.primary}`}
    >
      {text}
    </button>
  );
}

export default Button;
