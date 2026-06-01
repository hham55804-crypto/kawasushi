export type MenuItem = {
  name: string;
  price?: string;
  description?: string;
  image?: string;
  visible?: boolean;
};

export type MenuSubCategory = {
  title: string;
  items: MenuItem[];
  visible?: boolean;
};

export type MenuSection = {
  id: string;
  name: string;
  subtitle?: string;
  items?: MenuItem[];
  subcategories?: MenuSubCategory[];
  categoryImages?: string[]; // Used when images apply to the entire section layout
  layout?: 'default' | 'twocol' | 'columns';
  visible?: boolean;
};

export const menuData: MenuSection[] = [
  {
    id: 'poke-bowls',
    name: 'POKE BOWLS',
    items: [
      { name: 'For You', price: '40dh', description: 'saumon,surimi,riz épicé,wakami, avocat,ebi ,sesame, concombre' },
      { name: 'Kawa Poke', price: '45dh', description: 'saumon,riz épicé,mangue wakami , gambas panees, sesame, concombre' }
    ]
  },
  {
    id: 'tartare',
    name: 'TARTARE',
    items: [
      { name: 'Saumon avocat', price: '35dh', description: 'riz,avocat,saumon,tobiko,sauce épicée ,ciboulette' },
      { name: 'Gambas Panees', price: '30dh', description: 'riz ,avocat , gambas panees, tobiko,ciboulette,sauce épicée' }
    ]
  },
  {
    id: 'soupes',
    name: 'SOUPES',
    items: [
      { name: 'Poisson', price: '40dh', description: 'fruits de mer, champignons, gingembre,poireau ,vermicelle', image: '/images/soupe-poisson.png' },
      { name: 'Chinoise', price: '35dh', description: 'poulet, blanc d\'œuf, nouilles, gingembre,oignons,wakami', image: '/images/soupe-chinoise.png' }
    ]
  },
  {
    id: 'california-rolls',
    name: 'CALIFORNIA ROLLS',
    subtitle: '4 pieces',
    categoryImages: ['/images/california-1.png', '/images/california-2.png'],
    items: [
      { name: 'Spicy Raw Salmon', price: '25dh', description: 'saumon , riz épicé' },
      { name: 'Saumon Flambé', price: '30dh', description: 'saumon flambé, avocat , cheese, sésame' },
      { name: 'Cream Cheese', price: '30dh', description: 'saumon,surimi, avocat,cheese ,tobiko' },
      { name: 'Saumon Avocat', price: '30dh', description: 'saumon , avocat ,cheese' },
      { name: 'Saumon Cheese', price: '25dh', description: 'saumon, cheese ,sesame' },
      { name: 'Ebi Fry', price: '25dh', description: 'cheese ,avocat ,gambas panees ,ciboulette' },
      { name: 'Saumon Cuit', price: '25dh', description: 'saumon cuit ,avocat ,sauce epicee ,tobiko OR' }
    ]
  },
  {
    id: 'special-kawa-rolls',
    name: 'SPECIAL KAWA ROLLS',
    subtitle: '4 pieces',
    categoryImages: ['/images/special-kawa-1.png', '/images/special-kawa-2.png'],
    items: [
      { name: 'Creamy pieces', price: '35dh', description: 'saumon , riz épicé , anguille , unagi sauce' },
      { name: 'Chicken Roll', price: '30dh', description: 'poulet panees, oignons crispy,fromage fondant, kamikaze' },
      { name: 'Lava Roll', price: '35dh', description: 'saumon épicé ,tobiko R, anguille panné, mayo Jap.' },
      { name: 'The Nordic', price: '30dh', description: 'saumon , riz ,cheese' },
      { name: 'Kawa Roll', price: '35dh', description: 'gambas panees , épinard panees ,cheese , ebi' }
    ]
  },
  {
    id: 'nigiri',
    name: 'NIGIRI',
    subtitle: '4 pieces',
    layout: 'twocol',
    items: [
      { name: 'Saumon', price: '20dh', image: '/images/nigiri-saumon.png' },
      { name: 'Gambas Panees', price: '20dh', image: '/images/nigiri-gambas.png' },
      { name: 'Ebi', price: '20dh', image: '/images/nigiri-ebi.png' },
      { name: 'Anguille', price: '20dh', image: '/images/nigiri-anguille.png' }
    ]
  },
  {
    id: 'aromaki',
    name: 'AROMAKI',
    subtitle: '8 pieces',
    categoryImages: ['/images/aromaki.png'],
    items: [
      { name: 'Sauman Wakame', price: '45dh', description: 'saumon ,avocat, cheese, Ebi, laitue, wakame' },
      { name: 'Exotic Saumon', price: '40dh', description: 'saumon ,surimi , mangue,tobiko ,cheese' },
      { name: 'Gambas Panées', price: '40dh', description: 'gambas panées ,avocat,surimi, laitue, cheese ,tobiko' },
      { name: 'Saumon Cuit', price: '40dh', description: 'saumon cuit mariné ,avocat ,surimi ,cheese ,tobiko' }
    ]
  },
  {
    id: 'maki',
    name: 'M A K I',
    subtitle: '6 pieces',
    layout: 'twocol',
    categoryImages: ['/images/maki-rolls.png'],
    items: [
      { name: 'Saumon', price: '20dh' },
      { name: 'Avocat', price: '20dh' },
      { name: 'Gambas Panées', price: '20dh' },
      { name: 'Mangue', price: '20dh' },
      { name: 'Surimi', price: '20dh' },
      { name: 'Saumon Cheese', price: '25dh' },
      { name: 'Concombre', price: '20dh' },
      { name: 'Saumon Avocat', price: '25dh' }
    ]
  },
  {
    id: 'sashimi',
    name: 'S A S H I M I',
    subtitle: '4 pieces',
    layout: 'twocol',
    items: [
      { name: 'Sashimi Saumon', price: '35dh', image: '/images/sashimi-1.png' },
      { name: 'Sashimi Saumon', price: '35dh', image: '/images/sashimi-2.png' }
    ]
  },
  {
    id: 'futomaki',
    name: 'F U T O M A K I',
    subtitle: '5 pieces',
    categoryImages: ['/images/futomaki.png'],
    items: [
      { name: 'saumon', price: '30dh', description: 'saumon ,riz ,avocat ,tobiko, laitue' },
      { name: 'gambas panées', price: '25dh', description: 'avocat ,tobiko, gambas panées , laitue' },
      { name: 'v e g e', price: '20dh', description: 'avocat ,riz , concomber ,laitue' }
    ]
  },
  {
    id: 'pizza-sushi',
    name: 'PIZZA SUSHI',
    subtitle: '8 pieces',
    categoryImages: ['/images/pizza-sushi.png'],
    items: [
      { name: 'Pizza mozzarella', price: '35dh', description: 'saumon, mozzarella,ciboulette, tobiko' },
      { name: 'Pizza saumon cuit', price: '35dh', description: 'saumon, ciboulette, spicy sauce ,cheese' },
      { name: 'Pizza saumon frais', price: '35dh', description: 'saumon, surimi ,concomber,avocat,tobiko,' }
    ]
  },
  {
    id: 'fry-rolls',
    name: 'FRY ROLLS',
    subtitle: '4 pieces',
    categoryImages: ['/images/fry-rolls-1.png', '/images/fry-rolls-2.png', '/images/fry-rolls-3.png'],
    items: [
      { name: 'Yummy & Crispy', price: '35dh', description: 'mangue,saumon panées ,surumi,cheese,unagi sauce' },
      { name: 'Salmon Crispy', price: '35dh', description: 'saumon épicé, gambas panées , cheese tobico' },
      { name: 'Crispy Pop', price: '30dh', description: 'riz épicé, saumon , crispy onions, sauce kamikaze' },
      { name: 'Fry Ebi Fry', price: '30dh', description: 'gambas panées , surimi ,avocat ,cheese, kamikaze' },
      { name: 'Shrimp Crunch Roll', price: '30dh', description: 'ebi tempura,cheese ,unagi sauce' }
    ]
  },
  {
    id: 'golden-crispy',
    name: 'GOLDEN CRISPY',
    items: [
      { name: 'boulettes de poulet :', price: '35dh', description: '4 p/ 35dh', image: '/images/golden-boulettes.png' },
      { name: 'Nems de poulet :', price: '35dh', description: '2 p / 35dh', image: '/images/golden-nems.png' },
      { name: 'Gambas panées :', price: '35dh', description: '4 p / 35dh', image: '/images/golden-gambas.png' }
    ]
  },
  {
    id: 'assortiement',
    name: 'ASSORTIEMENT',
    categoryImages: ['/images/assortiment-1.png', '/images/assortiment-2.png', '/images/assortiment-3.png'],
    items: [
      { name: 'Fresh 10 pieces:', price: '60dh', description: '4p Spicy raw salmon ,4p ebi fry , 2p nigiri saumon' },
      { name: 'Fry 10 piece', price: '65dh', description: '4p Crispy Pop, 4p Fry Ebi Fry, 2p nigiri gambas panées' },
      { name: 'B_16pieces', price: '85dh', description: '8p Shrimp Crunch Roll ,4p Saumon avocat, 4p Saumon cuit' },
      { name: 'C_ 26 pieces', price: '140dh', description: '8p Yummy & Crispy, 4p The Nordic , 8p Aromaki saumon, 6p Maki gambas' },
      { name: 'D _ 44pieces', price: '250 dh' },
      { name: 'E _ 60pieces', price: '350 dh' },
      { name: 'F _ 100pieces', price: '450dh' }
    ]
  },
  {
    id: 'wok-bowls',
    name: 'WOK BOWLS',
    subtitle: '(Légumes grillés)',
    layout: 'columns',
    categoryImages: ['/images/wok-1.png', '/images/wok-2.png', '/images/wok-3.png'],
    subcategories: [
      {
        title: 'CHOISISSEZ VOTRE PROTÉINE',
        items: [
          { name: 'Poulet', price: '50dh' },
          { name: 'Bœuf', price: '55dh' },
          { name: 'Gambas', price: '55dh' },
          { name: 'Mixte', price: '65dh' },
          { name: 'Végétarien', price: '40DH' }
        ]
      },
      {
        title: 'CHOISISSEZ VOTRE BASE',
        items: [
          { name: 'Nouilles' },
          { name: 'Riz' },
          { name: 'Vermicelles' }
        ]
      },
      {
        title: 'CHOISISSEZ VOTRE SAUCE',
        items: [
          { name: 'Oyster sauce' },
          { name: 'Ginger Soy' },
          { name: 'Sauce Curry Thaï' },
          { name: 'Sriracha' },
          { name: 'Sweet Chili' },
          { name: 'Sauce Teriyaki' }
        ]
      }
    ]
  },
  {
    id: 'desserts-and-mocktails',
    name: 'DESSERTS & DRINKS',
    layout: 'columns',
    subcategories: [
      {
        title: 'DESSERTS',
        items: [
          { name: 'Nutella banan roll', price: '25DH' },
          { name: 'banoffee Pie', price: '25DH' }
        ]
      },
      {
        title: 'DRINKS',
        items: [
          { name: 'Sodas', price: '12dh' },
          { name: 'Eau 33CL', price: '6dh' },
          { name: 'Eau 50CL', price: '8dh' },
          { name: 'Café', price: '12dh' },
          { name: 'Ice Latte', price: '25dh' }
        ]
      },
      {
        title: 'MOCKTAIL',
        items: [
          { name: 'Citron au gingembre', price: '25dh' },
          { name: 'Sakura Fresh', price: '25dh' },
          { name: 'Marsha Milk', price: '35dh' },
          { name: 'Virgin Mojito', price: '25dh' },
          { name: 'Jus D\'orange', price: '20dh' }
        ]
      }
    ],
    categoryImages: ['/images/mocktails.png']
  },
  {
    id: 'mini-menu-snacking',
    name: 'MINI MENU SNACKING',
    items: [
      { name: 'Sandwich Poulet Grillé', price: '30dh', description: 'Poulet grillé mariné, salade, oignons caramélisés, sauce maison' },
      { name: 'Sandwich César', price: '30dh', description: 'Poulet Crispy, Fromage , salade,tomates,sauce BBQ' }
    ],
    subcategories: [
      {
        title: 'P i z z a',
        items: [
          { name: 'Pizza Campagnarde', price: '30dh', description: 'Crème fraîche,dinde fumée,Champignons, Oignons caramélisés, Mozzarella' },
          { name: 'Pizza Chicken', price: '30dh', description: 'Poulet grillé, Oignons , Mozzarella ,Champignons,Poivrons' },
          { name: 'Pizza César', price: '30dh', description: 'Poulet Crispy, Crème fraîche, salade ,tomates,' }
        ]
      },
      {
        title: 'SANDWICH GRATINÉ',
        items: [
          { name: 'poulet gratiné', price: '30dh', description: 'Poulet grillé,Sauce BBQ,Oignons caramélisés, Fromage mozzarella gratiné', image: '/images/sandwich-gratine.png' },
          { name: 'Steak Cheese Melt', price: '30dh', description: 'steaks épicée ,poivrons sautés,Sauce fromagère + mozzarella gratinés' }
        ]
      },
      {
        title: '',
        items: [
          { name: 'Crousty Chicken Bowl', price: '30dh', description: 'poulet crispy, oignons crispy, mayo Jap Base au choix Riz ou Frites & sauce au choix.', image: '/images/crousty-bowl.png' }
        ]
      }
    ]
  }
];

