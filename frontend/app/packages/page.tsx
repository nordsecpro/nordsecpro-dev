import React from 'react';
import LitePackagesSection from '@/components/packages/liteSection';
import AdvancedPackageSection from '@/components/packages/advanceSection';

const PackagesPage = () => {
  return (
    <>
      <LitePackagesSection seeAll={false} />
      <AdvancedPackageSection />
    </>
  );
};

export default PackagesPage;
