import { HeroStats } from '@/heroes/components/HeroStats';
import { MyBreadcrumbs } from '@/components/custom/MyBreadcrumbs';
import { MyJumbotron } from '@/components/custom/MyJumbotron';
import { SearchControls } from './ui/SearchControls';

export const SearchPage = () => {
  return (
    <>
      {/* Header */}
      <MyJumbotron
        title='Search your hero'
        description='Find your favorite hero'
      />

      {/* Breadcrumbs */}
      <MyBreadcrumbs
        currentPage='Search'
        // breadcrumbs={[
        //   { label: 'Home1', to: '/' },
        //   { label: 'Home2', to: '/' },
        //   { label: 'Home3', to: '/' },
        // ]}
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Search Controls */}
      <SearchControls />
    </>
  );
};
