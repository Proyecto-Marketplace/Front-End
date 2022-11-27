import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { loginSchema, LoginSchema as FormValues } from '../../common/auth';

const Login = () => {

  const { register, formState: { errors }, handleSubmit } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    shouldFocusError: true
  });

  const handleLogin: SubmitHandler<FormValues> = (data) => {
    console.log({ data });
  }

  return (
    <div className='login'>
      <form className='login-form' onSubmit={handleSubmit(handleLogin)}>
        <h1 className='login-form-title'>Login</h1>

        <label className='login-form-label'>
          <span className='login-form-label-title'>Email</span>
          <input type='email' {...register('email')} />
        </label>

        <label className='login-form-label'>
          <span className='login-form-label-title'>Password</span>
          <input type='password' {...register('password')} />
        </label>

        <button className='login-submit btn-submit' type='submit'>Sign in</button>

        <p>
          Do not have an account yet ?
          <Link href='/auth/register'><span className='link-to-register'> Click here</span></Link>
        </p>

      </form>
    </div>
  )
}

export default Login