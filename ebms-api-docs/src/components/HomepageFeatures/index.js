import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Problematização',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Em crises humanitárias, como desastres naturais, conflitos armados ou pandemias, 
        a necessidade de sangue para transfusões cresce de maneira exponencial e imprevisível. 
      </>
    ),
  },
  {
    title: 'Solução',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        A EBMS (Economia de Sangue e Monitoramento de Estoque) surge como uma API inovadora para resolver 
        esse problema, oferecendo uma plataforma centralizada e interoperável que conecta hospitais, bancos de sangue 
        em tempo real.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
