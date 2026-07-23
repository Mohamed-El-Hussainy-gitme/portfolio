"use client";

import React from "react";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import FloatingCTA from "../components/FloatingCTA";
import { useLanguage } from "@/core/i18n/LanguageContext";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { direction, language } = useLanguage();

  return (
    <div className="relative min-h-screen flex flex-col bg-white text-obsidian" dir={direction} lang={language}>
      <Navbar />
      <main className="relative flex-1 pt-16">{children}</main>
      <SiteFooter />
      <FloatingCTA />
    </div>
  );
};

export default PageLayout;
