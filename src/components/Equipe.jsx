import { useTranslation } from 'react-i18next';
import { TeamSection } from './TeamSection';
import { TEAM_PHOTOS } from '../data/images';

export default function Equipe() {
  const { t } = useTranslation();

  const TEAM = [
    {
      name: 'Eva',
      designation: t('team.eva'),
      detail: 'CRECI 7119-RN',
      imageSrc: TEAM_PHOTOS.eva,
      bio: t('team.evaBio'),
    },
    {
      name: 'João',
      designation: t('team.joao'),
      imageSrc: TEAM_PHOTOS.joao,
      bio: t('team.joaoBio'),
    },
    {
      name: 'Idea Sinapsis',
      designation: t('team.ideaSinapsis'),
      imageSrc: TEAM_PHOTOS.ideaSinapsis,
      bio: t('team.ideaSinapsisBio'),
      links: [
        { label: 'ideasinapsis.com', href: 'https://www.ideasinapsis.com' },
        { label: '@ideasinapsis', href: 'https://www.instagram.com/ideasinapsis/' },
        { label: 'Linktree', href: 'https://linktr.ee/ideaSINAPSIS' },
        { label: 'WhatsApp', href: 'https://wa.me/554888204889' },
      ],
    },
    {
      name: t('team.advogadoNome'),
      designation: t('team.advogado'),
      detail: 'OAB/RN 18.256',
      imageSrc: TEAM_PHOTOS.advogado,
      bio: t('team.advogadoBio'),
      links: [
        { label: 'danielmagnus.com', href: 'https://danielmagnus.com' },
        { label: '@danielmagnusadv', href: 'https://instagram.com/danielmagnusadv' },
      ],
    },
    {
      name: 'Sergio Garcia',
      designation: t('team.sergioGarcia'),
      imageSrc: TEAM_PHOTOS.sergioGarcia,
      bio: t('team.sergioGarciaBio'),
    },
    { name: t('team.topografoNome'), designation: t('team.topografo'), imageSrc: TEAM_PHOTOS.topografo },
  ];

  return (
    <TeamSection
      className="bg-aje-paper px-0 py-14 md:py-24"
      title={t('sections.equipe.title')}
      description={t('sections.equipe.description')}
      members={TEAM}
    />
  );
}
