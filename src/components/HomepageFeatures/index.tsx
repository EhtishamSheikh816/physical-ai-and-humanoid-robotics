import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Comprehensive Curriculum',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Complete textbook covering ROS2 fundamentals, humanoid locomotion, balance control,
        Gazebo simulation, Isaac Sim, Unity integration, VLA models, and capstone projects.
      </>
    ),
  },
  {
    title: 'Hands-on Learning',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Practical examples, code snippets, and interactive diagrams to help you
        understand physical AI and humanoid robotics concepts.
      </>
    ),
  },
  {
    title: 'Cutting-edge Tech',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Learn with modern tools and frameworks including ROS2, Gazebo, Isaac Sim,
        Unity, and the latest advances in humanoid robotics.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={clsx('feature-card', styles.featureCard)}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--12 margin-bottom--lg">
            <div className="text--center padding-horiz--md">
              <Heading as="h2" className={clsx('gradient-text', styles.gradientText)}>
                Why Learn Physical AI & Humanoid Robotics?
              </Heading>
              <p className="padding-top--md">
                Master the intersection of artificial intelligence and physical systems with our comprehensive textbook.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
