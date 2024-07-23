"use client";
import { Button } from '@repo/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@repo/ui/dialog'
import { Input } from '@repo/ui/input';
import { useRouter } from 'next/navigation';
import {useState} from 'react'
import { signup } from '../action/signup';

function Navbar():JSX.Element{
  const [token,setToken] = useState<string>(localStorage.getItem('token') || '')
  const router = useRouter()
  const [detail,setDetail] = useState<{
    name: string,
    email: string,
    password: string
  }>({
    name: '',
    email: '',
    password: ''
  })
  const handleSignUp = async (): Promise<void> => {
    try {
      const localToken = await signup(detail.name,detail.email,detail.password)
      localStorage.setItem("token",localToken)
      router.push("/dashboard")
      }
      catch(e){
        // Removed the console.log statement
      }
  }
  return (
    <div className=' flex justify-between items-center px-10 py-8 bg-slate-600'>
      <div className=' text-xl text-slate-200 font-semibold'>
      Zapier
      </div>
      <div>
        {
          token?(
            <div className='flex items-center'>
              <div className='mr-4'>
                <a className='text-slate-200' href='/dashboard' >Dashboard</a>
              </div>
              <div>
                <Button 
                 onClick={()=>{
                    localStorage.removeItem('token')
                    setToken('')
                 }}
                >
                  Logout
                </Button>
              </div>
            </div>
          ):(
            <div>
              <Dialog>
                <DialogTrigger>
              <Button  size="sm" variant="secondary">SignUp</Button>
                </DialogTrigger>
                <DialogContent>
                  <div>
                    <div className='text-xl font-semibold'>SignUp</div>
                     <div className='p-3'>
                     <div className='mt-4 flex flex-col gap-2'>
                      <div>Name</div>
                      <Input onChange={(e)=>{
                        setDetail({
                          ...detail,
                          name: e.target.value
                        })
                      }} placeholder='Name' />
                    </div>
                    <div className='mt-4 flex flex-col gap-2'>
                      <div>
                        Email
                      </div>
                      <Input onChange={(e)=>{
                        setDetail({
                          ...detail,
                          email: e.target.value
                        })
                      } } placeholder='Email' />
                      </div>
                      <div className='mt-4 flex flex-col gap-2'>
                        <div>
                          Password
                        </div>
                      <Input onChange={(e)=>{
                        setDetail({
                          ...detail,
                          password: e.target.value
                        })
                      }} placeholder='Password' />
                      </div>
                      <div className='mt-4'>
                      <Button onClick={()=>void handleSignUp()}>SignUp</Button>
                      </div>
                     </div>
                    </div>               
                     </DialogContent>
              </Dialog>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Navbar
