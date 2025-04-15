import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Contact = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Message sent successfully!", data);

        setFormStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setTimeout(() => setFormStatus("idle"), 3000);
      } else {
        throw new Error(data.message || "Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const socialLinks = [
    {
      title: "Email",
      icon: "ri-mail-line",
      value: "d.abhishek1999@gmail.com",
      link: "mailto:d.abhishek1999@gmail.com",
    },
    {
      title: "LinkedIn",
      icon: "ri-linkedin-box-line",
      value: "linkedin.com/in/abhishek-das99",
      link: "https://www.linkedin.com/in/abhishek-das99/",
    },
    {
      title: "GitHub",
      icon: "ri-github-line",
      value: "github.com/dasabhishk",
      link: "https://github.com/dasabhishk",
    },
    {
      title: "Location",
      icon: "ri-map-pin-line",
      value: "Karnataka, India",
      link: null,
    },
  ];

  return (
    <section id="contact" className="py-20 relative digital-grid" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-mono font-bold inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
              },
            }}
          >
            <span className="text-primary">/</span> Contact{" "}
            <span className="text-primary">/</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mt-4"
            initial={{ opacity: 0, width: 0 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                width: 80,
                transition: { duration: 0.5, delay: 0.3 },
              },
            }}
          ></motion.div>
          <motion.p
            className="text-muted-foreground mt-4 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                transition: { duration: 0.5, delay: 0.4 },
              },
            }}
          >
            Interested in working together? Let's connect! Feel free to reach
            out through any of the channels below.
          </motion.p>
        </div>

        <motion.div
          className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div className="w-full lg:w-1/2" variants={itemVariants}>
            <div className="bg-card p-6 rounded-lg shadow-lg glow-border h-full">
              <h3 className="text-xl font-mono font-bold mb-6 text-secondary">
                <i className="ri-mail-send-line mr-2"></i> Send a Message
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-foreground mb-2 font-mono text-sm"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background rounded-md border border-muted focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-foreground mb-2 font-mono text-sm"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background rounded-md border border-muted focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="subject"
                    className="block text-foreground mb-2 font-mono text-sm"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background rounded-md border border-muted focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-foreground mb-2 font-mono text-sm"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background rounded-md border border-muted focus:outline-none focus:border-primary"
                    required
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium flex items-center justify-center glow-border"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={formStatus === "submitting"}
                >
                  {formStatus === "idle" && (
                    <>
                      Send Message
                      <i className="ri-send-plane-fill ml-2"></i>
                    </>
                  )}
                  {formStatus === "submitting" && "Sending..."}
                  {formStatus === "success" && "Message Sent!"}
                  {formStatus === "error" && "Error, please try again"}
                </motion.button>
              </form>
            </div>
          </motion.div>

          <motion.div className="w-full lg:w-1/2" variants={itemVariants}>
            <div className="bg-card p-6 rounded-lg shadow-lg glow-border h-full">
              <h3 className="text-xl font-mono font-bold mb-6 text-secondary">
                <i className="ri-contacts-line mr-2"></i> Connect with Me
              </h3>

              <div className="space-y-6">
                {socialLinks.map((social, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-background p-3 rounded-full mr-4">
                      <i className={`${social.icon} text-primary text-xl`}></i>
                    </div>
                    <div>
                      <h4 className="font-mono font-bold text-foreground">
                        {social.title}
                      </h4>
                      {social.link ? (
                        <a
                          href={social.link}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {social.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{social.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="font-mono font-bold text-foreground mb-4">
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="https://x.com/Rahul_D4S"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-background rounded-full text-foreground hover:text-primary transition-colors"
                  >
                    <i className="ri-twitter-x-fill text-xl"></i>
                  </a>
                  <a
                    href="https://www.youtube.com/@190HITMAN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-background rounded-full text-foreground hover:text-primary transition-colors"
                  >
                    <i className="ri-youtube-fill text-xl"></i>
                  </a>
                  <a
                    href="https://github.com/dasabhishk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-background rounded-full text-foreground hover:text-primary transition-colors"
                  >
                    <i className="ri-github-fill text-xl"></i>
                  </a>
                  <a
                    href="https://discord.gg/TkawATfJgx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-background rounded-full text-foreground hover:text-primary transition-colors"
                  >
                    <i className="ri-discord-fill text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
