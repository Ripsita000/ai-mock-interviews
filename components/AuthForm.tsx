"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Form } from "@/components/ui/form"

// import { Input } from "@/components/ui/input"
import Image from "next/image"
import { toast } from "sonner";
import FormField from "./FormField"
import { useRouter } from "next/navigation"
// import { Textarea } from "@/components/ui/textarea"



const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      if(type === 'sign-up') {
        toast.success('Account created succesfully');
        router.push('/sign-in')
      }else{
        toast.success('Sign in successfully');
        router.push('/')
      }

    }catch(error) {
      console.log(error);
      toast.error(`There was an error: ${error}`)
      
    }
  }
  
  const isSignIn = type === 'sign-in';


  return (
    <Card className="h-130 w-90 sm:max-w-md">
      <CardHeader className=" text-center ">
        <CardTitle className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={30} width={30} />

          <h2 className="text-primary-100">PrepWise</h2>
        </CardTitle>
        <CardDescription>
          Practice Job Interviews With AI 
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <CardContent className="space-y-4 w-full mt-4 form ">
            {! isSignIn && (
              <FormField 
              control={form.control} 
              name="name" 
              label="Name" 
              placeholder="Your Name" />
            )}
            <FormField 
              control={form.control} 
              name="email" 
              label="Email" 
              placeholder="email address"
              type="email"
            />

            <FormField 
              control={form.control} 
              name="password" 
              label="Password" 
              placeholder="enter you password" 
              type="password"
            />

            <Button className="btn" 
            type="submit" > {isSignIn ? 'Sign in' : 'Create an account'}
            </Button>
            
          </CardContent>

          
              
            
          

        </form>
      </Form>
    

      <p className="text-center">
          {isSignIn ? 'No account Yet?' : 'Have an account already?'}
          <Link
              href={!isSignIn ? "/sign-in" : "/sign-up"}
              className="font-bold text-primary-100 ml-1"
          >
            {!isSignIn ? "Sign in" : "Sign up"}
          </Link>
      </p>
        
    </Card>
  )
}

export default AuthForm
