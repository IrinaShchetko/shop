import { ChangeEvent, useCallback, useState } from "react"

export const useSearch = () => {
    const [searcher, setSearcher] = useState('')
    const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.toLowerCase()
        setSearcher(inputValue)
    }, [])
    return ({
        searcher,
        handleInput
    }
    )
}