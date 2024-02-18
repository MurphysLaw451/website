import { useCallback, useState } from 'react'

export const useFinishVerification = (hash: string) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [response, setResponse] = useState(null)
    const _fetch = async (_hash: string) => {
        setIsLoading(true)
        try {
            const res = await fetch(
                process.env.NEXT_PUBLIC_BOUNCER_FINISH_VERIFICATION.replace(
                    '{hash}',
                    _hash
                )
            )
            const json = await res.json()
            setResponse(json)
        } catch (err) {
            setIsLoading(false)
            setError(err)
        } finally {
            setIsLoading(false)
        }
    }

    const request = useCallback(() => {
        setError(null)
        _fetch(hash)
    }, [hash])
    return { isLoading, error, response, request }
}
