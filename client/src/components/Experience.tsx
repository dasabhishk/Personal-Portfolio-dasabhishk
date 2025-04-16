import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TimelineItem from "./TimelineItem";
import SkillBar from "./SkillBar";

const Experience = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  // Keep track of the currently selected experience item
  const [activeExperienceIndex, setActiveExperienceIndex] = useState(0);
  // Add a state for hover effect on the timeline
  const [timelineHovered, setTimelineHovered] = useState(false);

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
      skills: [
        { name: "C# / .NET", percentage: 95 },
        { name: "AWS", percentage: 88 },
        { name: "Docker", percentage: 90 },
        { name: "CI/CD", percentage: 85 },
        { name: "PL/SQL", percentage: 82 },
      ]
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
      skills: [
        { name: "Java / Spring", percentage: 92 },
        { name: "REST API Design", percentage: 88 },
        { name: "PL/SQL", percentage: 85 },
        { name: "AWS", percentage: 80 },
        { name: "Agile", percentage: 90 },
      ]
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
      skills: [
        { name: "Python", percentage: 85 },
        { name: "Power BI", percentage: 90 },
        { name: "Data Analytics", percentage: 82 },
        { name: "PL/SQL", percentage: 75 },
        { name: "Agile", percentage: 80 },
      ]
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Timeline Column */}
          <div className="lg:col-span-7">
            <motion.div
              className="relative border-l-2 border-primary ml-6 pl-8 pb-8 timeline-container"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              onMouseEnter={() => setTimelineHovered(true)}
              onMouseLeave={() => setTimelineHovered(false)}
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
                  isActive={activeExperienceIndex === index}
                  onClick={() => setActiveExperienceIndex(index)}
                />
              ))}
            </motion.div>
          </div>

          {/* Skills Column */}
          <div className="lg:col-span-5">
            <motion.div
              className="bg-card rounded-lg p-6 shadow-lg h-full"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              <h3 className="text-xl font-mono font-bold mb-6 text-secondary flex items-center">
                <i className="ri-tools-fill mr-2"></i> 
                Skills & Expertise
                {timelineHovered && (
                  <span className="ml-2 text-xs text-muted-foreground animate-pulse">
                    (Click on timeline items to see specific skills)
                  </span>
                )}
              </h3>

              <div className="space-y-5">
                {experienceItems[activeExperienceIndex].skills.map((skill, index) => (
                  <SkillBar
                    key={index}
                    name={skill.name}
                    percentage={skill.percentage}
                    delay={index * 0.1}
                  />
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <h4 className="font-mono text-secondary mb-2">Position</h4>
                <div className="flex items-center mb-4">
                  <span className="text-lg font-bold">{experienceItems[activeExperienceIndex].title}</span>
                  <span className="bg-primary/20 text-primary text-xs ml-3 px-2 py-1 rounded font-mono">
                    {experienceItems[activeExperienceIndex].period}
                  </span>
                </div>
                <p className="text-muted-foreground">
                  {experienceItems[activeExperienceIndex].description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
