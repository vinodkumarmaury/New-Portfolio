"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone, Download, Check, Loader2, Send, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", 
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mapHovered, setMapHovered] = useState(false);
  const formRef = useRef(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Initialize EmailJS with your public key
      emailjs.init("_J1DfMNPNZBP1dfjv");
      
      // Send the email using EmailJS
      await emailjs.sendForm(
        'service_c6prt5b',
        'template_ws2r0ji',
        formRef.current!,
        '_J1DfMNPNZBP1dfjv'
      );
      
      // Play success animation
      setIsSuccess(true);
      toast.success("Your message has been sent! I'll get back to you soon.");
      
      // Reset form after success animation
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setIsSuccess(false);
      }, 2500);
      
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Something went wrong. Please try again or contact me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResumeDownload = () => {
    window.open("https://drive.google.com/file/d/1ktC8iFLBrkRw3tH3J12rPjM5XR6-uGth/view?usp=sharing", "_blank");
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5 
      }
    }
  };
  
  // Floating animation for elements
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  return (
    <section id="contact" className="contact-section py-24 bg-gradient-to-b from-secondary/30 to-secondary/90 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="contact-bg-pattern absolute inset-0 opacity-10"></div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-20 left-[5%] w-24 h-24 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 15, 0],
          y: [0, -15, 0],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute top-60 right-[10%] w-32 h-32 rounded-full bg-primary/20 blur-3xl"
        animate={{
          x: [0, -15, 0],
          y: [0, 25, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              Get in Touch
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              ></motion.span>
            </h2>
          </motion.div>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Have a project in mind or want to explore opportunities? I'd love to hear from you.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            {/* Decorative elements */}
            <div className="absolute -top-8 -left-8 w-20 h-20">
              <motion.div 
                className="w-full h-full rounded-full border border-primary/30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </div>
            
            <Card className="contact-form-card p-6 overflow-hidden shadow-xl border border-primary/10 hover:shadow-primary/10 transition-all duration-500">
              <div className="mb-6 flex items-center gap-3 pb-4 border-b border-primary/10">
                <div className="p-2 rounded-full bg-primary/10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Send a Message</h3>
              </div>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-5"
                >
                  <motion.div variants={itemVariants} className="form-group">
                    <label className="block text-sm font-medium mb-2 transition-all duration-300">
                      <span className={`inline-block ${focusedField === 'name' ? 'text-primary' : ''}`}>Name</span>
                    </label>
                    <div className={`form-input-container relative transition-all duration-300 ${focusedField === 'name' ? 'input-focused' : ''}`}>
                      <Input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="border-primary/20 focus:border-primary rounded-lg transition-all duration-300"
                        placeholder="Your full name"
                      />
                      {focusedField === 'name' && (
                        <motion.div 
                          className="absolute inset-0 border-2 border-primary/40 rounded-lg pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        ></motion.div>
                      )}
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="form-group">
                    <label className="block text-sm font-medium mb-2 transition-all duration-300">
                      <span className={`inline-block ${focusedField === 'email' ? 'text-primary' : ''}`}>Email</span>
                    </label>
                    <div className={`form-input-container relative transition-all duration-300 ${focusedField === 'email' ? 'input-focused' : ''}`}>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="border-primary/20 focus:border-primary rounded-lg transition-all duration-300"
                        placeholder="your@email.com"
                      />
                      {focusedField === 'email' && (
                        <motion.div 
                          className="absolute inset-0 border-2 border-primary/40 rounded-lg pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        ></motion.div>
                      )}
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="form-group">
                    <label className="block text-sm font-medium mb-2 transition-all duration-300">
                      <span className={`inline-block ${focusedField === 'message' ? 'text-primary' : ''}`}>Message</span>
                    </label>
                    <div className={`form-input-container relative transition-all duration-300 ${focusedField === 'message' ? 'input-focused' : ''}`}>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className="min-h-[150px] border-primary/20 focus:border-primary rounded-lg transition-all duration-300"
                        placeholder="What would you like to discuss?"
                        required
                      />
                      {focusedField === 'message' && (
                        <motion.div 
                          className="absolute inset-0 border-2 border-primary/40 rounded-lg pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        ></motion.div>
                      )}
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="pt-3">
                    <Button 
                      type="submit" 
                      className="contact-submit-btn w-full h-12 text-base font-medium relative overflow-hidden group"
                      disabled={isSubmitting || isSuccess}
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="submitting"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center"
                          >
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </motion.div>
                        ) : isSuccess ? (
                          <motion.div
                            key="success"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ 
                              scale: 1, 
                              opacity: 1,
                              transition: { type: "spring", stiffness: 300, damping: 10 }
                            }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="flex items-center justify-center"
                          >
                            <Check className="mr-2 h-5 w-5" />
                            Sent Successfully!
                          </motion.div>
                        ) : (
                          <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center"
                          >
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <motion.span 
                        className="absolute bottom-0 left-0 h-1 bg-white/20"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      ></motion.span>
                    </Button>
                  </motion.div>
                </motion.div>
                
                {/* Hidden field for the recipient email */}
                <input type="hidden" name="to_email" value="vinodmaurya0410@gmail.com" />
              </form>
              
              {/* Decorative element */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24">
                <motion.div 
                  className="w-full h-full rounded-full border border-primary/30"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Card className="contact-info-card p-8 shadow-xl border border-primary/10 hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col">
              <motion.div 
                className="space-y-7 flex-grow"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Professional section header */}
                <motion.div className="mb-6 pb-4 border-b border-primary/10" variants={itemVariants}>
                  <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Feel free to reach out through any of these channels
                  </p>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants} 
                  className="contact-info-item"
                  whileHover={{ x: 5, transition: { type: "spring", stiffness: 300, damping: 15 } }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="bg-primary/10 p-3 rounded-full"
                      whileHover={floatingAnimation}
                    >
                      <MapPin className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div>
                      <h4 className="font-medium mb-1">Location</h4>
                      <span className="text-muted-foreground">Bahraich, Uttar Pradesh, India-271902</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants} 
                  className="contact-info-item"
                  whileHover={{ x: 5, transition: { type: "spring", stiffness: 300, damping: 15 } }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="bg-primary/10 p-3 rounded-full"
                      whileHover={floatingAnimation}
                    >
                      <Mail className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <a 
                        href="mailto:vinodmaurya0410@gmail.com" 
                        className="text-primary hover:underline hover:text-primary/80 transition-all duration-300 flex items-center gap-1 group"
                      >
                        vinodmaurya0410@gmail.com
                        <motion.span
                          className="inline-block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        >
                          <ArrowRight size={14} />
                        </motion.span>
                      </a>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants} 
                  className="contact-info-item"
                  whileHover={{ x: 5, transition: { type: "spring", stiffness: 300, damping: 15 } }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="bg-primary/10 p-3 rounded-full"
                      whileHover={floatingAnimation}
                    >
                      <Phone className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <a 
                        href="tel:+919305627067" 
                        className="text-primary hover:underline hover:text-primary/80 transition-all duration-300 flex items-center gap-1 group"
                      >
                        +91 9305627067
                        <motion.span
                          className="inline-block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        >
                          <ArrowRight size={14} />
                        </motion.span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={itemVariants} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-8"
              >
                <Button 
                  onClick={handleResumeDownload} 
                  className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/20 transition-all duration-300 font-medium"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-8 rounded-lg overflow-hidden border border-primary/20 shadow-lg"
                onHoverStart={() => setMapHovered(true)}
                onHoverEnd={() => setMapHovered(false)}
              >
                <div className="map-container relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent z-10 pointer-events-none"
                    animate={{ opacity: mapHovered ? 0 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div
                    animate={{ scale: mapHovered ? 1.03 : 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-0"
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56951.378010274576!2d81.56824!3d27.5742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a7c057b4632bf%3A0x784d5db3c73b7d0!2sBahraich%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="transition-opacity duration-300"
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center z-20 bg-black/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: mapHovered ? 0 : 0.7 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="text-white text-center px-4 py-2 rounded-lg"
                      animate={mapHovered ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="font-medium">Hover to explore</p>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}