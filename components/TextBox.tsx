type Props = {
    id: string,
    nome: string,
    placeholder?: string,
    value: string;
    onChange: (value: string) => void;
}

export function TextBox({ nome, id, placeholder, value, onChange }: Props) {
    return (
        <div className="flex flex-col gap-2">
            <label>{nome}</label>
            <input type="text" id={id} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="text-sm w-full bg-[#303843] px-4 py-4 rounded-sm"/>
        </div>
    )
}