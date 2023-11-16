import { ChangeEvent } from "react"

interface SearchProps {
    type: string,
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    className: string
}
export const Search = ({ type, value, onChange, className }: SearchProps) => {
    return (
    <input className={className}
        type={type}
        value={value}
        onChange={onChange}
    />
    )
}