import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { registerSchema, RegisterSchema as FormValues } from '../../common/auth';
import Link from 'next/link';


const Register = () => {

  const { register, formState: { errors }, handleSubmit } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(registerSchema),
    shouldFocusError: true
  });

  const handleLogin: SubmitHandler<FormValues> = (data) => {
    console.log({ data });
  }

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