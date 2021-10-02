import { useState } from 'react'
import { supabase } from './supabase'

function Signup() {
    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')


    const handleSignup = async (email, pw) => {
        console.log('handling signup for email and password')



        const { user, session, error } = await supabase.auth.signUp({ email: email, password: pw, })

        console.log('user', user)
        console.log('session', session)
        console.error('error', error)
    }


    return (
        <section className="section container columns">
            <div className="column is-half">
                <h1>Signup</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSignup(email, pw)
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