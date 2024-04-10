import AuthForm from '../components/AuthForm';
import { redirect } from 'react-router-dom';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;
export const action= async ({request})=>{
  const searchParams=new URL(request.url).searchParams;
  const mode=searchParams.get('mode') || 'Login';
  if(mode!=='login'||mode!=='SignUp'){
    throw Error('Not found')
  }
  const data = await request.formData();
  const authData={
    email:data.get('email'),
    password:data.get('password')
  }
  const response=await fetch('http://localhost:8080/'+ mode,{
    method:'POST',
    headers:{'Content-Type':'applicatio/json'},
    body:JSON.stringify(authData),
  })
  if(response.status===422||response.status===401){
    return response;
  }
  if(!response.ok){
    throw Error('Not found')
  }
  const resData=response.json()
  const token=resData.token;
  localStorage.setItem('token',token);
   return redirect ('/');
}