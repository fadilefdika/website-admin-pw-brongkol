// src/components/custom/CustomCard.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface CustomCardProps {
  title: string;
  description: string;
  content: string;
  trees: React.ReactNode;
  indicator: React.ReactNode;
  percentage: number;
  prefix?: string;
  suffix?: string;
  className: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, description, content, trees, indicator, percentage, prefix, suffix, className }) => (
  <Card className={className}>
    <CardHeader className="flex flex-row items-center gap-12">
      <div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      {trees}
    </CardHeader>
    <CardContent className="flex flex-row items-center justify-between">
      <p className="text-3xl font-bold">
        <span className="text-2xl mr-1">{prefix}</span>
        {content}
        <span className="text-sm font-normal text-slate-400">{suffix}</span>
      </p>
      <div className="flex flex-row items-center gap-1 text-green-500">
        {indicator}
        <p className="text-sm">{percentage}%</p>
      </div>
    </CardContent>
  </Card>
);

export default CustomCard;
