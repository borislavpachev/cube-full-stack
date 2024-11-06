import { ReactNode } from 'react';
import { Section } from './layout';

type NoDataProps = {
  main: string;
  secondary: string;
  button?: ReactNode;
};

export default function NoData({ main, secondary, button }: NoDataProps) {
  return (
    <Section>
      <p className="text-center text-xl flex items-center">{main}</p>
      <p className="text-center text-sm text-gray-500 mt-2">{secondary}</p>
      {button && <div className="mt-12">{button}</div>}
    </Section>
  );
}
