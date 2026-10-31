import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { Projects } from '../components/sections/Projects';
import { Experience } from '../components/sections/Experience';
import { Education } from '../components/sections/Education';
import { Certifications } from '../components/sections/Certifications';
import { Contact } from '../components/sections/Contact';

export const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col gap-28 sm:gap-36 lg:gap-44">
      {/* 00 / Hero */}
      <Hero />

      {/* 01 / About */}
      <About />

      {/* 02 / Skills & Tools */}
      <Skills />

      {/* 03 / Selected Works (Projects) */}
      <Projects />

      {/* 04 / Experience */}
      <Experience />

      {/* 05 / Academic Foundation (Education) */}
      <Education />

      {/* 06 / Credentials & Certifications */}
      <Certifications />

      {/* 07 / Direct Transmission (Contact) */}
      <Contact />
    </div>
  );
};
