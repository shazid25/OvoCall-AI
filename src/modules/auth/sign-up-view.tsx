// "use client";

// import { z } from "zod";
// import Link from "next/link";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { OctagonAlertIcon } from "lucide-react";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { authClient } from "@/lib/auth-client";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Alert, AlertTitle } from "@/components/ui/alert";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";

// const fromSchema = z.object({
//     name: z.string().min(1, { message: "Name is required" }),
//     email: z.string().email(),
//     password: z.string().min(8, { message: "Password must be at least 8 characters" }),
//     confirmPassword: z.string().min(1, { message: "Password confirmation is required" })
// }).refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
// });

// export const SignUpView = () => {
//     const router = useRouter();
//     const [pending, setPending] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const from = useForm<z.infer<typeof fromSchema>>({
//         resolver: zodResolver(fromSchema),
//         defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
//     });

//     const onSubmit = async (data: z.infer<typeof fromSchema>) => {
//         setError(null);
//         setPending(true);
//         await authClient.signUp.email(
//             { name: data.name, email: data.email, password: data.password },
//             {
//                 onSuccess: () => {
//                     setPending(false);
//                     router.push("/");
//                 },
//                 onError: ({ error }) => {
//                     setPending(false);
//                     setError(error.message);
//                 },
//             }
//         );
//     };

//     return (
//         <div className="flex flex-col gap-6">
//             <Card className="overflow-hidden p-0">
//                 <CardContent className="grid p-0 md:grid-cols-2">
//                     <Form {...from}>
//                         <form onSubmit={from.handleSubmit(onSubmit)} className="p-6 md:p-8 flex flex-col gap-6">
//                             <div className="flex flex-col items-center text-center">
//                                 <h1 className="text-2xl font-bold">Let&apos;s get started</h1>
//                                 <p className="text-muted-foreground text-balance">Create your account</p>
//                             </div>

//                             <div className="grid gap-4">
//                                 <FormField
//                                     control={from.control}
//                                     name="name"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Name</FormLabel>
//                                             <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <FormField
//                                     control={from.control}
//                                     name="email"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Email</FormLabel>
//                                             <FormControl><Input type="email" placeholder="m@example.com" {...field} /></FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <FormField
//                                     control={from.control}
//                                     name="password"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Password</FormLabel>
//                                             <FormControl><Input type="password" placeholder="******" {...field} /></FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <FormField
//                                     control={from.control}
//                                     name="confirmPassword"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Confirm Password</FormLabel>
//                                             <FormControl><Input type="password" placeholder="******" {...field} /></FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 {error && (
//                                     <Alert className="bg-destructive/10 border-none">
//                                         <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
//                                         <AlertTitle className="text-destructive text-xs">{error}</AlertTitle>
//                                     </Alert>
//                                 )}

//                                 <Button disabled={pending} type="submit" className="w-full">Create Account</Button>

//                                 <div className="text-center text-sm">
//                                     Already have an account?{" "}
//                                     <Link href="/sign-in" className="underline underline-offset-4">Sign in</Link>
//                                 </div>
//                             </div>
//                         </form>
//                     </Form>
//                     <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
//                         <img src="/logo.svg" alt="Logo" className="h-[92px] w-[92px]" />
//                         <p className="text-2xl font-semibold text-white">OvoCall AI</p>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };





"use client";

import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { OctagonAlertIcon, MessageSquare, Brain, Zap, Phone } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";

