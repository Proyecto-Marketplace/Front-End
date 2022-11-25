import Link from 'next/link';

import { useForm, SubmitHandler } from 'react-hook-form';

const Login = () => {

  const { register, formState: { errors }, handleSubmit } = useForm();

  return (
    <>
      <form>
        <h1>Login</h1>

        <label>
          Email
          <input type='email' />          
        </label>

        <label>
          Password
          <input type='password' />
        </label>

        <button type='submit'>Sign in</button>

        <p>
          Do not have an account ?
          <Link href='/auth/register'>Click here</Link>
        </p>

      </form>
    </>
  )
}

export default Login