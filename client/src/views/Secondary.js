import React from 'react';
// import section header
import SectionHeader from '../components/sections/partials/SectionHeader';
// import sections
import HeroFull from '../components/sections/HeroFull02';
import Testimonial from '../components/sections/Testimonial';
import Team from '../components/sections/Team';
import GenericSection from '../components/sections/GenericSection';
import Roadmap from '../components/sections/Roadmap';
import Cta from '../components/sections/Cta';
// import some required elements
import Image from '../components/elements/Image';
import Input from '../components/elements/Input';
import ButtonGroup from '../components/elements/ButtonGroup';
import Button from '../components/elements/Button';
import Modal from '../components/elements/Modal';
import Accordion from '../components/elements/Accordion';
import AccordionItem from '../components/elements/AccordionItem';

class Secondary extends React.Component {

  state = {
    demoModalActive: false
  }

  openModal = (e) => {
    e.preventDefault();
    this.setState({ demoModalActive: true });
  }

  closeModal = (e) => {
    e.preventDefault();
    this.setState({ demoModalActive: false });
  }

  render() {  

    const genericSection01Header = {
      title: 'Buttons - Lorem ipsum is placeholder text commonly used.'
    }

    const genericSection02Header = {
      title: 'Input forms - Lorem ipsum is placeholder text commonly used.'
    }

    const genericSection03Header = {
      title: 'Modal - Lorem ipsum is placeholder text commonly used.'
    }    

    const genericSection04Header = {
      title: 'FAQ - Lorem ipsum is placeholder text commonly used.'
    }

    return (
      <React.Fragment>
        <HeroFull className="illustration-section-01" />
        <Testimonial />
        

        <GenericSection topDivider>
          <div className="container-xs">
            <h2 className="mt-0">C'est quoi DOKKAN ?</h2>
            <p>
            Dokan est un comparateur de prix avec des centaines de web marchands dans plusieurs cat??gories avec des milliers d'articles r??f??renc??s par nos soins.
            Pour acheter moins cher et acheter pas cher, comparer les prix en utilisant ce comparateur pour trouver le meilleur rapport qualit?? prix chez nos web marchands et site e-commerce en ligne.
          </p>
            <p>
            Pour l'??quipement de la maison, cong??lateur, appareil photo, t??l??viseur ??cran-plat, chaine HIFI, le t??l??phone mobile ou smartphone, ordinateur portable ou DEAL, vous pourrez comparer tous les prix et acheter moins cher.          </p>
            <figure>
              <Image
                className="image-larger"
                src={require('./../assets/images/image-placeholder.png')}
                alt="Placeholder"
                width={712}
                height={400} />
              <figcaption className="text-color-low">A super-nice image <span role="img" aria-label="mile">????</span></figcaption>
            </figure>
            <h4>Pour Acheter Moins Cher</h4>
            <p>
            Nous travaillons dur chaque jour pour vous apporter les prix les plus attractifs et les moins chers possible sur le march?? tunisien pour vous faire gagner du temps et de l'argent. S'il y a autre chose, nous pouvons faire mieux
            </p>
            
          </div>
        </GenericSection>


        
        
        <GenericSection topDivider>
          <div className="container-xs">
            <SectionHeader data={genericSection04Header} className="center-content" />
            <Accordion>
              <AccordionItem title="Que fait le site" active>
              Dokan est un comparateur de prix, ??galement connu sous le nom moteur de comparaison de prix, ou shopbot ??? sur des sites Web sp??ciaux qui exploitent le Web pour trouver les prix les moins chers pour les produits en ligne. Tapez ce que vous voulez, acc??dez ?? l'offre et il va ??num??rer les prix de votre produit des diff??rents d??taillants.
              Ils peuvent suivre les offres les moins ch??res en ligne pour les livres, films, produits blancs, jeux, mat??riel informatique, t??l??viseurs et des tas de plus. Ainsi, en m??me temps qu'un d??taillant unique vous donnera son prix, vous pouvez obtenir un prix aupr??s de plusieurs d??taillants et cela dans le but de le trouverez moins cher.
              </AccordionItem>
              <AccordionItem title="Nisi porta lorem mollis aliquam ut.">
                Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
              </AccordionItem>
              <AccordionItem title="Nisi porta lorem mollis aliquam ut.">
                Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
              </AccordionItem>
              <AccordionItem title="Nisi porta lorem mollis aliquam ut.">
                Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
              </AccordionItem>
              <AccordionItem title="Nisi porta lorem mollis aliquam ut.">
                Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
              </AccordionItem>
            </Accordion>
          </div>
        </GenericSection>        

        <Roadmap topDivider />
        <Cta split />
      </React.Fragment>
    );
  }
}

// inline style
const formStyle = {
  maxWidth: '420px',
  margin: '0 auto'
}

export default Secondary;