import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  Heart,
  Lock,
  Upload,
  Users,
  Sparkles,
  Calendar,
  Shield,
  Zap,
  Check,
  Moon,
  ArrowUp,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

const LandingPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false); // <-- ADDED

  useEffect(() => {
    // Check system preference on mount
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", checkScroll);
    // Cleanup
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const features = [
    {
      icon: Upload,
      title: "Easy Upload",
      description:
        "Upload and organize your photos effortlessly with drag-and-drop support",
    },
    {
      icon: Users,
      title: "Built for Couples",
      description:
        "Share and manage your memories together in one beautiful space",
    },
    {
      icon: Lock,
      title: "Private & Secure",
      description:
        "Your photos are encrypted and stored securely with industry-standard protection",
    },
    {
      icon: Calendar,
      title: "Timeline View",
      description:
        "Relive your journey chronologically with beautiful timeline layouts",
    },
    {
      icon: Heart,
      title: "Favorite Moments",
      description: "Mark and quickly access your most cherished memories",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized performance for smooth browsing and instant photo loading",
    },
  ];

  const testimonials = [
    {
      name: "Sarah & Michael",
      role: "Together since 2019",
      content:
        "SnapStack has become our digital memory box. It's beautiful, simple, and keeps all our special moments in one place.",
      avatar: "SM",
    },
    {
      name: "Emma & James",
      role: "Together since 2020",
      content:
        "We love how easy it is to upload and organize our photos. The timeline feature is absolutely amazing!",
      avatar: "EJ",
    },
    {
      name: "Lisa & David",
      role: "Together since 2018",
      content:
        "Finally, a photo gallery that understands couples! The interface is gorgeous and so intuitive to use.",
      avatar: "LD",
    },
  ];

  const pricing = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Perfect for getting started",
      features: [
        "Up to 500 photos",
        "Basic organization",
        "Mobile access",
        "Email support",
        "Notifications",
        "Basic sharing options",
      ],
      cta: "Get Started",
      popular: false,
    },

    {
      name: "Premium",
      price: "$0",
      originalPrice: "$9",
      period: "/month",
      description: "Best for active couples",
      features: [
        "Unlimited photos",
        "Advanced organization",
        "HD quality storage",
        "Priority support",
        "Custom albums",
        "Download originals",
      ],
      cta: "Start Free Trial",
      popular: true,
      badgeText: "Limited Offer!",
    },
    {
      name: "Lifetime",
      price: "$299",
      period: "/one-time",
      description: "Forever access",
      features: [
        "Everything in Premium",
        "Lifetime access",
        "No recurring fees",
        "Future updates included",
        "Exclusive features",
        "VIP support",
      ],
      cta: "Buy Once",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen  transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-100/20 via-purple-100/20 to-pink-100/20 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-100/20 via-purple-100/20 to-pink-100/20 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 rounded-full blur-3xl"
          />
        </div>

        <div className=" relative z-10">
          {/* Navigation */}

          {/* <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 right-0 z-50 mt-10 px-4 sm:px-6 md:px-6"
          >
            <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6  backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl">
              <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
                <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  SnapStack
                </span>
              </Link>
              <div className="flex gap-2 sm:gap-4 items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  className="rounded-full"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  className="hidden sm:inline-flex"
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white text-sm sm:text-base"
                >
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.nav> */}

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mt-24 sm:mt-32 px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 dark:border-blue-400/20"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">
                Your Personal Photo Gallery Platform
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Capture Every Moment
              </span>
              <br />
              <span className="text-slate-900 dark:text-slate-100">
                Together
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              SnapStack is the beautiful photo gallery platform designed
              exclusively for couples. Store, organize, and celebrate your
              journey together in one secure place.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-full px-6 sm:px-8 w-full sm:w-auto"
                >
                  <Link to="/signup">
                    Start Your Journey Free
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-6 sm:px-8 w-full sm:w-auto"
                >
                  <a href="#features">Learn More</a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 dark:border-blue-400/20"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">
                Features
              </span>
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Everything You Need
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Powerful features designed to make managing and sharing your
              memories effortless
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl dark:hover:shadow-purple-500/10">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 ">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 dark:border-blue-400/20"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">
                Testimonials
              </span>
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Loved by Couples
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              See what couples are saying about their experience with SnapStack
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <CardTitle className="text-sm sm:text-base">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          {testimonial.role}
                        </CardDescription>
                      </div>
                    </div>
                    <CardContent className="p-0">
                      <p className="text-slate-600 dark:text-slate-300 italic text-sm sm:text-base">
                        "{testimonial.content}"
                      </p>
                    </CardContent>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}

      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* ... (Pricing header) ... */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge variant="secondary" className="mb-4">
              Pricing
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Start free and upgrade when you're ready. No hidden fees, cancel
              anytime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {pricing.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`h-full relative ${
                    plan.popular
                      ? "border-2 border-purple-500 shadow-xl dark:shadow-purple-500/20"
                      : "border border-slate-200 dark:border-slate-800"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-xs">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    {/* <-- MODIFIED: Added badge here --> */}
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl sm:text-2xl">
                        {plan.name}
                      </CardTitle>
                      {plan.badgeText && (
                        <Badge variant="destructive">{plan.badgeText}</Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm sm:text-base">
                      {plan.description}
                    </CardDescription>
                    {/* <-- MODIFIED: Price display --> */}
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-bold">
                        {plan.price}
                      </span>
                      {plan.originalPrice && (
                        <span className="text-xl sm:text-2xl font-bold text-slate-400 dark:text-slate-500 line-through">
                          {plan.originalPrice}
                        </span>
                      )}
                      <span className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                        {plan.period}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 sm:space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className={`w-full text-sm sm:text-base ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white"
                          : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      <Link to="/signup">{plan.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 dark:border-blue-400/20">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 dark:text-pink-400" />
            <span className="text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-400">
              Join Thousands of Couples
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Ready to Start Your Journey?
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-8 sm:mb-12 leading-relaxed">
            Create your free account today and start preserving your precious
            memories together.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-full px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
            >
              <Link to="/signup">
                Get Started for Free
                <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            No credit card required • Free forever plan available
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                SnapStack
              </span>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 justify-center">
              <Link
                to="/privacy"
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/contact"
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} SnapStack. Made with ❤️ for couples
            everywhere.
          </div>
        </div>
      </footer>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          y: showScrollTop ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="icon"
          onClick={scrollToTop}
          className="rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
