import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TimelineItem from "./TimelineItem";

const Experience = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const experienceItems = [
    {
      title: "Software Engineer II",
      company: "Philips",
      period: "Nov 2023 – Present",
      description:
        "Working in the Cardiovascular Imaging team, focusing on product-related serviceability tools and backend development.",
      bullets: [
        "Owned application design, feature definition, and created tools from scratch",
        "Led backend service development for core product features",
        "Integrated Prometheus-Grafana Alloy workflow for metrics collection",
        "Packaged and deployed the application to client systems",
        "Mentored junior developers, conducted code reviews, and hosted knowledge sharing sessions",
      ],
      tags: [
        "C#",
        ".NET Core",
        "AWS",
        "PL/SQL",
        "Docker",
        "Containerization",
        "Prometheus",
        "Grafana",
        "GitHub Actions",
        "CI/CD",
        "PowerShell",
        "WiX",
        "Unit Testing",
        "Agile",
      ],
    },
    {
      title: "Software Engineer",
      company: "Philips",
      period: "Aug 2022 – Nov 2023",
      description:
        "Worked in the Electronic Medical Records team, primarily focusing on backend Java development and PL/SQL-driven report generation.",
      bullets: [
        "Designed and developed Java Interfaces and REST APIs",
        "Improved SQL query performance by 40% through tuning and indexing",
        "Designed and generated clinical workflow reports",
        "Maintained internal automation tools and schema search utilities",
      ],
      tags: [
        "Java",
        "Spring Boot",
        "Spring",
        "AWS",
        "PL/SQL",
        "REST",
        "API Design",
        "Postman",
        "Agile",
        "MVC",
      ],
    },
    {
      title: "Intern",
      company: "Philips",
      period: "Mar 2022 – Aug 2022",
      description:
        "Interned with the EMR & CM team, contributing to service order dashboards and automation tools.",
      bullets: [
        "Built Power BI dashboards to track service orders and operational metrics",
        "Wrote validation scripts for algorithm optimization in healthcare workflows",
        "Delivered knowledge sessions on Gen AI and AWS basics for the team",
        "Participated in Agile ceremonies and contributed to backlog grooming",
      ],
      tags: [
        "Python",
        "Power BI",
        "Analytics",
        "Visualization",
        "Agile",
        "PL/SQL",
        "Reporting Automation",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 relative" ref={ref}>
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
            <span className="text-primary">/</span> Experience{" "}
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
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className="relative border-l-2 border-primary ml-6 pl-8 pb-8 timeline-container"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {experienceItems.map((item, index) => (
              <TimelineItem
                key={index}
                title={item.title}
                company={item.company}
                period={item.period}
                description={item.description}
                bullets={item.bullets}
                tags={item.tags}
                isLast={index === experienceItems.length - 1}
                delay={index * 0.2}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
