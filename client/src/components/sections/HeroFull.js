import React from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import Button from "../elements/Button";
import Image from "../elements/Image";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

class HeroFull extends React.Component {
  render() {
    const {
      className,
      topOuterDivider,
      bottomOuterDivider,
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      ...props
    } = this.props;

    const outerClasses = classNames(
      "hero section center-content",
      topOuterDivider && "has-top-divider",
      bottomOuterDivider && "has-bottom-divider",
      hasBgColor && "has-bg-color",
      invertColor && "invert-color",
      className
    );

    const innerClasses = classNames(
      "hero-inner section-inner",
      topDivider && "has-top-divider",
      bottomDivider && "has-bottom-divider"
    );

    return (
      <section {...props} className={outerClasses}>
        <div className="container-sm">
          <div className={innerClasses}>
            <div className="hero-content">
              <div className="reveal-from-bottom" data-reveal-delay="500" style={{height:"80px"}}>
                <input
                  className=" mb-12 ring-none focus-none"
                  style={{height:"60px", width:"350px"}}
                />
              </div>
              <h1
                className="mt-0 mb-16 reveal-from-bottom "
                data-reveal-delay="200"
              >
                DOKKAN
              </h1>
              <div className="container-xs">
                <p
                  className="m-0 mb-32 reveal-from-bottom"
                  data-reveal-delay="400"
                >
                  Dokan est un comparateur de prix, également connu sous le nom moteur de comparaison de prix, ou shopbot – sur des sites Web spéciaux qui exploitent le Web pour trouver les prix les moins chers pour les produits en ligne. Tapez ce que vous voulez, accédez à l'offre et il va énumérer les prix de votre produit des différents détaillants.
                </p>
                <div className="reveal-from-bottom" data-reveal-delay="500">
                  <Button
                    tag="a"
                    color="primary"
                    wideMobile
                    href="https://cruip.com/"
                  >
                    Browse categories
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }
}

HeroFull.propTypes = propTypes;
HeroFull.defaultProps = defaultProps;

export default HeroFull;
