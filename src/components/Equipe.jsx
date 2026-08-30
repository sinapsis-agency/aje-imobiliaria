import { useTranslation } from 'react-i18next';
import { TeamSection } from './TeamSection';
import { TEAM_PHOTOS } from '../data/images';

export default function Equipe() {
  const { t } = useTranslation();

  const TEAM = [
    { name: 'Eva', designation: t('team.eva'), detail: 'CRECI 7119-RN', imageSrc: TEAM_PHOTOS.eva },
    { name: 'João', designation: t('team.joao'), imageSrc: TEAM_PHOTOS.joao },
    { name: 'Idea Sinapsis', designation: t('team.ideaSinapsis'), imageSrc: TEAM_PHOTOS.ideaSinapsis },
    { name: t('team.advogadoNome'), designation: t('team.advogado'), imageSrc: TEAM_PHOTOS.advogado },
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
