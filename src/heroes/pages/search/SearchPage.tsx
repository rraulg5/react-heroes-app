import { HeroStats } from '@/heroes/components/HeroStats';
import { MyJumbotron } from '@/components/custom/MyJumbotron';

export const SearchPage = () => {
  return (
    <>
      {/* Header */}
      <MyJumbotron
        title='Search your hero'
        description='Find your favorite hero'
      />

      {/* Stats Dashboard */}
      <HeroStats />
    </>
  );
};
