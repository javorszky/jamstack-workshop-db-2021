import { useState } from 'react'
import { useAuth } from './use-auth'

function Signup() {
    const auth = useAuth()
    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')

    return (
        <section className="section container columns">
            <div className="column is-half">
                <h1 className="title">Signup</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        auth.signup(email, pw)
                    }}>
                    <div className="field">
                        <label className="label" htmlFor="email">Email address</label>
                        <div className="control">
                            <input
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
                                className="input"
                                type="password"
                                name="password"
                                id="password"
                                onChange={(e) => setPw(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <button className="button is-primary" type="submit">Sign up</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Signup