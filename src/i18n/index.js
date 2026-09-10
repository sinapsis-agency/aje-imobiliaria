import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Tradução completa do "esqueleto" do site (navegação, hero, títulos,
// botões) e da maior parte do conteúdo de corpo. Feita com o objetivo de
// ficar utilizável em 5 idiomas o quanto antes — recomenda-se uma revisão
// por falante nativo antes de publicar oficialmente, especialmente nos
// trechos com linguagem jurídica (contratos, CRECI etc.).

const resources = {
  pt: {
    translation: {
      nav: { quemSomos: 'Quem somos', imoveis: 'Imóveis', servicos: 'Serviços', ondeAtuamos: 'Onde atuamos', contato: 'Contato', agendar: 'Agendar' },
      hero: {
        pause1: 'Onde o Nordeste toca o céu.',
        pause2: 'Prosperidade tem forma de lar.',
        brand: 'Ajé Imobiliária',
        tagline: 'Bem-vindo ao Nordeste.',
        cta: 'Descobrir imóveis',
        clickToStart: 'Clique para começar',
      },
      sections: {
        quemSomos: {
          eyebrow: 'Quem somos',
          tituloLinha1: 'Descubra sua propriedade.',
          tituloLinha2: 'Mais de 40 anos no Nordeste.',
          tituloLinha3: '35 anos vendendo sua prosperidade.',
          somosIntro: 'Somos Ajé Imobiliária, mais de 40 anos no Nordeste, mais de 35 anos vendendo sua prosperidade.',
          paragrafo1: 'Foi um encontro com Praia da Pipa, há mais de 40 anos, que deu origem à Ajé. Desde então, construímos uma história baseada em confiança, conhecimento e cuidado em cada detalhe. Hoje, reunimos 35 anos de experiência em uma equipe de corretoras que atua no Nordeste brasileiro, com presença no Rio Grande do Norte e em João Pessoa, acompanhando cada cliente de perto em cada etapa da sua escolha.',
          paragrafo2: 'Ajé dá nome a este projeto porque representa exatamente o que construímos: abundância com raízes, riqueza que permanece, que não é passageira.',
          dicaCursor: 'Passe o cursor para ver',
        },
        imoveis: { eyebrow: 'Imóveis em destaque', title: 'Selecionados, não apenas listados.' },
        servicos: { eyebrow: 'Serviços', title: 'Todo o processo, do início ao fim.' },
        apoioJuridico: {
          eyebrow: 'Suporte jurídico',
          title: 'Comprar à distância, sem medo.',
          body: 'Cada compra na Ajé conta com acompanhamento jurídico desde o primeiro contato. Nosso advogado elabora e revisa todos os contratos, e presta assessoria durante todo o processo — para que comprar no Brasil seja tão seguro quanto comprar em casa.',
        },
        comoFunciona: { eyebrow: 'Como funciona', title: 'Um processo claro, do primeiro contato à escritura.', dica: 'Arraste ou use as setas para navegar pelas etapas' },
        ondeAtuamos: { eyebrow: 'Onde atuamos' },
        vendaAnuncie: {
          heroTitle: 'Venda e Anuncie',
          scrollHint: 'Role para expandir',
          title: 'Seu imóvel, em boas mãos.',
          body: 'Vende ou aluga no litoral do Nordeste? A Ajé cuida de tudo: fotos, divulgação e suporte jurídico completo.',
        },
        contato: { eyebrow: 'Contato', title: 'Vamos falar sobre seu próximo imóvel.' },
        equipe: { title: 'Uma equipe, um processo, um único ponto de contato.', description: 'Você não lida com intermediários soltos. Você lida com uma equipe.' },
      },
      team: {
        eva: 'Corretora de imóveis',
        joao: 'Logística em terreno',
        ideaSinapsis: 'Design e marketing',
        advogadoNome: 'Advogado responsável',
        advogado: 'Contratos e assessoria jurídica',
        topografoNome: 'Topógrafo',
        topografo: 'Medição e garantia de divisas',
      },
      services: {
        venda: 'Venda', aluguel: 'Aluguel', terrenos: 'Terrenos',
        gestao: 'Gestão', assessoria: 'Assessoria internacional', advogado: 'Advogado',
        categoriaImoveis: 'Imóveis', categoriaSuporte: 'Suporte',
      },
      steps: {
        primeiroContato: { title: 'Primeiro contato', subtitle: 'Conversa por WhatsApp ou vídeo-chamada, entendimento do que você procura.' },
        selecaoVisita: { title: 'Seleção e visita', subtitle: 'Presencial ou tour virtual guiado.' },
        topografia: { title: 'Topografia', subtitle: 'Verificação de documentação e divisas com o topógrafo.' },
        advogado: { title: 'Advogado', subtitle: 'Elaboração e revisão do contrato pelo advogado responsável.' },
        assinatura: { title: 'Assinatura e transferência', subtitle: 'Acompanhamento até a escritura final.' },
      },
      filters: {
        todasLocalizacoes: 'Todas as localizações',
        todosTipos: 'Todos os tipos',
        semResultados: 'Nenhum imóvel encontrado com esses filtros. Fale com a gente pelo WhatsApp — talvez tenhamos algo que ainda não está no site.',
      },
      buttons: {
        agendarAtendimento: 'Agendar atendimento',
        queroAnunciar: 'Quero anunciar',
        consultar: 'Consultar',
      },
      footer: {
        rights: 'Todos os direitos reservados. Site desenvolvido por',
      },
    },
  },
  en: {
    translation: {
      nav: { quemSomos: 'About us', imoveis: 'Properties', servicos: 'Services', ondeAtuamos: 'Where we work', contato: 'Contact', agendar: 'Book now' },
      hero: {
        pause1: 'Where the Nordeste touches the sky.',
        pause2: 'Prosperity takes the shape of home.',
        brand: 'Ajé Imobiliária',
        tagline: 'Welcome to the Nordeste.',
        cta: 'Discover properties',
        clickToStart: 'Click to begin',
      },
      sections: {
        quemSomos: {
          eyebrow: 'About us',
          tituloLinha1: 'Discover your property.',
          tituloLinha2: 'Over 40 years in the Nordeste.',
          tituloLinha3: '35 years building prosperity.',
          somosIntro: 'We are Ajé Imobiliária, over 40 years in the Nordeste, more than 35 years building prosperity.',
          paragrafo1: "It was an encounter with Praia da Pipa, more than 40 years ago, that gave rise to Ajé. Since then, we've built a story rooted in trust, expertise, and care for every detail. Today, we bring together 35 years of experience in a team of agents working across Brazil's Nordeste, with a presence in Rio Grande do Norte and João Pessoa, guiding each client closely through every step of their journey.",
          paragrafo2: 'Ajé gives its name to this project because it represents exactly what we have built: abundance with roots, wealth that stays, that is not fleeting.',
          dicaCursor: 'Move your cursor to see',
        },
        imoveis: { eyebrow: 'Featured properties', title: 'Selected, not just listed.' },
        servicos: { eyebrow: 'Services', title: 'The whole process, start to finish.' },
        apoioJuridico: {
          eyebrow: 'Legal support',
          title: 'Buy from afar, without fear.',
          body: 'Every purchase with Ajé comes with legal guidance from the very first contact. Our lawyer drafts and reviews every contract and advises you through the whole process — so buying in Brazil feels as safe as buying at home.',
        },
        comoFunciona: { eyebrow: 'How it works', title: 'A clear process, from first contact to the deed.', dica: 'Drag or use the arrows to browse the steps' },
        ondeAtuamos: { eyebrow: 'Where we work' },
        vendaAnuncie: {
          heroTitle: 'List With Us',
          scrollHint: 'Scroll to expand',
          title: 'Your property, in good hands.',
          body: 'Selling or renting on the Nordeste coast? Ajé takes care of everything: photos, marketing and full legal support.',
        },
        contato: { eyebrow: 'Contact', title: "Let's talk about your next property." },
        equipe: { title: 'One team, one process, a single point of contact.', description: "You don't deal with loose middlemen. You deal with a team." },
      },
      team: {
        eva: 'Real estate agent',
        joao: 'On-site logistics',
        ideaSinapsis: 'Design and marketing',
        advogadoNome: 'Attorney in charge',
        advogado: 'Contracts and legal advice',
        topografoNome: 'Surveyor',
        topografo: 'Land measurement and boundary guarantee',
      },
      services: {
        venda: 'Sales', aluguel: 'Rentals', terrenos: 'Land',
        gestao: 'Management', assessoria: 'International advisory', advogado: 'Legal',
        categoriaImoveis: 'Properties', categoriaSuporte: 'Support',
      },
      steps: {
        primeiroContato: { title: 'First contact', subtitle: 'A conversation over WhatsApp or video call to understand what you are looking for.' },
        selecaoVisita: { title: 'Selection and visit', subtitle: 'In person or a guided virtual tour.' },
        topografia: { title: 'Land survey', subtitle: 'Documentation and boundary verification with the surveyor.' },
        advogado: { title: 'Attorney', subtitle: 'Contract drafting and review by our attorney.' },
        assinatura: { title: 'Signing and transfer', subtitle: 'Guidance all the way to the final deed.' },
      },
      filters: {
        todasLocalizacoes: 'All locations',
        todosTipos: 'All types',
        semResultados: "No properties match these filters. Message us on WhatsApp — we might have something that isn't on the site yet.",
      },
      buttons: {
        agendarAtendimento: 'Book an appointment',
        queroAnunciar: 'List my property',
        consultar: 'Ask us',
      },
      footer: {
        rights: 'All rights reserved. Website developed by',
      },
    },
  },
  es: {
    translation: {
      nav: { quemSomos: 'Quiénes somos', imoveis: 'Propiedades', servicos: 'Servicios', ondeAtuamos: 'Dónde operamos', contato: 'Contacto', agendar: 'Agendar' },
      hero: {
        pause1: 'Donde el Nordeste toca el cielo.',
        pause2: 'La prosperidad tiene forma de hogar.',
        brand: 'Ajé Imobiliária',
        tagline: 'Bienvenido al Nordeste.',
        cta: 'Descubrir propiedades',
        clickToStart: 'Haz clic para comenzar',
      },
      sections: {
        quemSomos: {
          eyebrow: 'Quiénes somos',
          tituloLinha1: 'Descubre tu propiedad.',
          tituloLinha2: 'Más de 40 años en el Nordeste.',
          tituloLinha3: '35 años construyendo prosperidad.',
          somosIntro: 'Somos Ajé Imobiliária, más de 40 años en el Nordeste, más de 35 años construyendo prosperidad.',
          paragrafo1: 'Fue un encuentro con Praia da Pipa, hace más de 40 años, el que dio origen a Ajé. Desde entonces, construimos una historia basada en confianza, conocimiento y cuidado en cada detalle. Hoy, reunimos 35 años de experiencia en un equipo de corredoras que opera en el Nordeste brasileño, con presencia en Rio Grande do Norte y en João Pessoa, acompañando de cerca a cada cliente en cada etapa de su elección.',
          paragrafo2: 'Ajé da nombre a este proyecto porque representa exactamente lo que hemos construido: abundancia con raíces, riqueza que permanece, que no es pasajera.',
          dicaCursor: 'Mueve el cursor para ver',
        },
        imoveis: { eyebrow: 'Propiedades destacadas', title: 'Seleccionadas, no solo listadas.' },
        servicos: { eyebrow: 'Servicios', title: 'Todo el proceso, de principio a fin.' },
        apoioJuridico: {
          eyebrow: 'Apoyo jurídico',
          title: 'Comprar a distancia, sin miedo.',
          body: 'Cada compra con Ajé cuenta con acompañamiento jurídico desde el primer contacto. Nuestro abogado elabora y revisa todos los contratos, y asesora durante todo el proceso — para que comprar en Brasil se sienta tan seguro como comprar en casa.',
        },
        comoFunciona: { eyebrow: 'Cómo funciona', title: 'Un proceso claro, del primer contacto a la escritura.', dica: 'Arrastra o usa las flechas para navegar las etapas' },
        ondeAtuamos: { eyebrow: 'Dónde operamos' },
        vendaAnuncie: {
          heroTitle: 'Vende con Nosotros',
          scrollHint: 'Desplázate para expandir',
          title: 'Tu propiedad, en buenas manos.',
          body: '¿Vendes o alquilas en el litoral del Nordeste? Ajé se encarga de todo: fotos, difusión y apoyo jurídico completo.',
        },
        contato: { eyebrow: 'Contacto', title: 'Hablemos de tu próxima propiedad.' },
        equipe: { title: 'Un equipo, un proceso, un único punto de contacto.', description: 'No tratas con intermediarios sueltos. Tratas con un equipo.' },
      },
      team: {
        eva: 'Corredora de propiedades',
        joao: 'Logística en terreno',
        ideaSinapsis: 'Diseño y marketing',
        advogadoNome: 'Abogado responsable',
        advogado: 'Contratos y asesoría jurídica',
        topografoNome: 'Topógrafo',
        topografo: 'Medición y garantía de linderos',
      },
      services: {
        venda: 'Venta', aluguel: 'Alquiler', terrenos: 'Terrenos',
        gestao: 'Gestión', assessoria: 'Asesoría internacional', advogado: 'Abogado',
        categoriaImoveis: 'Propiedades', categoriaSuporte: 'Soporte',
      },
      steps: {
        primeiroContato: { title: 'Primer contacto', subtitle: 'Conversación por WhatsApp o videollamada para entender qué buscas.' },
        selecaoVisita: { title: 'Selección y visita', subtitle: 'Presencial o tour virtual guiado.' },
        topografia: { title: 'Topografía', subtitle: 'Verificación de documentación y linderos con el topógrafo.' },
        advogado: { title: 'Abogado', subtitle: 'Elaboración y revisión del contrato por el abogado responsable.' },
        assinatura: { title: 'Firma y transferencia', subtitle: 'Acompañamiento hasta la escritura final.' },
      },
      filters: {
        todasLocalizacoes: 'Todas las localizaciones',
        todosTipos: 'Todos los tipos',
        semResultados: 'No encontramos propiedades con estos filtros. Escríbenos por WhatsApp — quizás tengamos algo que aún no está en el sitio.',
      },
      buttons: {
        agendarAtendimento: 'Agendar atención',
        queroAnunciar: 'Quiero anunciar',
        consultar: 'Consultar',
      },
      footer: {
        rights: 'Todos los derechos reservados. Sitio desarrollado por',
      },
    },
  },
  it: {
    translation: {
      nav: { quemSomos: 'Chi siamo', imoveis: 'Immobili', servicos: 'Servizi', ondeAtuamos: 'Dove operiamo', contato: 'Contatto', agendar: 'Prenota' },
      hero: {
        pause1: 'Dove il Nordeste tocca il cielo.',
        pause2: 'La prosperità ha la forma di una casa.',
        brand: 'Ajé Imobiliária',
        tagline: 'Benvenuto nel Nordeste.',
        cta: 'Scopri gli immobili',
        clickToStart: 'Clicca per iniziare',
      },
      sections: {
        quemSomos: {
          eyebrow: 'Chi siamo',
          tituloLinha1: 'Scopri la tua proprietà.',
          tituloLinha2: 'Oltre 40 anni nel Nordeste.',
          tituloLinha3: '35 anni costruendo prosperità.',
          somosIntro: 'Siamo Ajé Imobiliária, oltre 40 anni nel Nordeste, più di 35 anni costruendo prosperità.',
          paragrafo1: 'È stato un incontro con Praia da Pipa, più di 40 anni fa, a dare origine ad Ajé. Da allora, abbiamo costruito una storia fondata sulla fiducia, sulla competenza e sulla cura di ogni dettaglio. Oggi riuniamo 35 anni di esperienza in un team di agenti che opera nel Nordeste brasiliano, con presenza a Rio Grande do Norte e a João Pessoa, accompagnando da vicino ogni cliente in ogni fase della sua scelta.',
          paragrafo2: 'Ajé dà il nome a questo progetto perché rappresenta esattamente ciò che abbiamo costruito: abbondanza con radici, ricchezza che resta, che non è passeggera.',
          dicaCursor: 'Muovi il cursore per vedere',
        },
        imoveis: { eyebrow: 'Immobili in evidenza', title: 'Selezionati, non solo elencati.' },
        servicos: { eyebrow: 'Servizi', title: "Tutto il processo, dall'inizio alla fine." },
        apoioJuridico: {
          eyebrow: 'Supporto legale',
          title: 'Comprare a distanza, senza paura.',
          body: "Ogni acquisto con Ajé include assistenza legale fin dal primo contatto. Il nostro avvocato redige e revisiona tutti i contratti e ti assiste durante l'intero processo — perché comprare in Brasile sia sicuro come comprare a casa.",
        },
        comoFunciona: { eyebrow: 'Come funziona', title: 'Un processo chiaro, dal primo contatto al rogito.', dica: 'Trascina o usa le frecce per scorrere le fasi' },
        ondeAtuamos: { eyebrow: 'Dove operiamo' },
        vendaAnuncie: {
          heroTitle: 'Vendi con Noi',
          scrollHint: 'Scorri per espandere',
          title: 'La tua proprietà, in buone mani.',
          body: 'Vendi o affitti sulla costa del Nordeste? Ajé si occupa di tutto: foto, promozione e supporto legale completo.',
        },
        contato: { eyebrow: 'Contatto', title: 'Parliamo del tuo prossimo immobile.' },
        equipe: { title: 'Un team, un processo, un unico punto di contatto.', description: 'Non hai a che fare con intermediari sparsi. Hai a che fare con un team.' },
      },
      team: {
        eva: 'Agente immobiliare',
        joao: 'Logistica sul territorio',
        ideaSinapsis: 'Design e marketing',
        advogadoNome: 'Avvocato responsabile',
        advogado: 'Contratti e assistenza legale',
        topografoNome: 'Geometra',
        topografo: 'Misurazione e garanzia dei confini',
      },
      services: {
        venda: 'Vendita', aluguel: 'Affitto', terrenos: 'Terreni',
        gestao: 'Gestione', assessoria: 'Assistenza internazionale', advogado: 'Avvocato',
        categoriaImoveis: 'Immobili', categoriaSuporte: 'Supporto',
      },
      steps: {
        primeiroContato: { title: 'Primo contatto', subtitle: 'Conversazione su WhatsApp o videochiamata per capire cosa cerchi.' },
        selecaoVisita: { title: 'Selezione e visita', subtitle: 'Di persona o tour virtuale guidato.' },
        topografia: { title: 'Rilievo topografico', subtitle: 'Verifica della documentazione e dei confini con il geometra.' },
        advogado: { title: 'Avvocato', subtitle: "Redazione e revisione del contratto da parte dell'avvocato responsabile." },
        assinatura: { title: 'Firma e trasferimento', subtitle: 'Assistenza fino al rogito finale.' },
      },
      filters: {
        todasLocalizacoes: 'Tutte le località',
        todosTipos: 'Tutti i tipi',
        semResultados: 'Nessun immobile trovato con questi filtri. Scrivici su WhatsApp — potremmo avere qualcosa non ancora sul sito.',
      },
      buttons: {
        agendarAtendimento: 'Prenota un appuntamento',
        queroAnunciar: 'Voglio pubblicare',
        consultar: 'Contattaci',
      },
      footer: {
        rights: 'Tutti i diritti riservati. Sito sviluppato da',
      },
    },
  },
  fr: {
    translation: {
      nav: { quemSomos: 'Qui sommes-nous', imoveis: 'Biens', servicos: 'Services', ondeAtuamos: 'Où nous opérons', contato: 'Contact', agendar: 'Réserver' },
      hero: {
        pause1: 'Là où le Nordeste touche le ciel.',
        pause2: 'La prospérité a la forme d\u2019un foyer.',
        brand: 'Ajé Imobiliária',
        tagline: 'Bienvenue dans le Nordeste.',
        cta: 'Découvrir les biens',
        clickToStart: 'Cliquez pour commencer',
      },
      sections: {
        quemSomos: {
          eyebrow: 'Qui sommes-nous',
          tituloLinha1: 'Découvrez votre bien.',
          tituloLinha2: 'Plus de 40 ans dans le Nordeste.',
          tituloLinha3: '35 ans à construire la prospérité.',
          somosIntro: 'Nous sommes Ajé Imobiliária, plus de 40 ans dans le Nordeste, plus de 35 ans à construire la prospérité.',
          paragrafo1: 'C\u2019est une rencontre avec Praia da Pipa, il y a plus de 40 ans, qui a donné naissance à Ajé. Depuis, nous avons bâti une histoire fondée sur la confiance, l\u2019expertise et le soin du détail. Aujourd\u2019hui, nous réunissons 35 ans d\u2019expérience au sein d\u2019une équipe d\u2019agentes présente dans le Nordeste brésilien, à Rio Grande do Norte et à João Pessoa, accompagnant chaque client de près à chaque étape de son choix.',
          paragrafo2: 'Ajé donne son nom à ce projet car il représente exactement ce que nous avons construit : une abondance enracinée, une richesse durable, qui n\u2019est pas éphémère.',
          dicaCursor: 'Déplacez le curseur pour voir',
        },
        imoveis: { eyebrow: 'Biens en vedette', title: 'Sélectionnés, pas seulement listés.' },
        servicos: { eyebrow: 'Services', title: 'Tout le processus, du début à la fin.' },
        apoioJuridico: {
          eyebrow: 'Accompagnement juridique',
          title: 'Acheter à distance, sans crainte.',
          body: "Chaque achat avec Ajé bénéficie d'un accompagnement juridique dès le premier contact. Notre avocat rédige et révise tous les contrats et vous accompagne tout au long du processus — pour qu'acheter au Brésil soit aussi sûr qu'acheter chez vous.",
        },
        comoFunciona: { eyebrow: 'Comment ça marche', title: "Un processus clair, du premier contact à l'acte notarié.", dica: 'Glissez ou utilisez les flèches pour parcourir les étapes' },
        ondeAtuamos: { eyebrow: 'Où nous opérons' },
        vendaAnuncie: {
          heroTitle: 'Vendez Avec Nous',
          scrollHint: 'Faites défiler pour agrandir',
          title: 'Votre bien, entre de bonnes mains.',
          body: 'Vous vendez ou louez sur la côte du Nordeste ? Ajé s\u2019occupe de tout : photos, promotion et accompagnement juridique complet.',
        },
        contato: { eyebrow: 'Contact', title: 'Parlons de votre prochain bien.' },
        equipe: { title: 'Une équipe, un processus, un point de contact unique.', description: "Vous ne traitez pas avec des intermédiaires épars. Vous traitez avec une équipe." },
      },
      team: {
        eva: 'Agente immobilière',
        joao: 'Logistique sur le terrain',
        ideaSinapsis: 'Design et marketing',
        advogadoNome: 'Avocat responsable',
        advogado: 'Contrats et conseil juridique',
        topografoNome: 'Géomètre',
        topografo: 'Mesurage et garantie des limites',
      },
      services: {
        venda: 'Vente', aluguel: 'Location', terrenos: 'Terrains',
        gestao: 'Gestion', assessoria: 'Conseil international', advogado: 'Avocat',
        categoriaImoveis: 'Biens', categoriaSuporte: 'Accompagnement',
      },
      steps: {
        primeiroContato: { title: 'Premier contact', subtitle: 'Échange par WhatsApp ou visioconférence pour comprendre ce que vous cherchez.' },
        selecaoVisita: { title: 'Sélection et visite', subtitle: 'En personne ou visite virtuelle guidée.' },
        topografia: { title: 'Relevé topographique', subtitle: 'Vérification des documents et des limites avec le géomètre.' },
        advogado: { title: 'Avocat', subtitle: 'Rédaction et révision du contrat par l\u2019avocat responsable.' },
        assinatura: { title: 'Signature et transfert', subtitle: 'Accompagnement jusqu\u2019à l\u2019acte final.' },
      },
      filters: {
        todasLocalizacoes: 'Toutes les localisations',
        todosTipos: 'Tous les types',
        semResultados: "Aucun bien ne correspond à ces filtres. Écrivez-nous sur WhatsApp — nous avons peut-être quelque chose qui n'est pas encore sur le site.",
      },
      buttons: {
        agendarAtendimento: 'Prendre rendez-vous',
        queroAnunciar: 'Je veux publier',
        consultar: 'Nous contacter',
      },
      footer: {
        rights: 'Tous droits réservés. Site développé par',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt',
  fallbackLng: 'pt',
  interpolation: { escapeValue: false },
});

export default i18n;
