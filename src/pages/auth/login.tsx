import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { signIn, getProviders } from 'next-auth/react';
import { LoginSchema as FormValues, loginSchema } from '../../common/auth';
type CookieResponse = [string, string];
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';

const Login = () => {

  const router = useRouter();
  const [ providers, setProviders ] = useState<any>({});
  useEffect(() => {
    getProviders().then(setProviders);
  }, []);
  const user: CookieResponse = JSON.parse(Cookies.get('data-form') || '[]');
  const { register, handleSubmit, setError, formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting }, getValues } = useForm<FormValues>({
    defaultValues: { email: user[0] || '', password: user[1] || '' },
    mode: 'all',
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    router.prefetch(`${router.query.p}`)
  }, [ router ]);
  // const handleLogin: SubmitHandler<FormValues> = (data) => mutation.mutate(data);
  const handleLogin: SubmitHandler<FormValues> = async (data) => {
    const res = await signIn('credentials', { ...data, redirect: false });
    if(res?.error) return setError('password', { type: 'wrong', message: res.error }, { shouldFocus: true });
    if(res?.url?.includes('/auth/login')) return await router.push('/');
    await router.push(res?.url ?? '/');
  }

  return (
    <div className='login'>
      <span style={{ display: errors.email?.type === 'wrongE' || errors.password?.type === 'wrong' ? 'flex' : 'none' }}>
        {errors.password?.message}
      </span>
      <form className='login-form' onSubmit={handleSubmit(handleLogin)}>
        <h1 className='login-form-title'>Login</h1>

        <label className='login-form-label'>
          <span className='login-form-label-title'>Email</span>
          <input type='email' {...register('email')} />
          <span>{errors.email?.type !== 'wrongE' && errors.email?.message}</span>
        </label>

        <label className='login-form-label'>
          <span className='login-form-label-title'>Password</span>
          <input type='password' {...register('password')} />
          <span>{errors.password?.type !== 'wrong' && errors.password?.message}</span>
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

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  if(session) return { redirect: { destination: ctx.req.headers.referer ?? '/', permanent: false } };

  return { props: {} }
}

export default Login