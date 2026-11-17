"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
};

// 日付の入力枠。
// スマホの日付の枠は幅がブラウザまかせで、薄い文字（例：「期限」）も出せない。
// そこで、見た目はほかの枠と同じ箱にして、その上に透明な日付の枠を重ねる。
// 箱を押すと、いつものカレンダーが開く。
export default function DateField({ value, onChange, placeholder, className = "" }: Props) {
  return (
    <div
      className={`relative flex items-center overflow-hidden rounded-lg border border-slate-300 bg-white px-3 py-3 text-base ${className}`}
    >
      <span className={`flex-1 truncate ${value ? "" : "text-slate-400"}`}>
        {value ? value.replaceAll("-", "/") : placeholder}
      </span>
      <span aria-hidden className="ml-2">
        📅
      </span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // パソコンでは、箱のどこを押してもカレンダーが開くようにする
        onClick={(e) => {
          try {
            e.currentTarget.showPicker?.();
          } catch {
            // すでに開いているときなどは、そのままにする
          }
        }}
        aria-label={placeholder}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label={`${placeholder}を消す`}
          className="relative z-10 ml-2 px-1 text-slate-400 hover:text-red-600"
        >
          ✕
        </button>
      )}
    </div>
  );
}
