import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { HeroGrid } from '@/heroes/components/HeroGrid';
import { HeroStats } from '@/heroes/components/HeroStats';
import { MyBreadcrumbs } from '@/components/custom/MyBreadcrumbs';
import { MyJumbotron } from '@/components/custom/MyJumbotron';
import { MyPagination } from '@/components/custom/MyPagination';
import { getHeroesByPageAction } from '@/heroes/actions/get-heroes-by-page.action';

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'favorites' | 'heroes' | 'villains'
  >('all');

  const { data } = useQuery({
    queryKey: ['heroes'],
    queryFn: () => getHeroesByPageAction(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  console.log({ data });

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
        <Tabs value={activeTab} className='mb-8'>
          <TabsList className='grid w-full grid-cols-4'>
            <TabsTrigger value='all' onClick={() => setActiveTab('all')}>
              All Characters (16)
            </TabsTrigger>
            <TabsTrigger
              value='favorites'
              className='flex items-center gap-2'
              onClick={() => setActiveTab('favorites')}
            >
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value='heroes' onClick={() => setActiveTab('heroes')}>
              Heroes (12)
            </TabsTrigger>
            <TabsTrigger
              value='villains'
              onClick={() => setActiveTab('villains')}
            >
              Villains (2)
            </TabsTrigger>
          </TabsList>

          <TabsContent value='all'>
            <HeroGrid />
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
        <MyPagination totalPages={5} />
      </>
    </>
  );
};
