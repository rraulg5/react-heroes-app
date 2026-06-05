import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { getHeroesByPageAction } from '@/heroes/actions/get-heroes-by-page.action';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { HeroStats } from '@/heroes/components/HeroStats';
import { MyBreadcrumbs } from '@/components/custom/MyBreadcrumbs';
import { MyJumbotron } from '@/components/custom/MyJumbotron';
import { MyPagination } from '@/components/custom/MyPagination';
import { useMemo } from 'react';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') || 'all';
  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 6);

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);

  const { data: heroesResponse } = useQuery({
    queryKey: ['heroes', { page, limit }],
    queryFn: () => getHeroesByPageAction(page, limit),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

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
                  return prev;
                })
              }
            >
              All Characters (16)
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
                  return prev;
                })
              }
            >
              Heroes (12)
            </TabsTrigger>
            <TabsTrigger
              value='villains'
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'villains');
                  return prev;
                })
              }
            >
              Villains (2)
            </TabsTrigger>
          </TabsList>

          <TabsContent value='all'>
            <HeroGrid heroes={heroesResponse?.heroes} />
          </TabsContent>
          <TabsContent value='favorites'>
            <HeroGrid />
          </TabsContent>
          <TabsContent value='heroes'>
            <HeroGrid />
          </TabsContent>
          <TabsContent value='villains'>
            <HeroGrid />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <MyPagination totalPages={heroesResponse?.pages ?? 1} />
      </>
    </>
  );
};
