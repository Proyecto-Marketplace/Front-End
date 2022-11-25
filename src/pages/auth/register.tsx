import Link from 'next/link';

const Register = () => {
  return (
    <>
      <form>
        <h1>Register</h1>

        <label>
          Full Name
          <input type='text' />          
        </label>

        <label>
          Email
          <input type='email' />          
        </label>

        <label>
          Password
          <input type='password' />
        </label>

        <label>
          Confirm Password
          <input type='password' />
        </label>

        <button type='submit'>Sign up</button>

        <p>
          Have an account ?
          <Link href='/auth/register'>Click here</Link>
        </p>

      </form>
    </>
  )
}

export default Register;