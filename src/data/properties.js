// Imóveis reais — primeira leva (Ajé Imobiliária).
//
// FOTOS: cada foto tenta carregar primeiro o arquivo local em
// /public/images/imoveis/<nome>.jpg. Se ainda não existir, mostra uma
// imagem de reserva neutra da própria Ajé (_placeholder.jpg) — sem
// depender de bancos externos, já que estas são fotos reais.
//
// Ordem pedida pela cliente: primeiro Praia do Amor, Praia das Minas,
// Rua das Pedrinhas e a Cobertura do Tirol (os destaques), depois os
// demais terrenos, depois as demais vendas, e por último o barco e as
// casas de aluguel/temporada.
//
// DESCRIÇÃO: pode usar quebras de linha e marcadores (•) para ficar mais
// fácil de ler — a página de cada imóvel preserva as quebras de linha.
//
// descriptionEn: versão em inglês, usada só na página /en/<slug> de cada
// imóvel (pensada para o público estrangeiro — gringos que conhecem Pipa
// de férias). Os nomes próprios (ruas, praias, bairros) continuam em
// português, como qualquer nome de lugar seria mantido num site em inglês.
//
// city: deve corresponder exatamente a um valor de AREAS (src/data/areas.js).
// priceValue: número em BRL (null quando ainda não há preço definido).
const PLACEHOLDER = '/images/imoveis/_placeholder.jpg';

// Gera um slug único e amigável para SEO a partir do tipo + título do
// imóvel, usado nas URLs individuais de cada propriedade
// (ex: /venda-cobertura-duplex-no-tirol-natal).
function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getPropertySlug(property) {
  const typeSlug = slugify(property.type);
  const titleSlug = slugify(property.title);
  const citySlug = slugify(property.city);
  // Evita repetir o tipo quando o título já começa com ele (ex: título
  // "Terreno para desmembramento..." + tipo "Terreno" ficaria redundante).
  const base = titleSlug.startsWith(typeSlug) ? titleSlug : `${typeSlug}-${titleSlug}`;
  // A cidade entra no final da URL — ajuda o SEO local (ex: "...-natal",
  // "...-praia-da-pipa") e é o formato que o cliente pediu.
  return `${base}-${citySlug}`;
}

