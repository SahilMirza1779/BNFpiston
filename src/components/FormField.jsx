export default function FormField({
  label,
  name,
  error,
  as = "input",
  required,
  ...props
}) {
  const Tag = as;
  return (
    <div>
      {/* text-silver ko text-gray-700 kiya */}
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        {label}{" "}
        {required && (
          <span className="text-brand" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <Tag
        id={name}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-err` : undefined}
        className={`field ${error ? "field-error" : ""} ${as === "textarea" ? "min-h-[120px] resize-y" : ""}`}
        {...props}
      />
      {error && (
        <p id={`${name}-err`} role="alert" className="mt-1 text-sm text-brand">
          {error}
        </p>
      )}
    </div>
  );
}
