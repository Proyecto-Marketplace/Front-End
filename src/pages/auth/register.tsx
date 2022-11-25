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
    <div className='register'>
    <form className='register-form'>
      <h1 className='register-form-title'>Register</h1>

      <label className='register-form-label'>
        <span className='register-form-label-title'>Full Name</span> 
        <input type='text' />          
      </label>

      <label className='register-form-label'>
        <span className='register-form-label-title'>Email</span>
        <input type='email' />          
      </label>

      <label className='register-form-label'>
        <span className='register-form-label-title'>Password</span>
        <input type='password' />
      </label>

      <label className='register-form-label'>
        <span className='register-form-label-title'>Confirm Password</span> 
        <input type='password' />
      </label>

      <button className='register-submit btn-submit' type='submit'>Sign up</button>

      <p>
        Have an account ?
        <Link href='/auth/login'><span className='link-to-login'>Click here</span></Link>
      </p>

    </form>
  </div>
  )
}

export default Register;