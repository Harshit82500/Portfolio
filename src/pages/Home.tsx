import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Projects } from '../components/sections/Projects';
import { WhatIDo } from '../components/sections/WhatIDo';
import { Experience } from '../components/sections/Experience';
import { Skills } from '../components/sections/Skills';
import { Education } from '../components/sections/Education';
import { Contact } from '../components/sections/Contact';

export const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col gap-20 sm:gap-28 lg:gap-36">
      {/* 00 / Hero Overview */}
      <Hero />

      {/* 01 / Selected Work (Projects) */}
      <Projects />

      {/* 02 / What I Do (Focus Domains) */}
      <WhatIDo />

      {/* 03 / Experience (Full Dark Ink Section) */}
      <Experience />

      {/* 04 / Skills & Certifications */}
      <Skills />

      {/* 05 / Academic Foundation (Education) */}
      <Education />

      {/* 06 / Transmission & Contact */}
      <Contact />
    </div>
  );
};
