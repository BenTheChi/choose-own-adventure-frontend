export default function RadioButton({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  return (
    <label
      className={`border-3 border-black py-2 rounded-md text-2xl px-10 ${
        name === "theme" ? "bg-gray-600 text-white" : "bg-amber-200 text-black"
      }`}
    >
      <input type="radio" name={name} value={value} className="mr-3" />
      {value}
    </label>
  );
}
