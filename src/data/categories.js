// Páginas de categoria (Fase 2 do brief de SEO): cada uma tem sua própria
// URL, indexável nos 3 idiomas com URL própria (pt/en/es), com texto único
// e um FAQ curto — em vez de todo o catálogo viver só numa seção da home.
// O filtro usa o mesmo campo `type` de src/data/properties.js, então uma
// propriedade nova entra sozinha na categoria certa, sem tocar aqui.
export const CATEGORIES = [
  {
    key: 'terreno',
    propertyType: 'Terreno',
    slugs: { pt: 'terrenos-em-pipa', en: 'land-for-sale-in-pipa', es: 'terrenos-en-pipa' },
    metaTitle: {
      pt: 'Terrenos à Venda em Pipa, RN | Ajé Imobiliária',
      en: 'Land for Sale in Pipa Beach, Brazil | Ajé Imobiliária',
      es: 'Terrenos en Venta en Pipa Beach, Brasil | Ajé Imobiliária',
    },
    metaDescription: {
      pt: 'Terrenos em Pipa, Sibaúma e Tibau do Sul, com documentação verificada e apoio jurídico completo. Veja preços e disponibilidade.',
      en: 'Land for sale in Pipa Beach, Sibaúma and Tibau do Sul, with verified title and full legal support for foreign buyers. See prices now.',
      es: 'Terrenos en Pipa Beach, Sibaúma y Tibau do Sul, con documentación verificada y apoyo jurídico completo para extranjeros.',
    },
    h1: {
      pt: 'Terrenos à venda em Pipa e região',
      en: 'Land for Sale in Pipa Beach & Surrounding Area',
      es: 'Terrenos en venta en Pipa Beach y alrededores',
    },
    intro: {
      pt: 'Pipa é um dos destinos mais procurados do litoral do Rio Grande do Norte, e a demanda por terrenos na região só cresce — tanto para quem quer construir a casa de temporada quanto para quem enxerga potencial de investimento em hotelaria, pousadas ou loteamentos.\n\nA Ajé Imobiliária trabalha com terrenos em Praia da Pipa, Sibaúma, Tibau do Sul e arredores, com opções que vão de lotes a partir de 300 m² até áreas de vários hectares para projetos maiores. Todos os terrenos passam por verificação de documentação antes de ir ao ar, e cada negociação conta com apoio jurídico da nossa equipe — da análise da matrícula até a escritura.\n\nAbaixo estão os terrenos disponíveis no momento, com preço total e por metro quadrado.',
      en: 'Pipa Beach is one of the most sought-after destinations on the Rio Grande do Norte coast, and demand for land here keeps growing — both from people who want to build a vacation home and from investors who see potential in boutique hotels, pousadas, or small developments.\n\nAjé Imobiliária works with land in Pipa Beach, Sibaúma, Tibau do Sul, and the surrounding area, with lots starting around 300 m² up to multi-hectare parcels for larger projects. Every listing is checked for clear title before it goes live, and our team provides legal support throughout the process — from reviewing the property registration to the final deed.\n\nBelow are the lots currently available, with total price and price per square meter.',
      es: 'Pipa Beach es uno de los destinos más buscados del litoral de Rio Grande do Norte, y la demanda de terrenos en la zona no para de crecer — tanto de quienes quieren construir su casa de vacaciones como de inversores que ven potencial en posadas, hoteles boutique o pequeños desarrollos.\n\nEn Ajé Imobiliária trabajamos con terrenos en Pipa Beach, Sibaúma, Tibau do Sul y alrededores, con lotes desde 300 m² hasta parcelas de varias hectáreas para proyectos más grandes. Cada terreno se verifica antes de publicarse, y nuestro equipo brinda apoyo jurídico durante todo el proceso — desde la revisión de la matrícula hasta la escritura final.\n\nA continuación, los terrenos disponibles, con precio total y por metro cuadrado.',
    },
    faq: {
      pt: [
        {
          q: 'É seguro comprar um terreno em Pipa sendo de outra cidade ou país?',
          a: 'Sim — o mais importante é verificar a matrícula do imóvel, eventuais ônus e a regularização fundiária antes de assinar qualquer coisa. A Ajé acompanha esse processo com apoio jurídico próprio, e também é possível comprar à distância, com procuração.',
        },
        {
          q: 'Qual a diferença entre terreno com escritura pública e outras formas de documentação?',
          a: 'A escritura pública registrada em cartório é a forma mais segura de comprovar a propriedade. Alguns terrenos na região ainda estão em processo de regularização — nesses casos, explicamos claramente a situação de cada imóvel antes da negociação.',
        },
        {
          q: 'Dá pra construir pousada ou projeto comercial nesses terrenos?',
          a: 'Depende da zona e da legislação municipal de cada área — por isso recomendamos sempre confirmar o uso pretendido com nossa equipe antes de fechar negócio.',
        },
      ],
      en: [
        {
          q: 'Is it safe for a foreigner to buy land in Pipa?',
          a: "Yes — foreigners can buy urban property in Brazil with the same rights as Brazilian citizens, as long as the title is verified first. We check the property registration and any liens before listing, and our legal team can guide you through the process, including buying remotely with a power of attorney.",
        },
        {
          q: "What's the difference between land with a public deed and other documentation?",
          a: 'A public deed (escritura pública) registered with the notary office is the safest proof of ownership. Some lots in the area are still going through title regularization — when that\'s the case, we explain the exact status clearly before any negotiation.',
        },
        {
          q: 'Can I build a pousada or commercial project on this land?',
          a: 'It depends on the zoning and local regulations for that specific area — we always recommend confirming your intended use with our team before closing a deal.',
        },
      ],
      es: [
        {
          q: '¿Es seguro para un extranjero comprar un terreno en Pipa?',
          a: 'Sí — los extranjeros pueden comprar inmuebles urbanos en Brasil con los mismos derechos que un brasileño, siempre que se verifique la titularidad primero. Revisamos la matrícula y posibles gravámenes antes de publicar, y nuestro equipo legal puede acompañarte en todo el proceso, incluso a distancia con poder notarial.',
        },
        {
          q: '¿Cuál es la diferencia entre un terreno con escritura pública y otra documentación?',
          a: 'La escritura pública registrada en el cartório es la forma más segura de comprobar la propiedad. Algunos terrenos de la zona todavía están en proceso de regularización — en esos casos, explicamos con claridad la situación de cada inmueble antes de negociar.',
        },
        {
          q: '¿Se puede construir una posada o un proyecto comercial en estos terrenos?',
          a: 'Depende de la zonificación y la normativa municipal de cada área — por eso recomendamos confirmar el uso que planeas darle con nuestro equipo antes de cerrar el trato.',
        },
      ],
    },
  },
  {
    key: 'venda',
    propertyType: 'Venda',
    slugs: { pt: 'casas-a-venda-em-pipa', en: 'properties-for-sale-in-pipa', es: 'casas-en-venta-en-pipa' },
    metaTitle: {
      pt: 'Casas e Imóveis à Venda em Pipa, RN | Ajé Imobiliária',
      en: 'Homes for Sale in Pipa Beach, Brazil | Ajé Imobiliária',
      es: 'Casas en Venta en Pipa Beach, Brasil | Ajé Imobiliária',
    },
    metaDescription: {
      pt: 'Casas, coberturas e imóveis à venda em Pipa, Natal e João Pessoa. 35 anos de experiência local e apoio jurídico completo.',
      en: '35 years of local experience, full legal support for foreign buyers. Houses and properties for sale in Pipa Beach, Natal and João Pessoa.',
      es: 'Casas e inmuebles en venta en Pipa Beach, Natal y João Pessoa. 35 años de experiencia local y apoyo jurídico completo.',
    },
    h1: {
      pt: 'Casas e imóveis à venda em Pipa e região',
      en: 'Homes & Properties for Sale in Pipa Beach, Brazil',
      es: 'Casas e inmuebles en venta en Pipa Beach y alrededores',
    },
    intro: {
      pt: 'De casas de praia a coberturas em Natal, a Ajé Imobiliária reúne imóveis à venda em Pipa, Tibau do Sul, Natal, João Pessoa e arredores — para quem busca morar, passar as férias ou investir em locação de temporada.\n\nCom 35 anos de atuação na região, conhecemos de perto cada bairro e cada fase do processo de compra, com apoio jurídico completo em todas as etapas: documentação, negociação, escritura e registro.\n\nVeja abaixo os imóveis disponíveis no momento.',
      en: 'From beachfront houses to apartments in Natal, Ajé Imobiliária lists properties for sale in Pipa Beach, Tibau do Sul, Natal, João Pessoa and the surrounding area — for anyone looking to live here, spend their holidays, or invest in short-term rental income.\n\nWith 35 years of local experience, we know every neighborhood and every step of the buying process, with full legal support throughout: paperwork, negotiation, deed and registration.\n\nBrowse the properties currently available below.',
      es: 'Desde casas frente al mar hasta departamentos en Natal, en Ajé Imobiliária reunimos inmuebles en venta en Pipa Beach, Tibau do Sul, Natal, João Pessoa y alrededores — para quien busca vivir, pasar sus vacaciones o invertir en alquiler de temporada.\n\nCon 35 años de experiencia en la zona, conocemos cada barrio y cada etapa del proceso de compra, con apoyo jurídico completo: documentación, negociación, escritura y registro.\n\nMirá los inmuebles disponibles a continuación.',
    },
    faq: {
      pt: [
        {
          q: 'Quais documentos preciso verificar antes de comprar uma casa em Pipa?',
          a: 'Matrícula atualizada do imóvel, certidões negativas do vendedor e eventuais ônus sobre o imóvel são o mínimo. A Ajé faz essa checagem antes de publicar cada imóvel e acompanha você durante toda a negociação.',
        },
        {
          q: 'Dá para comprar à distância, morando em outra cidade ou país?',
          a: 'Sim. Muitos dos nossos clientes compram à distância, com procuração e acompanhamento jurídico — inclusive estrangeiros, que podem comprar imóveis urbanos no Brasil com os mesmos direitos de um brasileiro.',
        },
        {
          q: 'A Ajé ajuda depois da compra, por exemplo para alugar o imóvel?',
          a: 'Sim, também oferecemos apoio para quem quer colocar o imóvel para locação de temporada depois da compra.',
        },
      ],
      en: [
        {
          q: 'What documents should I check before buying a house in Pipa?',
          a: 'At minimum: an updated property registration (matrícula), clearance certificates for the seller, and a check for any liens on the property. We verify all of this before listing, and guide you through the whole negotiation.',
        },
        {
          q: 'Can I buy remotely, from another country?',
          a: 'Yes. Many of our clients buy remotely with a power of attorney and legal support — including foreigners, who can purchase urban property in Brazil with the same rights as Brazilian citizens.',
        },
        {
          q: 'Does Ajé help after the purchase, for example to rent the property out?',
          a: 'Yes, we also support clients who want to list their property for short-term rental after buying.',
        },
      ],
      es: [
        {
          q: '¿Qué documentos debo verificar antes de comprar una casa en Pipa?',
          a: 'Como mínimo: la matrícula actualizada del inmueble, certificados del vendedor y la verificación de posibles gravámenes. Hacemos esta revisión antes de publicar cada inmueble y te acompañamos durante toda la negociación.',
        },
        {
          q: '¿Puedo comprar a distancia, viviendo en otro país?',
          a: 'Sí. Muchos de nuestros clientes compran a distancia, con poder notarial y apoyo jurídico — incluso extranjeros, que pueden comprar inmuebles urbanos en Brasil con los mismos derechos que un brasileño.',
        },
        {
          q: '¿Ajé ayuda después de la compra, por ejemplo para alquilar el inmueble?',
          a: 'Sí, también ofrecemos apoyo para quienes quieren poner el inmueble en alquiler de temporada después de la compra.',
        },
      ],
    },
  },
  {
    key: 'aluguel',
    propertyType: 'Aluguel',
    slugs: { pt: 'aluguel-em-pipa', en: 'rentals-in-pipa', es: 'alquiler-en-pipa' },
    metaTitle: {
      pt: 'Aluguel de Temporada em Pipa, RN | Ajé Imobiliária',
      en: 'Vacation Rentals in Pipa Beach, Brazil | Ajé Imobiliária',
      es: 'Alquiler de Temporada en Pipa Beach | Ajé Imobiliária',
    },
    metaDescription: {
      pt: 'Casas para alugar em Pipa por diária, temporada ou contrato anual. Consulte disponibilidade e valores pelo WhatsApp.',
      en: 'Houses for rent in Pipa Beach by the day, season or annual lease. Check availability and pricing on WhatsApp.',
      es: 'Casas en alquiler en Pipa Beach por día, temporada o contrato anual. Consultá disponibilidad y precios por WhatsApp.',
    },
    h1: {
      pt: 'Aluguel de temporada e anual em Pipa',
      en: 'Vacation & Annual Rentals in Pipa Beach',
      es: 'Alquiler de temporada y anual en Pipa Beach',
    },
    intro: {
      pt: 'Procurando uma casa para alugar em Pipa, seja para as férias, o Réveillon ou uma temporada mais longa? A Ajé Imobiliária tem opções de aluguel por diária, temporada e também contratos anuais, em Pipa e região.\n\nTrabalhamos com casas de diferentes tamanhos e localizações, sempre com atendimento direto por WhatsApp para verificar disponibilidade, valores e condições — que variam conforme a quantidade de pessoas, dias e época do ano.\n\nVeja abaixo as opções disponíveis no momento.',
      en: "Looking for a house to rent in Pipa Beach — for a vacation, New Year's Eve, or a longer stay? Ajé Imobiliária offers rentals by the day, by the season, and annual leases, in Pipa and the surrounding area.\n\nWe work with houses of different sizes and locations, always with direct WhatsApp support to check availability, pricing and conditions — which vary by number of guests, number of nights, and time of year.\n\nSee the options currently available below.",
      es: '¿Buscás una casa para alquilar en Pipa Beach, ya sea para vacaciones, fin de año o una temporada más larga? En Ajé Imobiliária tenemos opciones de alquiler por día, por temporada y también contratos anuales, en Pipa y alrededores.\n\nTrabajamos con casas de distintos tamaños y ubicaciones, siempre con atención directa por WhatsApp para consultar disponibilidad, precios y condiciones — que varían según la cantidad de personas, los días y la época del año.\n\nMirá las opciones disponibles a continuación.',
    },
    faq: {
      pt: [
        {
          q: 'Como funciona o valor do aluguel por temporada?',
          a: 'O valor varia conforme o número de pessoas, a quantidade de diárias e a época do ano (alta ou baixa temporada, Réveillon, etc.). Entre em contato pelo WhatsApp informando as datas para receber um valor exato.',
        },
        {
          q: 'É possível alugar para o Réveillon ou época de Carnaval?',
          a: 'Sim, temos opções para essas datas — como são períodos de alta procura, recomendamos entrar em contato com antecedência.',
        },
        {
          q: 'Vocês também alugam para contratos anuais, não só temporada?',
          a: 'Sim, também temos imóveis disponíveis para aluguel anual, para quem vai morar em Pipa por mais tempo.',
        },
      ],
      en: [
        {
          q: 'How does seasonal rental pricing work?',
          a: 'Pricing depends on the number of guests, the number of nights, and the time of year (high or low season, New Year\'s Eve, etc.). Message us on WhatsApp with your dates for an exact quote.',
        },
        {
          q: 'Can I rent for New Year\'s Eve or Carnival?',
          a: "Yes, we have options for those dates — since they're in high demand, we recommend reaching out well in advance.",
        },
        {
          q: 'Do you also offer annual leases, not just short-term rentals?',
          a: 'Yes, we also have properties available for annual rental, for anyone planning to live in Pipa longer-term.',
        },
      ],
      es: [
        {
          q: '¿Cómo funciona el precio del alquiler de temporada?',
          a: 'El precio varía según la cantidad de personas, la cantidad de noches y la época del año (temporada alta o baja, fin de año, etc.). Escribinos por WhatsApp con tus fechas para recibir un precio exacto.',
        },
        {
          q: '¿Puedo alquilar para fin de año o Carnaval?',
          a: 'Sí, tenemos opciones para esas fechas — como son de alta demanda, recomendamos escribir con anticipación.',
        },
        {
          q: '¿También alquilan con contrato anual, no solo por temporada?',
          a: 'Sí, también tenemos inmuebles disponibles para alquiler anual, para quienes van a vivir en Pipa por más tiempo.',
        },
      ],
    },
  },
];

export function getCategoryUrl(category, lang, siteUrl) {
  const slug = category.slugs[lang] ?? category.slugs.pt;
  const prefix = lang === 'pt' ? '' : `${lang}/`;
  return `${siteUrl}/${prefix}${slug}`;
}

// Usado pra linkar de volta da página de um imóvel pra sua categoria
// (breadcrumb + "ver mais") — property.type ('Terreno'/'Venda'/'Aluguel')
// -> a categoria correspondente. Imóveis com type 'Outros' não têm
// categoria própria, então não geram esse link.
export function getCategoryForPropertyType(propertyType) {
  return CATEGORIES.find((c) => c.propertyType === propertyType) ?? null;
}
