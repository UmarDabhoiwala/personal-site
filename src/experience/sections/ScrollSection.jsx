import classes from "./ScrollSection.module.css";
const Section = (props) => {
  const { children, classNames } = props;

  return (
    <section className={`${classes[classNames]} ${classes.section}`}>
      {children}
    </section>
  );
};
const ScrollSections = () => {
  return (
    <>
      <Section classNames="home"></Section>
      <Section classNames="about">
        <h2>About Me</h2>
        <p>
            Hello, I'm Umar Dabhoiwala. 
            I'm a Software Engineer at Penten working in the Applied A.I Team.
            I studied at the Australian National University where I achieved a Bachelors in Advanced Computing (Honours),
            specialising in Machine Learning, and Artificial Intelligence.
            Programming, for me, is a vast landscape brimming with opportunities where creativity and logic interlace to sculpt elegant solutions.
        </p>
        <br />
        <p>
            My passion extends to High Performance Computing and the intricate world of Finance Trading.
            These domains represent the intersection of rapid technological advancements and global economic dynamics, 
            and I'm always eager to delve deeper and harness their potential.
        </p>
        <br />
        <p>
            Professionally, I've made impactful contributions as a Software Engineer at Penten's Applied AI Team. 
            Here, I developed intuitive software interfaces, streamlined data processes, and played a pivotal role in several key cybersecurity initiatives. 
            Additionally, I undertook risk management projects at the Department of Infrastructure and Transport,
            where I applied analytical thinking and data analysis for valuable insights and recommendations. 
            On the side, I ventured into freelance web development, crafting custom, user-friendly websites tailored to client specifications.
        </p>
        <br />
        <p>
            Beyond academics and work, I am interested in entrepreneurship and startups, having participated the HEX Singapore program, 
            a two-week immersive program for idea-stage founders. 
            I am also highly interested in exploring the newest technologies and methodologies aiming to always learn and innovate.
        </p>
      </Section>
      <Section classNames="cockpit"></Section>
    </>
  );
};

export default ScrollSections;