import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(1, { message: "Please confirm your password" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const SignUpView = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);
    
    await authClient.signUp.email(
      { name: data.name, email: data.email, password: data.password },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
          router.refresh();
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message || "Failed to create account. Please try again.");
        },
      }
    );
  };

  const handleSocialSignUp = async (provider: "google" | "github") => {
    setError(null);
    setPending(true);
    
    try {
      await authClient.signUp.social({ provider });
    } catch (err) {
      setPending(false);
      setError(`Failed to sign up with ${provider}. Please try again.`);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Futuristic AI Background */}
      <div className="absolute inset-0 z-0">
        {/* Main Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900" />
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`grid-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
              style={{
                top: `${(i * 5)}%`,
                width: "100%",
                animation: `gridScan ${15 + i}s linear infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Floating AI Chatbots */}
        {Array.from({ length: 8 }).map((_, i) => {
          const size = 60 + Math.random() * 40;
          const delay = Math.random() * 10;
          const duration = 20 + Math.random() * 20;
          
          return (
            <div
              key={`ai-${i}`}
              className="absolute flex items-center justify-center"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatChatbot ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse" />
                <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-2xl shadow-lg shadow-cyan-500/30">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                {/* Chat bubble tail */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-cyan-500" />
              </div>
            </div>
          );
        })}

        {/* Floating Animated Text Messages */}
        {[
          "AI-Powered Solutions 24/7",
          "Smart Calling Assistant",
          "Professional Problem Solver",
          "Instant Life Solutions",
          "Your AI Companion",
          "Future of Communication",
          "Always Here to Help",
          "Making Life Easier"
        ].map((text, i) => (
          <div
            key={`message-${i}`}
            className="absolute"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animation: `floatMessage ${25 + i * 3}s linear infinite`,
              animationDelay: `${i * 2}s`,
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <p className="text-white text-sm font-medium whitespace-nowrap">{text}</p>
              </div>
              <div className="absolute -bottom-1 left-4 border-4 border-transparent border-t-white/20" />
            </div>
          </div>
        ))}

        {/* Animated Connection Lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`line-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${100 + Math.random() * 300}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `pulseLine ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Icons */}
        {Array.from({ length: 6 }).map((_, i) => {
          const Icon = [Brain, Zap, Phone][i % 3];
          const colors = ["text-cyan-400", "text-purple-400", "text-blue-400"];
          
          return (
            <div
              key={`icon-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatIcon ${15 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 1.5}s`,
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-current opacity-20 blur-md" />
                <Icon className={`relative h-8 w-8 ${colors[i % 3]}`} />
              </div>
            </div>
          );
        })}

        {/* Animated Data Points */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `rgba(${Math.random() > 0.5 ? '96' : '165'}, ${Math.random() > 0.5 ? '255' : '187'}, 255, ${0.2 + Math.random() * 0.3})`,
              animation: `pulseDot ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Animated Orb */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96">
          <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64">
          <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-lg animate-pulse" />
                <div className="relative bg-gradient-to-r from-cyan-600 to-blue-700 h-16 w-16 rounded-2xl flex items-center justify-center shadow-xl">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <h1 className="mb-2 text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Join OvoCall AI
            </h1>
            <p className="text-white/80 text-sm">
              Create your account and start solving problems with AI
            </p>
          </div>

          <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
            <CardContent className="p-6">
              {error && (
                <Alert variant="destructive" className="mb-6 bg-red-500/10 border-red-500/20">
                  <OctagonAlertIcon className="h-4 w-4" />
                  <AlertTitle className="text-white">{error}</AlertTitle>
                </Alert>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/90">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400"
                            disabled={pending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/90">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400"
                            disabled={pending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/90">Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="At least 8 characters"
                            className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400"
                            disabled={pending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/90">Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm your password"
                            className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400"
                            disabled={pending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="h-11 w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                    disabled={pending}
                  >
                    {pending ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Creating Account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>
              </Form>

              <div className="relative my-6">
                <Separator className="bg-white/20" />
                <div className="bg-transparent absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 text-sm text-white/70">
                  Or sign up with
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="h-11 w-full bg-white/5 border-white/20 hover:bg-white/10 text-white"
                  onClick={() => handleSocialSignUp("google")}
                  disabled={pending}
                >
                  <FcGoogle className="mr-3 h-5 w-5" />
                  Continue with Google
                </Button>

                <Button
                  variant="outline"
                  className="h-11 w-full bg-white/5 border-white/20 hover:bg-white/10 text-white"
                  onClick={() => handleSocialSignUp("github")}
                  disabled={pending}
                >
                  <FaGithub className="mr-3 h-5 w-5" />
                  Continue with GitHub
                </Button>
              </div>

              <div className="mt-6 text-center text-sm">
                <span className="text-white/70">
                  Already have an account?{" "}
                </span>
                <Link
                  href="/sign-in"
                  className="font-semibold text-cyan-300 hover:text-cyan-200 hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="text-white/60 mt-6 text-center text-xs">
            <p>
              By signing up, you agree to our{" "}
              <Link
                href="/terms"
                className="hover:text-cyan-300 underline underline-offset-4 transition-colors"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="hover:text-cyan-300 underline underline-offset-4 transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes floatChatbot {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -20px) rotate(5deg);
          }
          50% {
            transform: translate(-15px, 15px) rotate(-5deg);
          }
          75% {
            transform: translate(-20px, -10px) rotate(3deg);
          }
        }

        @keyframes floatMessage {
          0% {
            transform: translateX(-100vw) translateY(0) scale(0.8);
            opacity: 0;
          }
          5% {
            opacity: 1;
            transform: translateX(-5vw) translateY(0) scale(1);
          }
          10% {
            transform: translateX(0) translateY(-10px) scale(1);
          }
          90% {
            transform: translateX(calc(100vw - 200px)) translateY(10px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(100vw) translateY(0) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes floatIcon {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(10px) rotate(240deg);
          }
        }

        @keyframes pulseLine {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes pulseDot {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.6;
          }
        }

        @keyframes gridScan {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  );
};