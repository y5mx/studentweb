"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { FiCheckCircle, FiClock, FiCalendar, FiBarChart2, FiArrowRight } from "react-icons/fi";

export default function Home() {
  const features = [
    {
      icon: <FiCheckCircle className="h-6 w-6 text-primary" />,
      title: "Task Management",
      description: "Easily create, organize, and complete tasks with our intuitive interface."
    },
    {
      icon: <FiClock className="h-6 w-6 text-primary" />,
      title: "Time Tracking",
      description: "Estimate and track the time spent on each task to improve productivity."
    },
    {
      icon: <FiCalendar className="h-6 w-6 text-primary" />,
      title: "Advanced Scheduling",
      description: "Set due dates, recurrence patterns, and reminders for your tasks."
    },
    {
      icon: <FiBarChart2 className="h-6 w-6 text-primary" />,
      title: "Progress Analytics",
      description: "Visualize your productivity and task completion rates with detailed insights."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-slate-50">
      {/* Hero section */}
      <header className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex justify-between items-center">
          <div className="font-bold text-2xl text-primary">TaskManager</div>
          <div>
            <Button
              variant="ghost"
              className="mr-4 hidden md:inline-flex"
              asChild
            >
              <Link href="#features">Features</Link>
            </Button>
            <Button 
              className="bg-primary/90 hover:bg-primary"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              Organize your student life
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8">
              A simple, powerful task manager designed for students to boost productivity and stay organized.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 gap-2"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                  <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                  <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                  <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                  <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
                </svg>
                Sign in with Google
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2"
                asChild
              >
                <Link href="#features">
                  Learn more
                  <FiArrowRight />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Task board animation */}
        <div className="md:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ perspective: 1000 }}
            className="relative z-10"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-200">
              <div className="bg-white p-4 pb-8">
                <div className="flex items-center mb-6">
                  <div className="h-3 w-3 rounded-full bg-red-400 mr-2"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400 mr-2"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  <div className="ml-4 text-sm font-medium text-slate-500">Task Dashboard</div>
                </div>
                
                {/* Task items */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="bg-slate-50 rounded-lg p-3 mb-3 shadow-sm flex items-start"
                  >
                    <div className={`h-5 w-5 rounded-full border-2 mr-3 mt-0.5 flex-shrink-0 ${
                      i === 1 ? 'bg-primary border-primary' : 'border-slate-300'
                    }`}></div>
                    <div className="flex-1">
                      <div className="h-4 bg-slate-200 rounded w-4/5 mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-3/5"></div>
                    </div>
                    <div className="ml-2 flex">
                      <div className="h-5 w-12 bg-slate-200 rounded-full"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Background decorative elements */}
          <div className="absolute -top-10 -right-10 h-64 w-64 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 h-64 w-64 bg-gradient-to-tr from-yellow-400/20 to-green-400/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Features designed for <span className="text-primary">students</span>
            </motion.h2>
            <motion.p 
              className="text-slate-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Everything you need to stay on top of your academic responsibilities and boost your productivity.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="mb-4 bg-primary/10 inline-flex items-center justify-center w-12 h-12 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-gradient-to-r from-primary/10 to-blue-600/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to boost your productivity?
          </motion.h2>
          <motion.p 
            className="text-slate-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of students who use TaskManager to organize their academic lives.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 gap-2"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
              </svg>
              Get Started with Google
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="font-bold text-xl text-white mb-2">TaskManager</div>
              <p className="text-sm">Helping students stay organized since 2025</p>
            </div>
            <div className="flex gap-8">
              <div>
                <h4 className="text-white font-medium mb-4">Links</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li><a href="mailto:support@taskmanager.com" className="hover:text-white transition-colors">support@ncst.edu.bh</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} TaskManager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
