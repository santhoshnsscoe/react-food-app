export default function Input({ label, id, ...props }) {
  return (
    <div className="form__field form__input">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} />
    </div>
  );
}
