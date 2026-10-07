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
    area: '3.126 m² (perímetro de 243 m)',
    priceValue: 1700000,
    priceLabel: 'R$ 1.700.000',
    description:
      'Uma oportunidade incrível: terreno a R$ 544 o metro quadrado, enquanto a região já está avaliada em cerca de R$ 800/m². Um dos terrenos mais espetaculares de Pipa, com vista panorâmica em uma das áreas mais valorizadas da região — oportunidade única para quem comprar a área completa, com ótimo potencial para hotelaria, pousadas ou um empreendimento turístico de alto padrão.',
    descriptionEn:
      'An incredible opportunity: land priced at R$544 per square meter, while the area is already valued at around R$800/m². One of the most spectacular plots in Pipa, with a panoramic ocean view in one of the most sought-after parts of the region — a unique chance for whoever buys the entire lot, with strong potential for a boutique hotel, pousada or high-end tourism project.',
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
    area: 'A partir de 300 m² (área total 14.200 m²)',
    priceValue: null,
    priceLabel: 'R$ 300/m² (a partir de 300 m²)',
    description:
      'Terreno Praia das Minas, com vista para o mar — possibilidade de desmembramento em lotes a partir de 300 m², R$ 300 por metro quadrado.',
    descriptionEn:
      'Praia das Minas land, with ocean views — can be subdivided into lots starting at 300 m², R$300 per square meter.',
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
    area: 'A partir de 300 m² (área total 49.515 m², perímetro 518 m)',
    priceValue: null,
    priceLabel: 'R$ 150/m² (a partir de 300 m²)',
    description:
      'Terreno localizado entre as falésias de Sibaúma e a Rua das Pedrinhas, em uma área com enorme potencial de crescimento — as ruas da região já foram aprovadas e os acessos estão sendo abertos. Possibilidade de desmembramento em lotes a partir de 300 m², R$ 150 por metro quadrado.',
    descriptionEn:
      'Land located between the Sibaúma cliffs and Rua das Pedrinhas, in an area with enormous growth potential — the streets have already been approved and access roads are being opened. Can be subdivided into lots starting at 300 m², R$150 per square meter.',
    photos: Array.from({ length: 6 }, (_, i) => ({
      src: `/images/imoveis/terreno-rua-das-pedrinhas-pipa-${i + 1}.jpg`,
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
    description: 'Terreno bem localizado na Rua Condor, pronto para construir.',
    descriptionEn: 'Well-located lot on Rua Condor, ready to build on.',
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
    description:
      'Terreno com escritura pública na Travessa Rua da Cancela, em uma zona de alto crescimento de Pipa — cada vez mais procurada por quem quer construir perto da natureza, com fácil acesso ao centro e às praias.',
    descriptionEn:
      'Titled land (public deed) on Travessa Rua da Cancela, in a fast-growing part of Pipa — increasingly sought after by those who want to build close to nature, with easy access to downtown and the beaches.',
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
    description: 'Terreno na Rua Camboim, com rua na frente e rua atrás.',
    descriptionEn: 'Land on Rua Camboim, with street access on both the front and back.',
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
    description:
      'Terreno exclusivo para projetos extraordinários em Sibaúma, Tibau do Sul/RN.\n\n• Área total: 33.000 m²\n• Documentação 100% regularizada\n• Localização privilegiada\n• Natureza exuberante\n• Fácil acesso e ótima topografia\n• Alto potencial de valorização\n\nAcesso pela Estrada de Sibaúma. Invista em qualidade de vida e rentabilidade.',
    descriptionEn:
      'Exclusive land for extraordinary projects in Sibaúma, Tibau do Sul/RN.\n\n• Total area: 33,000 m²\n• 100% clear title\n• Prime location\n• Lush natural surroundings\n• Easy access and excellent topography\n• High potential for appreciation\n\nAccess via Estrada de Sibaúma. Invest in quality of life and return.',
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
    photos: Array.from({ length: 7 }, (_, i) => ({
      src: `/images/imoveis/terreno-munim-tibau-do-sul-${i + 1}.jpg`,
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
    photos: Array.from({ length: 9 }, (_, i) => ({
      src: `/images/imoveis/chales-e-casa-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'casa-cruzeiro-do-sul-pipa',
    title: 'Casa na Rua Cruzeiro do Sul',
    city: 'Praia da Pipa',
    type: 'Venda',
    area: 'Terreno de 500 m² · 200 m² construídos',
    priceValue: 780000,
    priceLabel: 'R$ 780.000 (promoção, de R$ 850.000) ou aluguel com opção de compra: R$ 5.500/mês',
    description:
      'Três possibilidades de negócio na Praia de Pipa: venda, aluguel com opção de compra ou aluguel anual comercial — ideal para pousada, hostel ou hotel boutique.\n\n📍 Localização privilegiada: a 5 minutos a pé da Praia do Amor, do centro e dos supermercados (Rua Cruzeiro do Sul, caminho 2 – Chapadão, em frente à pousada Kokoro).\n\n• Terreno de 500 m² · 200 m² construídos\n• Capacidade para hospedar de 15 a 20 pessoas\n• Casa principal com varanda de aprox. 50 m², salão comedor amplo, cozinha, lavanderia, depósito, banheiro social e 2 quartos amplos com armários de obra e chuveiro de água quente\n• Apartamento independente no lateral, com varanda própria, sala espaçosa e suíte principal\n\nModalidades:\n• Venda direta: de R$ 850.000 por R$ 780.000 (preço promocional), com escritura particular\n• Aluguel com opção de compra: R$ 5.500/mês + garantia equivalente a 3 meses\n• Aluguel anual comercial: ideal para pousada, hostel ou hotel boutique',
    descriptionEn:
      'Three ways to do business in Pipa Beach: outright sale, rent-to-own, or an annual commercial lease — ideal for a pousada, hostel or boutique hotel.\n\n📍 Prime location: a 5-minute walk from Praia do Amor, downtown and the supermarkets (Rua Cruzeiro do Sul, Caminho 2 – Chapadão, across from Pousada Kokoro).\n\n• 500 m² lot · 200 m² built\n• Sleeps 15–20 guests\n• Main house with a ~50 m² veranda, a large dining/living room, kitchen, laundry room, storage room, guest bathroom and 2 large bedrooms with built-in closets and hot-water showers\n• Independent side apartment with its own veranda, a spacious living room and a master suite\n\nOptions:\n• Outright sale: reduced from R$850,000 to R$780,000 (promotional price), with private deed\n• Rent-to-own: R$5,500/month + a deposit equal to 3 months\' rent\n• Annual commercial lease: ideal for a pousada, hostel or boutique hotel',
    photos: Array.from({ length: 12 }, (_, i) => ({
      src: `/images/imoveis/casa-cruzeiro-do-sul-pipa-${i + 1}.jpg`,
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
    photos: Array.from({ length: 9 }, (_, i) => ({
      src: `/images/imoveis/quatro-chales-pipa-${i + 1}.jpg`,
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
    photos: Array.from({ length: 4 }, (_, i) => ({
      src: `/images/imoveis/barco-pesqueiro-barra-cunhau-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
];
