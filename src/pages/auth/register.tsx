import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { registerSchema, RegisterSchema as FormValues } from '../../common/auth';
import Link from 'next/link';
import { trpc } from '../../utils/trpc';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Register = () => {  

  const router = useRouter();
  const { register, formState: { errors }, handleSubmit, getValues, reset, setError } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(registerSchema),
    shouldFocusError: true
  });

  const mutation = trpc.auth.register.useMutation({
    onSuccess: async () => {
      const values = getValues(['email', 'password'])
      Cookies.set('data-form', JSON.stringify(values), {
        path: '/', sameSite: 'strict', secure: process.env.NODE_ENV === 'production',
      });
      if(router.query.p) return await router.push(`/auth/login?p=${router.query.p}`);
      await router.push('/auth/login');
      reset();
    },
    onError: (err) => {
      setError('email', { message: err.message, type: 'used' }, { shouldFocus: true });
    }
  })

  const handleLogin: SubmitHandler<FormValues> = (data) => {
    console.log({ data });
    mutation.mutate(data);
  }

  return (
    <div className='register'>
      <form className='register-form' onSubmit={handleSubmit(handleLogin)}>
      <span style={{ display: errors.email?.type === 'used' ? 'flex' : 'none' }}>
        {errors.email?.type === 'used' && errors.email.message}
      </span>
        <h1 className='register-form-title'>Register</h1>

        <label className='register-form-label'>
          <span className='register-form-label-title'>Full Name</span>
          <input type='text' {...register('name')} />
          <span>
            {errors.email?.type !== 'used' && errors.email?.message}
          </span>
        </label>

        <label className='register-form-label'>
          <span className='register-form-label-title'>Email</span>
          <input type='email' {...register('email')} />
          <span>
            {errors.name?.message}
          </span>
        </label>

        <label className='register-form-label'>
          <span className='register-form-label-title'>Password</span>
          <input type='password' {...register('password')} />
          <span>
            {errors.password?.message}
          </span>
        </label>

        <label className='register-form-label'>
          <span className='register-form-label-title'>Confirm Password</span>
          <input type='password' {...register('confirm_password')} />
          <span>
            {errors.confirm_password?.message}
          </span>
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