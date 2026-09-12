import React from 'react';
import Input from './Form/Input';
import Checkbox from './Form/Checkbox';
import Submit from './Form/Submit'
import Outils from './Form/Outils';
import google from '../../imgs/google.png';
import ios from '../../imgs/ios.png';


const Sign = () => {
    return (
        <>
            <div className='login mt-5 mb-5 col-5 m-auto '>
                <div className="container">
                    <h1 className="fs-1 text-capitalize">get started now</h1>

                    <form className='mt-5'>
                        {/* input field */}
                        <Input label="Name" type="text" ph="Enter your name" />
                        <Input label="email address" type="email" ph="Enter your email" />
                        <Input label="Password" type="password" ph="Enter your password" />
                        {/* checkbox */}
                        <Checkbox text="I agree to the terms & policy" />
                        {/* //submit */}
                        <Submit text="sign up" />
                        {/* or */}
                        <span className="or fw-bold d-flex justify-content-center text-capitalize mt-4 mb-5">
                            or
                        </span>
                        {/* sign with gmail or ios */}
                        <div className="outils d-flex justify-content-center ">
                            <Outils icon={google} text='Sign in with google' alt='google' />
                            <Outils icon={ios} text='Sign in with Apple' alt='IOS' />
                        </div>
                        {/* dont have an acc */}
                        <span className="last text-center fw-bold d-flex justify-content-center mt-4">
                            Have an account?
                            <a className='text-capitalize list-unstayled ms-2' href="##">sign up</a>
                        </span>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Sign
