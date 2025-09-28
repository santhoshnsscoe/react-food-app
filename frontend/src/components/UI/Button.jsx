export default function Button({ children, textOnly, className = '', ...props }) {
  const cssClass = textOnly ? "text-button" : "button";
  return (
    <button className={`${cssClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