export const PROPERTIES = [
  {
    id: 'terreno-praia-do-amor-pipa',
    title: 'Terreno com vista panorâmica — Praia do Amor',
    city: 'Praia da Pipa',
    type: 'Terreno',
    featured: true,
    area: '3.126 m² (perímetro de 243 m)',
    priceValue: 1700000,
    priceLabel: 'R$ 1.700.000',
    pricePerM2Label: 'R$ 544/m²',
    description:
      'Uma oportunidade incrível: terreno a R$ 544 o metro quadrado, enquanto a região já está avaliada em cerca de R$ 800/m². Um dos terrenos mais espetaculares de Pipa, com vista panorâmica em uma das áreas mais valorizadas da região — oportunidade única para quem comprar a área completa, com ótimo potencial para hotelaria, pousadas ou um empreendimento turístico de alto padrão.',
    descriptionEn:
      'An incredible opportunity: land priced at R$544 per square meter, while the area is already valued at around R$800/m². One of the most spectacular plots in Pipa, with a panoramic ocean view in one of the most sought-after parts of the region — a unique chance for whoever buys the entire lot, with strong potential for a boutique hotel, pousada or high-end tourism project.',
    descriptionEs:
      'Una oportunidad increíble: terreno a R$544 el metro cuadrado, mientras que la región ya está valorada en cerca de R$800/m². Uno de los terrenos más espectaculares de Pipa, con vista panorámica en una de las áreas más valorizadas de la región — oportunidad única para quien compre el área completa, con gran potencial para hotelería, posadas o un emprendimiento turístico de alto nivel.',
    descriptionIt:
      "Un'opportunità incredibile: terreno a R$544 al metro quadrato, mentre la zona è già valutata a circa R$800/m². Uno dei terreni più spettacolari di Pipa, con vista panoramica in una delle aree più ambite della regione — un'occasione unica per chi acquista l'intero lotto, con grande potenziale per un hotel boutique, una pousada o un progetto turistico di alto livello.",
    descriptionFr:
      "Une opportunité incroyable : terrain à R$544 le mètre carré, alors que la région est déjà estimée à environ R$800/m². L'un des terrains les plus spectaculaires de Pipa, avec une vue panoramique dans l'une des zones les plus prisées de la région — une occasion unique pour qui achète la totalité du terrain, avec un fort potentiel pour un hôtel boutique, une pousada ou un projet touristique haut de gamme.",
    photos: Array.from({ length: 8 }, (_, i) => ({
      src: `/images/imoveis/terreno-praia-do-amor-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'terreno-praia-das-minas-pipa',
    title: 'Terreno Praia das Minas',
    city: 'Praia da Pipa',
    type: 'Terreno',
    featured: true,
    area: 'A partir de 300 m² (área total 14.200 m²)',
    priceValue: null,
    priceLabel: 'R$ 300/m² (a partir de 300 m²)',
    pricePerM2Label: 'R$ 300/m²',
    description:
      'Terreno Praia das Minas, com vista para o mar — possibilidade de desmembramento em lotes a partir de 300 m², R$ 300 por metro quadrado.',
    descriptionEn:
      'Praia das Minas land, with ocean views — can be subdivided into lots starting at 300 m², R$300 per square meter.',
    descriptionEs:
      'Terreno Praia das Minas, con vista al mar — posibilidad de desmembramiento en lotes a partir de 300 m², R$300 por metro cuadrado.',
    descriptionIt:
      'Terreno Praia das Minas, con vista sul mare — possibilità di suddivisione in lotti a partire da 300 m², R$300 al metro quadrato.',
    descriptionFr:
      'Terrain Praia das Minas, avec vue sur la mer — possibilité de division en lots à partir de 300 m², R$300 le mètre carré.',
    photos: Array.from({ length: 6 }, (_, i) => ({
      src: `/images/imoveis/terreno-praia-das-minas-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'terreno-rua-das-pedrinhas-pipa',
    title: 'Terreno para desmembramento — Rua das Pedrinhas',
    city: 'Praia da Pipa',
    type: 'Terreno',
    featured: true,
    area: 'A partir de 300 m² (área total 49.515 m², perímetro 518 m)',
    priceValue: null,
    priceLabel: 'R$ 150/m² (a partir de 300 m²)',
    pricePerM2Label: 'R$ 150/m²',
    description:
      'Terreno localizado entre as falésias de Sibaúma e a Rua das Pedrinhas, em uma área com enorme potencial de crescimento — as ruas da região já foram aprovadas e os acessos estão sendo abertos. Possibilidade de desmembramento em lotes a partir de 300 m², R$ 150 por metro quadrado.',
    descriptionEn:
      'Land located between the Sibaúma cliffs and Rua das Pedrinhas, in an area with enormous growth potential — the streets have already been approved and access roads are being opened. Can be subdivided into lots starting at 300 m², R$150 per square meter.',
    descriptionEs:
      'Terreno ubicado entre los acantilados de Sibaúma y la Rua das Pedrinhas, en una zona con enorme potencial de crecimiento — las calles de la región ya fueron aprobadas y los accesos están siendo abiertos. Posibilidad de desmembramiento en lotes a partir de 300 m², R$150 por metro cuadrado.',
    descriptionIt:
      'Terreno situato tra le scogliere di Sibaúma e Rua das Pedrinhas, in una zona con enorme potenziale di crescita — le strade della zona sono già state approvate e gli accessi sono in fase di apertura. Possibilità di suddivisione in lotti a partire da 300 m², R$150 al metro quadrato.',
    descriptionFr:
      "Terrain situé entre les falaises de Sibaúma et la Rua das Pedrinhas, dans une zone au potentiel de croissance énorme — les rues du quartier ont déjà été approuvées et les accès sont en cours d'ouverture. Possibilité de division en lots à partir de 300 m², R$150 le mètre carré.",
    photos: Array.from({ length: 6 }, (_, i) => ({
      src: `/images/imoveis/terreno-rua-das-pedrinhas-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'casa-cruzeiro-do-sul-pipa',
    title: 'Casa na Rua Cruzeiro do Sul',
    city: 'Praia da Pipa',
    type: 'Venda',
    featured: true,
    area: 'Terreno de 500 m² · 200 m² construídos',
    priceValue: 700000,
    priceLabel: 'R$ 700.000',
    priceOriginal: 'R$ 850.000',
    highlight: 'Oportunidade única — a 5 minutos da praia, do centro e do Chapadão',
    highlightEn: 'A unique opportunity — 5 minutes from the beach, downtown and Chapadão',
    highlightEs: 'Una oportunidad única — a 5 minutos de la playa, del centro y del Chapadão',
    highlightIt: "Un'opportunità unica — a 5 minuti dalla spiaggia, dal centro e dal Chapadão",
    highlightFr: 'Une opportunité unique — à 5 minutes de la plage, du centre-ville et du Chapadão',
    description:
      'Três possibilidades de negócio na Praia de Pipa: venda, aluguel com opção de compra ou aluguel anual comercial — ideal para pousada, hostel ou hotel boutique.\n\n📍 Localização privilegiada: a 5 minutos a pé da Praia do Amor, do centro e dos supermercados (Rua Cruzeiro do Sul, caminho 2 – Chapadão, em frente à pousada Kokoro).\n\n• Terreno de 500 m² · 200 m² construídos\n• Capacidade para hospedar de 15 a 20 pessoas\n• Casa principal com varanda de aprox. 50 m², salão comedor amplo, cozinha, lavanderia, depósito, banheiro social e 2 quartos amplos com armários de obra e chuveiro de água quente\n• Apartamento independente no lateral, com varanda própria, sala espaçosa e suíte principal\n\nModalidades:\n• Venda direta: de R$ 850.000 por R$ 700.000 (oportunidade única), com escritura particular\n• Aluguel com opção de compra: R$ 5.500/mês + garantia equivalente a 3 meses\n• Aluguel anual comercial: ideal para pousada, hostel ou hotel boutique',
    descriptionEn:
      'Three ways to do business in Pipa Beach: outright sale, rent-to-own, or an annual commercial lease — ideal for a pousada, hostel or boutique hotel.\n\n📍 Prime location: a 5-minute walk from Praia do Amor, downtown and the supermarkets (Rua Cruzeiro do Sul, Caminho 2 – Chapadão, across from Pousada Kokoro).\n\n• 500 m² lot · 200 m² built\n• Sleeps 15–20 guests\n• Main house with a ~50 m² veranda, a large dining/living room, kitchen, laundry room, storage room, guest bathroom and 2 large bedrooms with built-in closets and hot-water showers\n• Independent side apartment with its own veranda, a spacious living room and a master suite\n\nOptions:\n• Outright sale: reduced from R$850,000 to R$700,000 (unique opportunity), with private deed\n• Rent-to-own: R$5,500/month + a deposit equal to 3 months\' rent\n• Annual commercial lease: ideal for a pousada, hostel or boutique hotel',
    descriptionEs:
      'Tres posibilidades de negocio en la Playa de Pipa: venta, alquiler con opción de compra o alquiler anual comercial — ideal para posada, hostel u hotel boutique.\n\n📍 Ubicación privilegiada: a 5 minutos a pie de la Playa do Amor, del centro y de los supermercados (Rua Cruzeiro do Sul, camino 2 – Chapadão, frente a la posada Kokoro).\n\n• Terreno de 500 m² · 200 m² construidos\n• Capacidad para hospedar de 15 a 20 personas\n• Casa principal con balcón de aprox. 50 m², amplio comedor, cocina, lavandería, depósito, baño social y 2 habitaciones amplias con armarios empotrados y ducha de agua caliente\n• Apartamento independiente lateral, con balcón propio, sala espaciosa y suite principal\n\nModalidades:\n• Venta directa: de R$850.000 por R$700.000 (oportunidad única), con escritura privada\n• Alquiler con opción de compra: R$5.500/mes + garantía equivalente a 3 meses\n• Alquiler anual comercial: ideal para posada, hostel u hotel boutique',
    descriptionIt:
      "Tre possibilità di affare a Pipa Beach: vendita diretta, affitto con opzione d'acquisto o affitto annuale commerciale — ideale per pousada, ostello o hotel boutique.\n\n📍 Posizione privilegiata: a 5 minuti a piedi dalla spiaggia di Praia do Amor, dal centro e dai supermercati (Rua Cruzeiro do Sul, Caminho 2 – Chapadão, di fronte alla Pousada Kokoro).\n\n• Terreno di 500 m² · 200 m² costruiti\n• Capacità per 15-20 ospiti\n• Casa principale con veranda di circa 50 m², ampia sala da pranzo, cucina, lavanderia, deposito, bagno di cortesia e 2 ampie camere con armadi a muro e doccia con acqua calda\n• Appartamento indipendente laterale, con veranda propria, soggiorno spazioso e suite principale\n\nOpzioni:\n• Vendita diretta: da R$850.000 a R$700.000 (opportunità unica), con atto privato\n• Affitto con opzione d'acquisto: R$5.500/mese + deposito cauzionale pari a 3 mesi\n• Affitto annuale commerciale: ideale per pousada, ostello o hotel boutique",
    descriptionFr:
      "Trois façons de faire affaire à Pipa Beach : vente directe, location avec option d'achat, ou bail commercial annuel — idéal pour une pousada, une auberge ou un hôtel boutique.\n\n📍 Emplacement privilégié : à 5 minutes à pied de la plage Praia do Amor, du centre-ville et des supermarchés (Rua Cruzeiro do Sul, Caminho 2 – Chapadão, en face de la Pousada Kokoro).\n\n• Terrain de 500 m² · 200 m² construits\n• Capacité de 15 à 20 personnes\n• Maison principale avec véranda d'environ 50 m², grande salle à manger, cuisine, buanderie, débarras, toilettes invités et 2 grandes chambres avec placards intégrés et douche à eau chaude\n• Appartement indépendant attenant, avec sa propre véranda, un salon spacieux et une suite principale\n\nOptions :\n• Vente directe : de R$850 000 à R$700 000 (opportunité unique), avec acte sous seing privé\n• Location avec option d'achat : R$5 500/mois + dépôt de garantie équivalent à 3 mois\n• Bail commercial annuel : idéal pour une pousada, une auberge ou un hôtel boutique",
    photos: Array.from({ length: 12 }, (_, i) => ({
      src: `/images/imoveis/casa-cruzeiro-do-sul-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'cobertura-tirol-natal',
    title: 'Cobertura duplex no Tirol',
    city: 'Natal',
    type: 'Venda',
    area: 'Cobertura duplex · consulte metragem',
    priceValue: null,
    priceLabel: 'Sob consulta',
    description:
      'Excelente oportunidade para quem busca um imóvel amplo e muito bem localizado em Natal, colado ao Hospital São Lucas.\n\n1º andar:\n• Pequeno hall de entrada e escada\n• Sala de estar\n• Sala de jantar\n• Lavabo\n• Suíte (quarto e banheiro grande)\n• Cozinha grande\n• Dispensa\n• Área de serviço com banheiro e quarto para funcionária(o)\n\n2º andar:\n• Sala grande\n• Suíte principal (quarto de casal grande com banheiro)\n• 2 suítes\n• 1 escritório\n• 1 corredor\n• Varanda bem ampla\n\nTranquilo para morar e perto de tudo: hospital ao lado, clínicas, escolas, supermercados, shoppings e teatros (o TAM e o do Midway).',
    descriptionEn:
      'A great opportunity for anyone looking for a spacious, very well-located property in Natal, right next to São Lucas Hospital.\n\n1st floor:\n• Small entrance hall and staircase\n• Living room\n• Dining room\n• Guest bathroom\n• Suite (large bedroom and bathroom)\n• Large kitchen\n• Pantry\n• Service area with bathroom and staff bedroom\n\n2nd floor:\n• Large living room\n• Master suite (large bedroom with bathroom)\n• 2 suites\n• 1 office\n• 1 hallway\n• Very large balcony\n\nQuiet, and close to everything: hospital next door, clinics, schools, supermarkets, malls and movie theaters.',
    descriptionEs:
      'Excelente oportunidad para quien busca un inmueble amplio y muy bien ubicado en Natal, pegado al Hospital São Lucas.\n\n1er piso:\n• Pequeño hall de entrada y escalera\n• Sala de estar\n• Comedor\n• Lavabo\n• Suite (habitación y baño grande)\n• Cocina grande\n• Despensa\n• Área de servicio con baño y habitación para empleada(o)\n\n2do piso:\n• Sala grande\n• Suite principal (habitación doble grande con baño)\n• 2 suites\n• 1 oficina\n• 1 pasillo\n• Balcón muy amplio\n\nTranquilo para vivir y cerca de todo: hospital al lado, clínicas, colegios, supermercados, centros comerciales y cines (el TAM y el de Midway).',
    descriptionIt:
      "Un'ottima opportunità per chi cerca un immobile ampio e ben posizionato a Natal, accanto all'Ospedale São Lucas.\n\n1° piano:\n• Piccolo ingresso e scala\n• Soggiorno\n• Sala da pranzo\n• Bagno di cortesia\n• Suite (camera e bagno grande)\n• Cucina grande\n• Dispensa\n• Area di servizio con bagno e camera per collaboratrice/ore domestica\n\n2° piano:\n• Ampio soggiorno\n• Suite principale (camera matrimoniale grande con bagno)\n• 2 suite\n• 1 studio\n• 1 corridoio\n• Terrazzo molto ampio\n\nTranquillo e vicino a tutto: ospedale accanto, cliniche, scuole, supermercati, centri commerciali e cinema (il TAM e quello di Midway).",
    descriptionFr:
      "Une excellente opportunité pour qui cherche un bien spacieux et très bien situé à Natal, juste à côté de l'hôpital São Lucas.\n\n1er étage :\n• Petit hall d'entrée et escalier\n• Salon\n• Salle à manger\n• Toilettes invités\n• Suite (chambre et grande salle de bain)\n• Grande cuisine\n• Garde-manger\n• Zone de service avec salle de bain et chambre pour employée(é)\n\n2e étage :\n• Grand salon\n• Suite principale (grande chambre avec salle de bain)\n• 2 suites\n• 1 bureau\n• 1 couloir\n• Très grand balcon\n\nCalme et proche de tout : hôpital juste à côté, cliniques, écoles, supermarchés, centres commerciaux et cinémas (le TAM et celui de Midway).",
    photos: Array.from({ length: 22 }, (_, i) => ({
      src: `/images/imoveis/cobertura-tirol-natal-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'terreno-pipa-boulevard',
    title: 'Terreno no Pipa Boulevard',
    city: 'Praia da Pipa',
    type: 'Terreno',
    area: '300 m² (12x25 m)',
    priceValue: 75000,
    priceLabel: 'R$ 75.000 (repasse)',
    description:
      'Terreno plano em condomínio seguro e em crescimento, a poucos minutos da Praia do Madeiro — famosa pelo surf — e da Praia da Pipa. Valor de repasse — o comprador assume as parcelas restantes (85x R$ 1.027).',
    descriptionEn:
      'Flat lot in a secure, growing gated community, just minutes from Praia do Madeiro — famous for surfing — and from Pipa beach. Transfer price — buyer takes over the remaining installments (85 x R$1,027).',
    descriptionEs:
      'Terreno plano en condominio seguro y en crecimiento, a pocos minutos de la Playa de Madeiro — famosa por el surf — y de la Playa de Pipa. Valor de traspaso — el comprador asume las cuotas restantes (85x R$1.027).',
    descriptionIt:
      'Terreno pianeggiante in un condominio sicuro e in crescita, a pochi minuti dalla spiaggia di Madeiro — famosa per il surf — e dalla spiaggia di Pipa. Prezzo di subentro — l\'acquirente si assume le rate restanti (85 x R$1.027).',
    descriptionFr:
      "Terrain plat dans une résidence sécurisée et en pleine croissance, à quelques minutes de la plage de Madeiro — célèbre pour le surf — et de la plage de Pipa. Prix de reprise — l'acheteur reprend les mensualités restantes (85 x R$1 027).",
    photos: Array.from({ length: 3 }, (_, i) => ({
      src: `/images/imoveis/terreno-pipa-boulevard-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'terreno-rua-condor-pipa',
    title: 'Terreno na Rua Condor',
    city: 'Praia da Pipa',
    type: 'Terreno',
    area: '282 m²',
    priceValue: 240000,
    priceLabel: 'R$ 240.000',
    pricePerM2Label: 'R$ 851/m²',
    description: 'Terreno bem localizado na Rua Condor, pronto para construir.',
    descriptionEn: 'Well-located lot on Rua Condor, ready to build on.',
    descriptionEs: 'Terreno bien ubicado en la Rua Condor, listo para construir.',
    descriptionIt: 'Terreno ben posizionato in Rua Condor, pronto per costruire.',
    descriptionFr: 'Terrain bien situé sur la Rua Condor, prêt à construire.',
    photos: Array.from({ length: 3 }, (_, i) => ({
      src: `/images/imoveis/terreno-rua-condor-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'terreno-rua-cancela-pipa',
    title: 'Terreno na Travessa Rua da Cancela',
    city: 'Praia da Pipa',
    type: 'Terreno',
    area: '372,6 m²',
    priceValue: 223560,
    priceLabel: 'R$ 600/m² (R$ 223.560 total)',
    pricePerM2Label: 'R$ 600/m²',
    description:
      'Terreno com escritura pública na Travessa Rua da Cancela, em uma zona de alto crescimento de Pipa — cada vez mais procurada por quem quer construir perto da natureza, com fácil acesso ao centro e às praias.',
    descriptionEn:
      'Titled land (public deed) on Travessa Rua da Cancela, in a fast-growing part of Pipa — increasingly sought after by those who want to build close to nature, with easy access to downtown and the beaches.',
    descriptionEs:
      'Terreno con escritura pública en la Travessa Rua da Cancela, en una zona de alto crecimiento de Pipa — cada vez más buscada por quienes quieren construir cerca de la naturaleza, con fácil acceso al centro y a las playas.',
    descriptionIt:
      'Terreno con atto pubblico in Travessa Rua da Cancela, in una zona di Pipa in forte crescita — sempre più richiesta da chi vuole costruire vicino alla natura, con facile accesso al centro e alle spiagge.',
    descriptionFr:
      "Terrain avec acte notarié sur la Travessa Rua da Cancela, dans une zone de Pipa en forte croissance — de plus en plus recherchée par ceux qui souhaitent construire près de la nature, avec un accès facile au centre-ville et aux plages.",
    photos: Array.from({ length: 3 }, (_, i) => ({
      src: `/images/imoveis/terreno-rua-cancela-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'terreno-rua-camboim',
    title: 'Terreno na Rua Camboim',
    city: 'Praia da Pipa',
    type: 'Terreno',
    area: '390 m² (11x36 m) · rua na frente e rua atrás',
    priceValue: 160000,
    priceLabel: 'R$ 160.000',
    pricePerM2Label: 'R$ 410/m²',
    description: 'Terreno na Rua Camboim, com rua na frente e rua atrás.',
    descriptionEn: 'Land on Rua Camboim, with street access on both the front and back.',
    descriptionEs: 'Terreno en la Rua Camboim, con calle al frente y calle atrás.',
    descriptionIt: 'Terreno in Rua Camboim, con strada sul fronte e sul retro.',
    descriptionFr: "Terrain sur la Rua Camboim, avec rue à l'avant et à l'arrière.",
    photos: Array.from({ length: 2 }, (_, i) => ({
      src: `/images/imoveis/terreno-rua-camboim-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'terreno-sibauma',
    title: 'Terreno em Sibaúma',
    city: 'Sibaúma',
    type: 'Terreno',
    area: '33.000 m²',
    priceValue: 4950000,
    priceLabel: 'R$ 4.950.000',
    pricePerM2Label: 'R$ 150/m²',
    description:
      'Terreno exclusivo para projetos extraordinários em Sibaúma, Tibau do Sul/RN.\n\n• Área total: 33.000 m²\n• Documentação 100% regularizada\n• Localização privilegiada\n• Natureza exuberante\n• Fácil acesso e ótima topografia\n• Alto potencial de valorização\n\nAcesso pela Estrada de Sibaúma. Invista em qualidade de vida e rentabilidade.',
    descriptionEn:
      'Exclusive land for extraordinary projects in Sibaúma, Tibau do Sul/RN.\n\n• Total area: 33,000 m²\n• 100% clear title\n• Prime location\n• Lush natural surroundings\n• Easy access and excellent topography\n• High potential for appreciation\n\nAccess via Estrada de Sibaúma. Invest in quality of life and return.',
    descriptionEs:
      'Terreno exclusivo para proyectos extraordinarios en Sibaúma, Tibau do Sul/RN.\n\n• Área total: 33.000 m²\n• Documentación 100% regularizada\n• Ubicación privilegiada\n• Naturaleza exuberante\n• Fácil acceso y excelente topografía\n• Alto potencial de valorización\n\nAcceso por la Estrada de Sibaúma. Invierta en calidad de vida y rentabilidad.',
    descriptionIt:
      'Terreno esclusivo per progetti straordinari a Sibaúma, Tibau do Sul/RN.\n\n• Area totale: 33.000 m²\n• Documentazione 100% in regola\n• Posizione privilegiata\n• Natura rigogliosa\n• Facile accesso e ottima topografia\n• Alto potenziale di valorizzazione\n\nAccesso tramite Estrada de Sibaúma. Investi in qualità della vita e redditività.',
    descriptionFr:
      "Terrain exclusif pour des projets extraordinaires à Sibaúma, Tibau do Sul/RN.\n\n• Surface totale : 33 000 m²\n• Documentation 100 % en règle\n• Emplacement privilégié\n• Nature luxuriante\n• Accès facile et excellente topographie\n• Fort potentiel de valorisation\n\nAccès par l'Estrada de Sibaúma. Investissez dans la qualité de vie et la rentabilité.",
    photos: Array.from({ length: 1 }, (_, i) => ({
      src: `/images/imoveis/terreno-sibauma-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'terreno-lagoa-guarairas-tibau-do-sul',
    title: 'Casa e Terreno — Lagoa de Guaraíras',
    city: 'Tibau do Sul',
    type: 'Venda',
    area: '5.375 m² (120 m de frente para a lagoa) · casa de aprox. 120 m²',
    priceValue: 4350000,
    priceLabel: 'R$ 4.350.000 (preço rebaixado)',
    description:
      'Terreno exclusivo à beira da Lagoa de Guaraíras — uma oportunidade única para investir em um dos cenários mais privilegiados do litoral potiguar. 5.375 m² de terreno com 120 metros de frente para a lagoa, em área sem falésia, cercada pela natureza, com grande potencial para projetos turísticos, residenciais ou um refúgio particular.\n\n📍 Localização: a aproximadamente 1 km da vila de Tibau do Sul e a apenas 6 km da Praia da Pipa.\n\n🏡 Estrutura já existente:\n• Casa de aproximadamente 120 m², com 1 suíte, 1 quarto, banheiro, sala, cozinha, varanda e piscina\n• Cozinha independente\n• Banheiro adicional\n• Área de serviço com banheiro e 2 depósitos\n• Caixa d’água e cisterna\n• Fossa ecológica\n• Poço artesiano com bomba\n• Estacionamento\n\n📑 Documentação: escritura pública de usucapião, matrícula nº 3199 — Cartório de Tibau do Sul. Área total de 5.375 m², incluindo aproximadamente 3.172 m² de área de marinha.\n\nPreço rebaixado!',
    descriptionEn:
      'Exclusive land right on the shore of the Lagoa de Guaraíras — a rare opportunity to invest in one of the most privileged settings on the Rio Grande do Norte coast. 5,375 m² of land with 120 meters of lagoon frontage, on a cliff-free lot surrounded by nature, with strong potential for tourism, residential or private-retreat projects.\n\n📍 Location: about 1 km from the village of Tibau do Sul and just 6 km from Pipa beach.\n\n🏡 Existing structure:\n• House of approximately 120 m², with 1 suite, 1 bedroom, bathroom, living room, kitchen, veranda and pool\n• Separate kitchen\n• Additional bathroom\n• Service area with bathroom and 2 storage rooms\n• Water tank and cistern\n• Eco-friendly septic system\n• Artesian well with pump\n• Parking\n\n📑 Documentation: public deed by adverse possession (usucapião), registration No. 3199 — Tibau do Sul Notary Office. Total area of 5,375 m², including approximately 3,172 m² of marinha (public shoreline) land.\n\nPrice reduced!',
    descriptionEs:
      'Terreno exclusivo a orillas de la Laguna de Guaraíras — una oportunidad única para invertir en uno de los escenarios más privilegiados del litoral de Rio Grande do Norte. 5.375 m² de terreno con 120 metros de frente a la laguna, en zona sin acantilado, rodeada de naturaleza, con gran potencial para proyectos turísticos, residenciales o un refugio particular.\n\n📍 Ubicación: a aproximadamente 1 km de la villa de Tibau do Sul y a solo 6 km de la Playa de Pipa.\n\n🏡 Estructura ya existente:\n• Casa de aproximadamente 120 m², con 1 suite, 1 habitación, baño, sala, cocina, balcón y piscina\n• Cocina independiente\n• Baño adicional\n• Área de servicio con baño y 2 depósitos\n• Tanque de agua y cisterna\n• Fosa ecológica\n• Pozo artesiano con bomba\n• Estacionamiento\n\n📑 Documentación: escritura pública de usucapión, matrícula n.º 3199 — Registro de Tibau do Sul. Área total de 5.375 m², incluyendo aproximadamente 3.172 m² de área de marina.\n\n¡Precio rebajado!',
    descriptionIt:
      "Terreno esclusivo sulle rive della Laguna di Guaraíras — un'occasione rara per investire in uno degli scenari più privilegiati della costa di Rio Grande do Norte. 5.375 m² di terreno con 120 metri di fronte sulla laguna, in zona senza scogliera, circondata dalla natura, con grande potenziale per progetti turistici, residenziali o un rifugio privato.\n\n📍 Posizione: a circa 1 km dal villaggio di Tibau do Sul e a soli 6 km dalla spiaggia di Pipa.\n\n🏡 Struttura già esistente:\n• Casa di circa 120 m², con 1 suite, 1 camera, bagno, soggiorno, cucina, veranda e piscina\n• Cucina indipendente\n• Bagno aggiuntivo\n• Area di servizio con bagno e 2 depositi\n• Serbatoio d'acqua e cisterna\n• Fossa settica ecologica\n• Pozzo artesiano con pompa\n• Parcheggio\n\n📑 Documentazione: atto pubblico per usucapione, matricola n. 3199 — Ufficio del registro di Tibau do Sul. Area totale di 5.375 m², di cui circa 3.172 m² di area demaniale costiera (marinha).\n\nPrezzo ribassato!",
    descriptionFr:
      "Terrain exclusif au bord de la Lagoa de Guaraíras — une occasion rare d'investir dans l'un des cadres les plus privilégiés du littoral de Rio Grande do Norte. 5 375 m² de terrain avec 120 mètres de façade sur la lagune, sur un terrain sans falaise, entouré de nature, avec un fort potentiel pour des projets touristiques, résidentiels ou une retraite privée.\n\n📍 Emplacement : à environ 1 km du village de Tibau do Sul et à seulement 6 km de la plage de Pipa.\n\n🏡 Structure déjà existante :\n• Maison d'environ 120 m², avec 1 suite, 1 chambre, salle de bain, salon, cuisine, véranda et piscine\n• Cuisine indépendante\n• Salle de bain supplémentaire\n• Zone de service avec salle de bain et 2 débarras\n• Réservoir d'eau et citerne\n• Fosse septique écologique\n• Puits artésien avec pompe\n• Parking\n\n📑 Documentation : acte public d'usucapion, matricule n° 3199 — Office notarial de Tibau do Sul. Surface totale de 5 375 m², dont environ 3 172 m² de domaine public maritime (marinha).\n\nPrix réduit !",
    photos: Array.from({ length: 13 }, (_, i) => ({
      src: `/images/imoveis/terreno-lagoa-guarairas-tibau-do-sul-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'terreno-munim-tibau-do-sul',
    title: 'Terreno no Munim',
    city: 'Tibau do Sul',
    type: 'Terreno',
    area: '19,55 hectares · vista para a Lagoa de Guaraíras',
    priceValue: 4500000,
    priceLabel: 'R$ 4.500.000',
    description:
      'Área exclusiva para desenvolvimento imobiliário em Munim, Tibau do Sul/RN — uma oportunidade única para investidores e incorporadores que procuram uma área ampla, estratégica e com vista privilegiada para a Lagoa de Guaraíras.\n\n• Vista privilegiada para a Lagoa de Guaraíras\n• Região de natureza exuberante, próxima às praias e aos principais destinos turísticos do litoral sul do RN\n• Área total aproximada: 19,55 hectares\n• Potencial para loteamento e desenvolvimento imobiliário\n• Acesso por estrada\n• Localização estratégica entre áreas de expansão e pontos turísticos da região\n\nA propriedade está dividida em duas áreas, permitindo avaliar diferentes possibilidades de implantação e ocupação do empreendimento. Ideal para incorporadoras, investidores, desenvolvedores imobiliários e grupos interessados em projetos residenciais ou turísticos.',
    descriptionEn:
      'Exclusive area for real estate development in Munim, Tibau do Sul/RN — a unique opportunity for investors and developers looking for a large, strategically located plot with a privileged view of the Lagoa de Guaraíras.\n\n• Privileged view of the Lagoa de Guaraíras\n• Lush natural surroundings, close to the beaches and main tourist destinations of the southern RN coast\n• Approximate total area: 19.55 hectares (about 48 acres)\n• Potential for subdivision and real estate development\n• Road access\n• Strategic location between expansion areas and key tourist spots\n\nThe property is divided into two areas, allowing for different layout and development options. Ideal for developers, investors and groups interested in residential or tourism projects.',
    descriptionEs:
      'Área exclusiva para desarrollo inmobiliario en Munim, Tibau do Sul/RN — una oportunidad única para inversores y promotores que buscan un área amplia, estratégica y con vista privilegiada a la Laguna de Guaraíras.\n\n• Vista privilegiada a la Laguna de Guaraíras\n• Región de naturaleza exuberante, cerca de las playas y de los principales destinos turísticos del litoral sur de RN\n• Área total aproximada: 19,55 hectáreas\n• Potencial para loteo y desarrollo inmobiliario\n• Acceso por carretera\n• Ubicación estratégica entre áreas de expansión y puntos turísticos de la región\n\nLa propiedad está dividida en dos áreas, lo que permite evaluar diferentes posibilidades de implementación y ocupación del emprendimiento. Ideal para promotoras, inversores, desarrolladores inmobiliarios y grupos interesados en proyectos residenciales o turísticos.',
    descriptionIt:
      "Area esclusiva per lo sviluppo immobiliare a Munim, Tibau do Sul/RN — un'opportunità unica per investitori e sviluppatori alla ricerca di un'area ampia, strategica e con vista privilegiata sulla Laguna di Guaraíras.\n\n• Vista privilegiata sulla Laguna di Guaraíras\n• Zona dalla natura rigogliosa, vicina alle spiagge e alle principali mete turistiche della costa sud del RN\n• Area totale approssimativa: 19,55 ettari\n• Potenziale per lottizzazione e sviluppo immobiliare\n• Accesso stradale\n• Posizione strategica tra aree di espansione e punti turistici della regione\n\nLa proprietà è divisa in due aree, il che consente di valutare diverse possibilità di disposizione e occupazione del progetto. Ideale per sviluppatori, investitori e gruppi interessati a progetti residenziali o turistici.",
    descriptionFr:
      "Zone exclusive pour le développement immobilier à Munim, Tibau do Sul/RN — une opportunité unique pour les investisseurs et promoteurs à la recherche d'un vaste terrain, stratégique, avec une vue privilégiée sur la Lagoa de Guaraíras.\n\n• Vue privilégiée sur la Lagoa de Guaraíras\n• Région à la nature luxuriante, proche des plages et des principales destinations touristiques du littoral sud du RN\n• Surface totale approximative : 19,55 hectares\n• Potentiel de lotissement et de développement immobilier\n• Accès routier\n• Emplacement stratégique entre zones d'expansion et sites touristiques de la région\n\nLa propriété est divisée en deux zones, ce qui permet d'évaluer différentes possibilités d'aménagement et d'occupation du projet. Idéal pour les promoteurs, investisseurs et groupes intéressés par des projets résidentiels ou touristiques.",
    photos: Array.from({ length: 7 }, (_, i) => ({
      src: `/images/imoveis/terreno-munim-tibau-do-sul-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'terreno-rua-sorocaba-pipa',
    title: 'Terreno na Rua Sorocaba',
    city: 'Praia da Pipa',
    type: 'Terreno',
    area: '200 m² (10x20 m)',
    priceValue: 25000,
    priceLabel: 'R$ 25.000',
    pricePerM2Label: 'R$ 125/m²',
    description:
      'Terreno de 200 m² (10x20 m) na Rua Sorocaba, em ótima localização e bem pertinho da praia — oportunidade de venda rápida.\n\n• Ótima localização\n• Pertinho da praia\n• Documentação em dia\n• Ideal para investimento ou moradia\n\nSeu espaço na Pipa, agora é possível!',
    descriptionEn:
      '200 m² lot (10x20 m) on Rua Sorocaba, in a great location just steps from the beach — a quick-sale opportunity.\n\n• Great location\n• Close to the beach\n• Up-to-date paperwork\n• Ideal for investment or building a home\n\nYour own spot in Pipa, now within reach.',
    descriptionEs:
      'Terreno de 200 m² (10x20 m) en la Rua Sorocaba, en muy buena ubicación y muy cerca de la playa — oportunidad de venta rápida.\n\n• Excelente ubicación\n• Muy cerca de la playa\n• Documentación al día\n• Ideal para inversión o para construir tu vivienda\n\n¡Tu espacio en Pipa, ahora es posible!',
    descriptionIt:
      "Terreno di 200 m² (10x20 m) in Rua Sorocaba, in un'ottima posizione e vicinissimo alla spiaggia — un'opportunità di vendita rapida.\n\n• Ottima posizione\n• Vicino alla spiaggia\n• Documentazione in regola\n• Ideale per investimento o per costruire casa\n\nIl tuo spazio a Pipa, ora è possibile!",
    descriptionFr:
      "Terrain de 200 m² (10x20 m) sur la Rua Sorocaba, très bien situé et tout proche de la plage — une opportunité de vente rapide.\n\n• Excellent emplacement\n• Tout proche de la plage\n• Documents à jour\n• Idéal pour investir ou construire votre maison\n\nVotre coin de paradis à Pipa, c'est maintenant possible !",
    photos: Array.from({ length: 2 }, (_, i) => ({
      src: `/images/imoveis/terreno-rua-sorocaba-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'terreno-rua-harmonia-pipa',
    title: 'Terreno na Rua Harmonia',
    city: 'Praia da Pipa',
    type: 'Terreno',
    area: 'Lotes — consulte a metragem',
    priceValue: null,
    priceLabel: 'A partir de R$ 500/m²',
    pricePerM2Label: 'R$ 500/m²',
    description:
      'Lotes na Rua Harmonia, em Praia da Pipa, a partir de R$ 500 por metro quadrado — rua calçada, com água e luz.\n\n• Lotes a partir de R$ 500/m²\n• Rua calçada, com água e luz\n\nFale com a gente para saber metragens e disponibilidade.',
    descriptionEn:
      'Lots on Rua Harmonia, in Pipa Beach, starting at R$500 per square meter — paved street, with water and electricity.\n\n• Lots from R$500/m²\n• Paved street, with water and electricity\n\nGet in touch for lot sizes and availability.',
    descriptionEs:
      'Lotes en la Rua Harmonia, en la Playa de Pipa, desde R$500 por metro cuadrado — calle pavimentada, con agua y luz.\n\n• Lotes desde R$500/m²\n• Calle pavimentada, con agua y luz\n\nContáctanos para conocer metrajes y disponibilidad.',
    descriptionIt:
      'Lotti in Rua Harmonia, a Pipa Beach, a partire da R$500 al metro quadrato — strada pavimentata, con acqua ed elettricità.\n\n• Lotti da R$500/m²\n• Strada pavimentata, con acqua ed elettricità\n\nContattaci per metrature e disponibilità.',
    descriptionFr:
      "Lots sur la Rua Harmonia, à Pipa Beach, à partir de R$500 le mètre carré — rue pavée, avec eau et électricité.\n\n• Lots à partir de R$500/m²\n• Rue pavée, avec eau et électricité\n\nContactez-nous pour les surfaces et la disponibilité.",
    photos: Array.from({ length: 3 }, (_, i) => ({
      src: `/images/imoveis/terreno-rua-harmonia-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'terreno-venda-rapida-pipa',
    title: 'Terreno para venda rápida',
    city: 'Praia da Pipa',
    type: 'Terreno',
    area: '372,6 m²',
    priceValue: 186000,
    priceLabel: 'R$ 186.000',
    pricePerM2Label: 'R$ 499/m²',
    description:
      'Terreno de 372,6 m² em Praia da Pipa, com escritura pública — venda rápida.\n\n• Escritura pública\n• 372,6 m² de área total\n• Pronto para negociar\n\nFale com a gente para mais detalhes sobre a localização exata.',
    descriptionEn:
      '372.6 m² lot in Pipa Beach, with public deed — quick sale.\n\n• Public deed\n• 372.6 m² total area\n• Ready to negotiate\n\nGet in touch for the exact location and more details.',
    descriptionEs:
      'Terreno de 372,6 m² en la Playa de Pipa, con escritura pública — venta rápida.\n\n• Escritura pública\n• 372,6 m² de área total\n• Listo para negociar\n\nContáctanos para conocer la ubicación exacta y más detalles.',
    descriptionIt:
      'Terreno di 372,6 m² a Pipa Beach, con atto pubblico — vendita rapida.\n\n• Atto pubblico\n• 372,6 m² di area totale\n• Pronto per trattare\n\nContattaci per la posizione esatta e altri dettagli.',
    descriptionFr:
      "Terrain de 372,6 m² à Pipa Beach, avec acte notarié — vente rapide.\n\n• Acte notarié\n• 372,6 m² de surface totale\n• Prêt à négocier\n\nContactez-nous pour connaître l'emplacement exact et plus de détails.",
    photos: Array.from({ length: 1 }, (_, i) => ({
      src: `/images/imoveis/terreno-venda-rapida-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'triplex-condominio-fechado-pipa',
    title: 'Triplex em condomínio fechado',
    city: 'Praia da Pipa',
    type: 'Venda',
    area: 'Triplex · consulte metragem',
    priceValue: 800000,
    priceLabel: 'R$ 800.000',
    description:
      'Triplex completo em condomínio fechado, com suíte, quarto para hóspedes, espaço gourmet com capacidade para 10 pessoas, hidromassagem na cobertura e ar-condicionado em todos os ambientes principais.',
    descriptionEn:
      'Complete triplex in a gated community, with a suite, guest bedroom, a gourmet area seating up to 10 people, a rooftop jacuzzi and air conditioning throughout the main rooms.',
    descriptionEs:
      'Triplex completo en condominio cerrado, con suite, habitación para huéspedes, espacio gourmet con capacidad para 10 personas, hidromasaje en la terraza y aire acondicionado en todos los ambientes principales.',
    descriptionIt:
      'Appartamento su tre livelli completo in un condominio chiuso, con suite, camera per gli ospiti, area gourmet per 10 persone, idromassaggio sul tetto e aria condizionata in tutti gli ambienti principali.',
    descriptionFr:
      "Triplex complet dans une résidence fermée, avec suite, chambre d'amis, espace gourmet pouvant accueillir 10 personnes, jacuzzi sur le toit-terrasse et climatisation dans toutes les pièces principales.",
    photos: Array.from({ length: 4 }, (_, i) => ({
      src: `/images/imoveis/triplex-condominio-fechado-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'casa-moderna-pipa',
    title: 'Casa moderna em Pipa',
    city: 'Praia da Pipa',
    type: 'Venda',
    area: '73 m² construída (lote de 300 m²) · 2 quartos (1 suíte)',
    priceValue: 315000,
    priceLabel: 'R$ 315.000',
    description:
      'Seu novo lar pode estar na Praia de Pipa! Casa nova, moderna e funcional em Tibau do Sul/RN, com 73 m² de área construída, lote de 300 m², 2 quartos (sendo 1 suíte), 2 banheiros, sala ampla e integrada, cozinha com bancada em granito e área externa. Ideal para morar, passar férias ou investir em uma das regiões mais desejadas do litoral potiguar.',
    descriptionEn:
      'Your new home could be in Pipa Beach! A new, modern, functional house in Tibau do Sul/RN, with 73 m² built on a 300 m² lot, 2 bedrooms (1 en-suite), 2 bathrooms, a bright open living area, a kitchen with granite countertops and outdoor space. Perfect to live in, vacation in, or invest in one of the most sought-after areas of the coast.',
    descriptionEs:
      'Su nuevo hogar puede estar en la Playa de Pipa! Casa nueva, moderna y funcional en Tibau do Sul/RN, con 73 m² de área construida, lote de 300 m², 2 habitaciones (1 suite), 2 baños, sala amplia e integrada, cocina con encimera de granito y área externa. Ideal para vivir, pasar vacaciones o invertir en una de las regiones más deseadas del litoral potiguar.',
    descriptionIt:
      'La tua nuova casa potrebbe essere a Pipa Beach! Casa nuova, moderna e funzionale a Tibau do Sul/RN, con 73 m² costruiti, lotto di 300 m², 2 camere (1 con bagno privato), 2 bagni, soggiorno ampio e open space, cucina con piano in granito e area esterna. Ideale per viverci, trascorrere le vacanze o investire in una delle zone più ambite della costa.',
    descriptionFr:
      "Votre nouveau foyer pourrait être à Pipa Beach ! Maison neuve, moderne et fonctionnelle à Tibau do Sul/RN, avec 73 m² de surface construite, un terrain de 300 m², 2 chambres (1 suite), 2 salles de bain, un salon lumineux et ouvert, une cuisine avec plan de travail en granit et un espace extérieur. Idéale pour y vivre, pour des vacances, ou comme investissement dans l'une des régions les plus prisées du littoral.",
    photos: Array.from({ length: 10 }, (_, i) => ({
      src: `/images/imoveis/casa-moderna-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'chales-e-casa-pipa',
    title: '3 chalés + casa em Pipa',
    city: 'Praia da Pipa',
    type: 'Venda',
    area: 'Terreno de 900 m²',
    priceValue: 1600000,
    priceLabel: 'R$ 1.600.000 (negociável)',
    description:
      'Oportunidade de investimento em Pipa: terreno de 900 m² com excelente potencial para turismo. O imóvel possui 3 chalés tipo suíte e uma casa de dois pavimentos com 2 quartos (sendo uma máster suíte com varanda), 2 banheiros, ampla sala, cozinha americana, despensa, amplo jardim arborizado e piscina.\n\nA estrutura está bem conservada, mas o imóvel pede uma renovação estética — investimento estimado entre R$ 200 mil e R$ 300 mil. A Ajé também pode desenvolver e gerenciar o projeto de reforma, transformando o imóvel em uma charmosa pousada ou hospedagem boutique, com grande potencial de valorização e geração de renda. Uma excelente oportunidade para investidores que enxergam o potencial turístico de Pipa.',
    descriptionEn:
      'Investment opportunity in Pipa: a 900 m² lot with strong tourism potential. The property includes 3 suite-style cottages and a two-story house with 2 bedrooms (one master suite with balcony), 2 bathrooms, a spacious living room, open kitchen, pantry, a large landscaped garden and a pool.\n\nThe structure is well maintained but could use a cosmetic renovation — estimated at R$200,000–300,000. Ajé can also manage the renovation project, turning the property into a charming boutique pousada with strong potential for appreciation and income. Price negotiable.',
    descriptionEs:
      'Oportunidad de inversión en Pipa: terreno de 900 m² con excelente potencial para turismo. El inmueble cuenta con 3 chalés tipo suite y una casa de dos pisos con 2 habitaciones (una máster suite con balcón), 2 baños, amplia sala, cocina americana, despensa, amplio jardín arbolado y piscina.\n\nLa estructura está bien conservada, pero el inmueble requiere una renovación estética — inversión estimada entre R$200.000 y R$300.000. Ajé también puede desarrollar y gestionar el proyecto de reforma, transformando el inmueble en una encantadora posada o alojamiento boutique, con gran potencial de valorización y generación de ingresos. Una excelente oportunidad para inversores que ven el potencial turístico de Pipa.',
    descriptionIt:
      "Opportunità di investimento a Pipa: terreno di 900 m² con ottimo potenziale turistico. L'immobile comprende 3 chalet tipo suite e una casa a due piani con 2 camere (una master suite con balcone), 2 bagni, ampio soggiorno, cucina a vista, dispensa, ampio giardino alberato e piscina.\n\nLa struttura è ben conservata, ma necessita di una ristrutturazione estetica — investimento stimato tra R$200.000 e R$300.000. Ajé può anche sviluppare e gestire il progetto di ristrutturazione, trasformando l'immobile in un'incantevole pousada boutique, con grande potenziale di valorizzazione e generazione di reddito. Un'ottima opportunità per investitori che vedono il potenziale turistico di Pipa.",
    descriptionFr:
      "Opportunité d'investissement à Pipa : terrain de 900 m² au fort potentiel touristique. Le bien comprend 3 chalets type suite et une maison à deux étages avec 2 chambres (dont une suite principale avec balcon), 2 salles de bain, un grand salon, une cuisine ouverte, un cellier, un grand jardin arboré et une piscine.\n\nLa structure est bien entretenue, mais le bien nécessite une rénovation esthétique — investissement estimé entre R$200 000 et R$300 000. Ajé peut aussi développer et gérer le projet de rénovation, transformant le bien en une charmante pousada boutique, avec un fort potentiel de valorisation et de revenus. Une excellente opportunité pour les investisseurs qui voient le potentiel touristique de Pipa.",
    photos: Array.from({ length: 9 }, (_, i) => ({
      src: `/images/imoveis/chales-e-casa-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'pousada-chapadao-pipa',
    title: 'Pousada com 7 chalés no Chapadão',
    city: 'Praia da Pipa',
    type: 'Venda',
    area: '7 chalés · pousada em pleno funcionamento',
    priceValue: 1500000,
    priceLabel: 'R$ 1.500.000',
    description:
      'Pousada encantadora, totalmente operacional e pronta para faturar o ano inteiro, próxima ao Chapadão (Pipa/RN).\n\n• 7 chalés independentes, todos equipados e mobiliados\n• Cada chalé: cama de casal + cama de solteiro, ar-condicionado split, TV, cozinha completa (fogão, geladeira, utensílios) e banheiro privativo\n• Área de lazer completa com piscina adulta e piscina infantil\n• Terreno 100% murado, paisagismo caprichado, muita área verde e sombra\n• Rua sem saída, super tranquila, em bairro residencial nobre\n\n📍 A poucos minutos do mirante do Chapadão, próxima às praias do Amor e das Minas, com fácil acesso ao centro de Pipa mas com a paz e privacidade de um bairro residencial. Região de altíssima procura o ano todo. Ideal para morar e trabalhar no paraíso ou como investimento puro — pousada já consolidada e com ótimas avaliações.',
    descriptionEn:
      'A charming, fully operational pousada ready to earn income year-round, near Chapadão (Pipa/RN).\n\n• 7 independent cottages, all fully furnished and equipped\n• Each cottage: a double + a single bed, split AC, TV, full kitchen (stove, fridge, utensils) and a private bathroom\n• Full leisure area with an adult pool and a kids\' pool\n• Fully walled lot, beautifully landscaped, lots of greenery and shade\n• Quiet dead-end street, in an upscale residential neighborhood\n\n📍 A few minutes from the Chapadão lookout, close to Praia do Amor and Praia das Minas, with easy access to downtown Pipa but the peace and privacy of a residential area. Very high demand year-round. Ideal to live and work in paradise, or as a pure investment — already running, with great reviews.',
    descriptionEs:
      'Posada encantadora, totalmente operativa y lista para generar ingresos durante todo el año, cerca del Chapadão (Pipa/RN).\n\n• 7 chalés independientes, todos equipados y amueblados\n• Cada chalé: cama de matrimonio + cama individual, aire acondicionado split, TV, cocina completa (cocina, nevera, utensilios) y baño privado\n• Área de recreación completa con piscina para adultos y piscina infantil\n• Terreno 100% amurallado, paisajismo cuidado, mucha área verde y sombra\n• Calle sin salida, muy tranquila, en un barrio residencial de primer nivel\n\n📍 A pocos minutos del mirador del Chapadão, cerca de las playas do Amor y das Minas, con fácil acceso al centro de Pipa pero con la paz y privacidad de un barrio residencial. Zona de altísima demanda todo el año. Ideal para vivir y trabajar en el paraíso o como inversión pura — posada ya consolidada y con excelentes reseñas.',
    descriptionIt:
      "Un'incantevole pousada, completamente operativa e pronta a generare reddito tutto l'anno, vicino al Chapadão (Pipa/RN).\n\n• 7 chalet indipendenti, tutti arredati e attrezzati\n• Ogni chalet: letto matrimoniale + letto singolo, climatizzatore split, TV, cucina completa (fornello, frigorifero, utensili) e bagno privato\n• Area ricreativa completa con piscina per adulti e piscina per bambini\n• Terreno completamente recintato, giardino curato, molto verde e ombra\n• Strada senza uscita, molto tranquilla, in un quartiere residenziale di pregio\n\n📍 A pochi minuti dal belvedere del Chapadão, vicino alle spiagge di Praia do Amor e Praia das Minas, con facile accesso al centro di Pipa ma con la tranquillità e la privacy di un quartiere residenziale. Zona ad altissima richiesta tutto l'anno. Ideale per vivere e lavorare in paradiso o come puro investimento — pousada già avviata e con ottime recensioni.",
    descriptionFr:
      "Une charmante pousada, entièrement opérationnelle et prête à générer des revenus toute l'année, près du Chapadão (Pipa/RN).\n\n• 7 chalets indépendants, tous meublés et équipés\n• Chaque chalet : un lit double + un lit simple, climatisation split, TV, cuisine complète (cuisinière, réfrigérateur, ustensiles) et salle de bain privée\n• Espace de loisirs complet avec piscine adultes et piscine enfants\n• Terrain entièrement clos, paysagement soigné, beaucoup de verdure et d'ombre\n• Rue sans issue, très calme, dans un quartier résidentiel haut de gamme\n\n📍 À quelques minutes du belvédère du Chapadão, proche des plages Praia do Amor et Praia das Minas, avec un accès facile au centre de Pipa tout en gardant le calme et l'intimité d'un quartier résidentiel. Zone à très forte demande toute l'année. Idéal pour vivre et travailler au paradis, ou comme pur investissement — pousada déjà établie, avec d'excellents avis.",
    photos: Array.from({ length: 11 }, (_, i) => ({
      src: `/images/imoveis/pousada-chapadao-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'quatro-casas-independentes-pipa',
    title: '4 casas independentes em Pipa',
    city: 'Praia da Pipa',
    type: 'Venda',
    area: 'Terreno de 600 m² · 90 m² por casa',
    priceValue: 2500000,
    priceLabel: 'R$ 2.500.000',
    description:
      'Seu próprio complexo residencial em um dos destinos mais desejados do litoral do Rio Grande do Norte — um investimento que pode gerar renda e qualidade de vida.\n\n• 4 casas independentes\n• 600 m² de terreno total · 90 m² por casa\n• 2 quartos em cada unidade\n• Sala confortável, cozinha e copa, lavanderia, jardim privativo e garagem\n• Aproximadamente 1.500 metros do centro de Pipa\n\nIdeal para investimento imobiliário, locação por temporada, moradia para uma família com unidades independentes, ou casa principal + unidades para receber familiares e amigos. O grande diferencial é a independência das quatro casas, permitindo diferentes estratégias de utilização e rentabilização.',
    descriptionEn:
      'Your own residential complex in one of the most desirable destinations on the Rio Grande do Norte coast — an investment that can generate income and quality of life.\n\n• 4 independent houses\n• 600 m² total lot · 90 m² per house\n• 2 bedrooms in each unit\n• Comfortable living room, kitchen and dining area, laundry room, private garden and garage\n• About 1,500 meters from downtown Pipa\n\nIdeal for real estate investment, short-term rental, housing for a family with independent units, or a main house plus units for family and friends. The key advantage is the independence of the four houses, allowing for different strategies of use and income.',
    descriptionEs:
      'Su propio complejo residencial en uno de los destinos más deseados del litoral de Rio Grande do Norte — una inversión que puede generar ingresos y calidad de vida.\n\n• 4 casas independientes\n• 600 m² de terreno total · 90 m² por casa\n• 2 habitaciones en cada unidad\n• Sala confortable, cocina y comedor, lavandería, jardín privado y garaje\n• Aproximadamente 1.500 metros del centro de Pipa\n\nIdeal para inversión inmobiliaria, alquiler por temporada, vivienda para una familia con unidades independientes, o casa principal + unidades para recibir familiares y amigos. La gran ventaja es la independencia de las cuatro casas, que permite diferentes estrategias de uso y rentabilidad.',
    descriptionIt:
      'Il tuo complesso residenziale in una delle destinazioni più ambite della costa di Rio Grande do Norte — un investimento che può generare reddito e qualità della vita.\n\n• 4 case indipendenti\n• 600 m² di terreno totale · 90 m² per casa\n• 2 camere da letto in ogni unità\n• Soggiorno confortevole, cucina e zona pranzo, lavanderia, giardino privato e garage\n• A circa 1.500 metri dal centro di Pipa\n\nIdeale per investimento immobiliare, affitto stagionale, alloggio per una famiglia con unità indipendenti, oppure casa principale + unità per ospitare parenti e amici. Il grande vantaggio è l\'indipendenza delle quattro case, che consente diverse strategie di utilizzo e redditività.',
    descriptionFr:
      "Votre propre complexe résidentiel dans l'une des destinations les plus prisées du littoral de Rio Grande do Norte — un investissement générateur de revenus et de qualité de vie.\n\n• 4 maisons indépendantes\n• 600 m² de terrain total · 90 m² par maison\n• 2 chambres dans chaque unité\n• Salon confortable, cuisine et coin repas, buanderie, jardin privatif et garage\n• À environ 1 500 mètres du centre de Pipa\n\nIdéal pour un investissement immobilier, une location saisonnière, le logement d'une famille avec des unités indépendantes, ou une maison principale + des unités pour recevoir famille et amis. Le grand avantage est l'indépendance des quatre maisons, permettant différentes stratégies d'utilisation et de rentabilité.",
    photos: Array.from({ length: 11 }, (_, i) => ({
      src: `/images/imoveis/quatro-casas-independentes-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'quatro-chales-pipa',
    title: '4 chalés em Pipa',
    city: 'Praia da Pipa',
    type: 'Venda',
    area: 'Terreno de 360 m² · 144 m² construídos',
    priceValue: 700000,
    priceLabel: 'R$ 700.000 (aprox. R$ 175.000 por chalé)',
    description:
      'Uma excelente oportunidade para quem busca investir no litoral potiguar, com um imóvel composto por múltiplas unidades independentes.\n\n• Terreno de 360 m² · escritura pública\n• 4 chalés independentes de 36 m² cada · 144 m² de área construída\n• Estacionamento para 4 carros\n• Pátio de uso comum com churrasqueira\n\nCada chalé possui: sala e cozinha integradas, 1 quarto, 1 banheiro e lavanderia.\n\nA configuração oferece diversas possibilidades de utilização — locação por temporada, hospedagem turística, uso próprio ou investimento para geração de renda. O grande diferencial é ter 4 unidades independentes dentro de um único imóvel. Em média, R$ 175 mil por chalé.',
    descriptionEn:
      'A great opportunity to invest on the Rio Grande do Norte coast, with a property made up of multiple independent units.\n\n• 360 m² lot · public deed\n• 4 independent cottages of 36 m² each · 144 m² built\n• Parking for 4 cars\n• Shared patio with a barbecue area\n\nEach cottage has an open living/kitchen area, 1 bedroom, 1 bathroom and a laundry area.\n\nThe layout offers several possible uses — short-term rental, tourist accommodation, personal use, or an income-generating investment. The key advantage is having 4 independent units within a single property. Averages around R$175,000 per cottage.',
    descriptionEs:
      'Una excelente oportunidad para quien busca invertir en el litoral potiguar, con un inmueble compuesto por múltiples unidades independientes.\n\n• Terreno de 360 m² · escritura pública\n• 4 chalés independientes de 36 m² cada uno · 144 m² de área construida\n• Estacionamiento para 4 autos\n• Patio de uso común con parrilla\n\nCada chalé cuenta con: sala y cocina integradas, 1 habitación, 1 baño y lavandería.\n\nLa configuración ofrece diversas posibilidades de uso — alquiler por temporada, hospedaje turístico, uso propio o inversión para generar ingresos. La gran ventaja es tener 4 unidades independientes dentro de un único inmueble. En promedio, R$175 mil por chalé.',
    descriptionIt:
      "Un'ottima opportunità per chi desidera investire sulla costa di Rio Grande do Norte, con un immobile composto da più unità indipendenti.\n\n• Terreno di 360 m² · atto pubblico\n• 4 chalet indipendenti da 36 m² ciascuno · 144 m² di superficie costruita\n• Parcheggio per 4 auto\n• Cortile comune con barbecue\n\nOgni chalet dispone di: soggiorno e cucina open space, 1 camera, 1 bagno e lavanderia.\n\nLa configurazione offre diverse possibilità di utilizzo — affitto stagionale, alloggio turistico, uso personale o investimento per generare reddito. Il grande vantaggio è avere 4 unità indipendenti all'interno di un unico immobile. In media, R$175 mila per chalet.",
    descriptionFr:
      "Une excellente opportunité pour qui souhaite investir sur le littoral de Rio Grande do Norte, avec un bien composé de plusieurs unités indépendantes.\n\n• Terrain de 360 m² · acte notarié\n• 4 chalets indépendants de 36 m² chacun · 144 m² de surface construite\n• Parking pour 4 voitures\n• Cour commune avec barbecue\n\nChaque chalet comprend : salon et cuisine ouverts, 1 chambre, 1 salle de bain et une buanderie.\n\nCette configuration offre plusieurs possibilités d'utilisation — location saisonnière, hébergement touristique, usage personnel ou investissement locatif. Le grand avantage est de disposer de 4 unités indépendantes au sein d'un seul bien. En moyenne, R$175 000 par chalet.",
    photos: Array.from({ length: 9 }, (_, i) => ({
      src: `/images/imoveis/quatro-chales-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'chale-rua-sebastiao-pipa',
    title: 'Chalé na Rua Sebastião — Rua das Pedrinhas',
    city: 'Praia da Pipa',
    type: 'Venda',
    area: 'Terreno de 278,1 m² · casa de 6x6 m (36 m²) construída — espaço para mais 2 casas',
    priceValue: 200000,
    priceLabel: 'R$ 200.000 (negociável)',
    description:
      'Chalé na Rua Sebastião, próximo à Rua das Pedrinhas, em Praia da Pipa.\n\n• Casa construída de 6x6 m (36 m²)\n• Terreno de 278,1 m² — espaço de sobra para construir mais 2 casas\n• Ótima localização\n\nValor R$ 200.000, negociável (aceita-se R$ 180.000 para fechar negócio).',
    descriptionEn:
      'Cottage on Rua Sebastião, near Rua das Pedrinhas, in Pipa Beach.\n\n• 6x6 m (36 m²) built house\n• 278.1 m² lot — plenty of room to build 2 more houses\n• Great location\n\nAsking R$200,000, negotiable (R$180,000 accepted to close the deal).',
    descriptionEs:
      'Chalé en la Rua Sebastião, cerca de la Rua das Pedrinhas, en la Playa de Pipa.\n\n• Casa construida de 6x6 m (36 m²)\n• Terreno de 278,1 m² — espacio de sobra para construir 2 casas más\n• Excelente ubicación\n\nValor R$200.000, negociable (se acepta R$180.000 para cerrar el trato).',
    descriptionIt:
      "Chalet in Rua Sebastião, vicino a Rua das Pedrinhas, a Pipa Beach.\n\n• Casa costruita di 6x6 m (36 m²)\n• Terreno di 278,1 m² — spazio sufficiente per costruire altre 2 case\n• Ottima posizione\n\nPrezzo richiesto R$200.000, trattabile (si accettano R$180.000 per chiudere l'affare).",
    descriptionFr:
      "Chalet sur la Rua Sebastião, près de la Rua das Pedrinhas, à Pipa Beach.\n\n• Maison construite de 6x6 m (36 m²)\n• Terrain de 278,1 m² — largement de quoi construire 2 maisons supplémentaires\n• Excellent emplacement\n\nPrix demandé R$200 000, négociable (R$180 000 accepté pour conclure la vente).",
    photos: Array.from({ length: 4 }, (_, i) => ({
      src: `/images/imoveis/chale-rua-sebastiao-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'casa-centro-pipa-temporada',
    title: 'Réveillon — Casa no Centro de Pipa',
    city: 'Praia da Pipa',
    type: 'Aluguel',
    rentalPeriod: 'Temporada',
    area: '2 quartos · 1 banheiro',
    priceValue: null,
    priceLabel: 'Consulte disponibilidade',
    description:
      'Casa charmosa no coração de Pipa, disponível para temporada (diária, pacote ou mensal) — inclusive para o Réveillon. 2 quartos, 1 banheiro.',
    descriptionEn:
      'A charming house in the heart of Pipa, available for short-term stays (daily, package or monthly) — including New Year\'s Eve. 2 bedrooms, 1 bathroom.',
    descriptionEs:
      'Casa encantadora en el corazón de Pipa, disponible para temporada (diaria, paquete o mensual) — incluso para el Réveillon (fin de año). 2 habitaciones, 1 baño.',
    descriptionIt:
      'Una casa incantevole nel cuore di Pipa, disponibile per soggiorni brevi (giornalieri, a pacchetto o mensili) — anche per il Capodanno. 2 camere, 1 bagno.',
    descriptionFr:
      "Une charmante maison au cœur de Pipa, disponible pour des séjours courts (à la nuitée, en formule ou au mois) — y compris pour le réveillon du Nouvel An. 2 chambres, 1 salle de bain.",
    photos: Array.from({ length: 8 }, (_, i) => ({
      src: `/images/imoveis/casa-centro-pipa-temporada-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'pousada-pedra-dagua-pipa',
    title: "Pousada Pedra D'Água",
    city: 'Praia da Pipa',
    type: 'Aluguel',
    rentalPeriod: 'Diária',
    area: 'Diárias e pacotes',
    priceValue: null,
    priceLabel: 'Consulte diárias e pacotes',
    description: 'Pousada no coração de Praia da Pipa, com diárias e pacotes disponíveis.',
    descriptionEn: 'A pousada in the heart of Pipa Beach, with daily rates and packages available.',
    descriptionEs: 'Posada en el corazón de la Playa de Pipa, con tarifas diarias y paquetes disponibles.',
    descriptionIt: 'Una pousada nel cuore di Pipa Beach, con tariffe giornaliere e pacchetti disponibili.',
    descriptionFr: 'Une pousada au cœur de Pipa Beach, avec tarifs à la nuitée et formules disponibles.',
    photos: Array.from({ length: 6 }, (_, i) => ({
      src: `/images/imoveis/pousada-pedra-dagua-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'aluguel-rua-cancela-pipa',
    title: 'Casa na Rua da Cancela',
    city: 'Praia da Pipa',
    type: 'Aluguel',
    rentalPeriod: 'Temporada',
    area: '2 suítes + 1 quarto · banheiro social',
    priceValue: null,
    priceLabel: 'Consulte disponibilidade',
    description:
      'Casa cercada de natureza, com duas suítes, área gourmet e estacionamento na Travessa Rua da Cancela — disponível para o Réveillon, em pacotes e diárias. Valor varia conforme a quantidade de pessoas e dias — consulte disponibilidade.',
    descriptionEn:
      'A house surrounded by nature, with two suites, a gourmet area and parking on Travessa Rua da Cancela — available for New Year\'s Eve, by package or by the day. Price varies by number of guests and nights — contact us for availability.',
    descriptionEs:
      'Casa rodeada de naturaleza, con dos suites, área gourmet y estacionamiento en la Travessa Rua da Cancela — disponible para el Réveillon, en paquetes y diarias. El valor varía según la cantidad de personas y días — consulte disponibilidad.',
    descriptionIt:
      'Casa immersa nella natura, con due suite, area gourmet e parcheggio in Travessa Rua da Cancela — disponibile per il Capodanno, a pacchetto o giornaliero. Il prezzo varia in base al numero di persone e di notti — contattaci per la disponibilità.',
    descriptionFr:
      "Maison entourée de nature, avec deux suites, un espace gourmet et un parking sur la Travessa Rua da Cancela — disponible pour le réveillon du Nouvel An, en formule ou à la nuitée. Le tarif varie selon le nombre de personnes et de nuits — contactez-nous pour la disponibilité.",
    photos: Array.from({ length: 5 }, (_, i) => ({
      src: `/images/imoveis/aluguel-rua-cancela-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'barco-pesqueiro-barra-cunhau',
    title: 'Barco pesqueiro — Barra do Cunhaú',
    city: 'Barra do Cunhaú',
    type: 'Outros',
    area: 'Consulte especificações',
    priceValue: 60000,
    priceLabel: 'R$ 60.000',
    description:
      'Barco pesqueiro à venda em Barra do Cunhaú. Motor de 3 cilindros, já vem com material de pesca, documentos em dia e licença para pescar.',
    descriptionEn:
      'Fishing boat for sale in Barra do Cunhaú. 3-cylinder engine, comes with fishing gear, documents up to date and a valid fishing license.',
    descriptionEs:
      'Barco pesquero en venta en Barra do Cunhaú. Motor de 3 cilindros, incluye equipo de pesca, documentos al día y licencia de pesca.',
    descriptionIt:
      'Barca da pesca in vendita a Barra do Cunhaú. Motore a 3 cilindri, dotata di attrezzatura da pesca, documenti in regola e licenza di pesca.',
    descriptionFr:
      'Bateau de pêche à vendre à Barra do Cunhaú. Moteur 3 cylindres, livré avec le matériel de pêche, documents à jour et permis de pêche.',
    photos: Array.from({ length: 4 }, (_, i) => ({
      src: `/images/imoveis/barco-pesqueiro-barra-cunhau-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
];
