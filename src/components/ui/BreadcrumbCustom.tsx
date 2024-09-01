import React from 'react';
import { Breadcrumb, BreadcrumbSeparator, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbPage } from '@/components/ui/breadcrumb';

interface BreadcrumbCustomProps {
  title: string;
  href: string;
  curentPage: string;
}

const BreadcrumbCustom = ({ title, href, curentPage }: BreadcrumbCustomProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{curentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbCustom;
