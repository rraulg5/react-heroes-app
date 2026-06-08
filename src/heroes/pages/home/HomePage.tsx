import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { MyBreadcrumbs } from '@/components/custom/MyBreadcrumbs';
import { MyJumbotron } from '@/components/custom/MyJumbotron';
import { MyPagination } from '@/components/custom/MyPagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { HeroGrid } from '@/heroes/components/HeroGrid';
import { HeroStats } from '@/heroes/components/HeroStats';
import { useHeroSummary } from '@/heroes/hooks/useHeroSummary';
import { useHeroPaginated } from '@/heroes/hooks/useHeroPaginated';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') || 'all';
  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 6);
  const category = searchParams.get('category') || 'all';

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);

  const { data: heroesResponse } = useHeroPaginated(page, limit, category);

  const { data: summaryResponse } = useHeroSummary();

  return (
    <>
      <>
        {/* Header */}
        <MyJumbotron
          title='Superhero Universe'
          description='Discover, explore, and manage your favorite superheroes and villains'
        />

        {/* Breadcrumbs */}
        <MyBreadcrumbs currentPage='Home' />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className='mb-8'>
          <TabsList className='grid w-full grid-cols-4'>
            <TabsTrigger
              value='all'
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'all');
                  prev.set('category', 'all');
                  prev.set('page', '1');
                  return prev;
                })
              }
            >
              All Characters ({summaryResponse?.totalHeroes ?? '-'})
            </TabsTrigger>
            <TabsTrigger
              value='favorites'
              className='flex items-center gap-2'
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'favorites');
                  return prev;
                })
              }
            >
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger
              value='heroes'
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'heroes');
                  prev.set('category', 'hero');
                  prev.set('page', '1');
                  return prev;
                })
              }
            >
              Heroes ({summaryResponse?.heroCount ?? '-'})
            </TabsTrigger>
            <TabsTrigger
              value='villains'
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'villains');
                  prev.set('category', 'villain');
                  prev.set('page', '1');
                  return prev;
                })
              }
            >
              Villains ({summaryResponse?.villainCount ?? '-'})
            </TabsTrigger>
          </TabsList>

          <TabsContent value='all'>
            <HeroGrid heroes={heroesResponse?.heroes} />
          </TabsContent>
          <TabsContent value='favorites'>
            <HeroGrid />
          </TabsContent>
          <TabsContent value='heroes'>
            <HeroGrid heroes={heroesResponse?.heroes} />
          </TabsContent>
          <TabsContent value='villains'>
            <HeroGrid heroes={heroesResponse?.heroes} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <MyPagination totalPages={heroesResponse?.pages ?? 1} />
      </>
    </>
  );
};
