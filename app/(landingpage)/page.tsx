'use client'

import Navbar from "../../components/landingpage/Navbar"
import CallToAction from "../../components/landingpage/CallToAction"
import WhyChooseUsSection from "../../components/landingpage/WhyChooseUsSection"
import FeaturedBook from "../../components/landingpage/Featured"
import HeroSection from "../../components/landingpage/HeroSection"
import StackedCards from "../../components/landingpage/StackedCards"
import FeedbackBot from "../../components/FeedbackBot"



export default function Homepage() {


  return (
    <div>
      <Navbar />

      <section id="Home">
        <HeroSection />
      </section>

      <section id="Feature">
        <WhyChooseUsSection />
      </section>
      
      <section id="StackedCards">
        <StackedCards />
      </section>
      
      <section id="Template">
        <FeaturedBook />
      </section>

      <section id="Contact">
        <CallToAction />
      </section>
      
      <FeedbackBot/>  
    </div>
  )
}

