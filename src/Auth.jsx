import { useState } from 'react'
import { useAuth } from './use-auth'

export default function Auth() {
    const auth = useAuth()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    return (
        <div className="row flex flex-center">
            <div className="col-6 form-widget">
                <h1 className="header">Supabase + React</h1>
                <p className="description">Sign in via magic link with your email below</p>
                <div>
                    <input
                        className="inputField"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            auth.signin(email, pass)
                        }}
                        className={'button block'}
                        disabled={loading}
                    >
                        {loading ? <span>Loading</span> : <span>Send magic link</span>}
                    </button>
                </div>
            </div>
        </div>
    )
}