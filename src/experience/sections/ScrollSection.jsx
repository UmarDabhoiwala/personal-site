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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
          provident hic ullam sunt impedit voluptatibus esse, doloribus saepe
          quos quam officia, exercitationem sequi alias. Earum aspernatur nemo
          voluptas, veritatis ipsa odit deleniti commodi illo distinctio
        </p>
        <br />
        <p>
          obcaecati sequi consequatur qui quis praesentium dolorem id alias
          nulla excepturi velit, suscipit ipsam! Aliquam eveniet veniam
          obcaecati? Ab explicabo impedit sed! Recusandae, fugit odio.
        </p>
      </Section>
      <Section classNames="cockpit"></Section>
    </>
  );
};

export default ScrollSections;
