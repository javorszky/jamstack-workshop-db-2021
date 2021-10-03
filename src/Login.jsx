import { useState } from 'react'
import { useHistory } from 'react-router'
import { useAuth } from './use-auth'

function Login() {
    const auth = useAuth()
    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault()
        await auth.signin(email, pw, () => { history.push('/') })
        if (success) {
            setEmail('')
            setPw('')
        }
        setLoading(false)
    }

    return (
        <section className="section container columns">
            <div className="column is-half">
                <h1 className="title">Log in</h1>
                <form
                    onSubmit={(e) => { handleLogin(e) }}>
                    <div className="field">
                        <label className="label" htmlFor="email">Email address</label>
                        <div className="control">
                            <input
                                disabled={loading ? 'disabled' : ''}
                                className="input"
                                type="email"
                                name="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="password">Password</label>
                        <div className="control">
                            <input
                                disabled={loading ? 'disabled' : ''}
                                className="input"
                                type="password"
                                name="password"
                                id="password"
                                onChange={(e) => setPw(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <button disabled={loading ? 'disabled' : ''} className="button is-primary" type="submit">Log in</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login