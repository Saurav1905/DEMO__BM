import React, { useState, useEffect } from "react"
// Styled Components
import { Container, Flex } from "../../styles/globalStyles"
//Framer Motion
import { motion, useAnimation } from "framer-motion"
//Home Component
import {
  HomeAboutSection,
  About,
  Services,
  AccordionHeader,
  AccordionContent,
  AccordionIcon,
} from "../../styles/homeStyles"
//Context
import { useGlobalStateContext } from "../../context/globalContext"
//Scroll Observer
import { useInView } from "react-intersection-observer"

// Accordion Data
const accordionIds = [
  {
    id: 0,
    title: "Web-Development",
    results: ["Frontend", "Backend", "Design"],
  },
  {
    id: 1,
    title: "App-Development",
    results: ["Flutter", "Google Firebase", "Design"],
  },
  {
    id: 2,
    title: "Marketing",
    results: ["SMM", "SEO", "Intro Videos"],
  },
  {
    id: 3,
    title: "Brand Identity",
    results: ["Logo designs", "Page theme", "Brand Colors"],
  },
]

const HomeAbout = ({ onCursor }) => {
  //Default state, using number for our id. Which ever the number/id is in the state. That will be opened.
  const [expanded, setExpanded] = useState(0)
  const animation = useAnimation()
  const [aboutRef, inView] = useInView({
    triggerOnce: true,
    // Giving our scrollwheel additional 300px before executing animation
    rootMargin: "-300px",
  })

  useEffect(() => {
    if (inView) {
      animation.start("visible")
    }
  }, [animation, inView])

  return (
    <HomeAboutSection
      ref={aboutRef}
      animate={animation}
      initial="hidden"
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] },
        },
        hidden: { opacity: 0, y: 72 },
      }}
    >
      <Container>
        <Flex alignTop>
          <About>
            <h2>
              Black Marbles tech is a group of tech devotees who accept in
              tossing out their abilities in making a difference, supporting new
              businesses/startups get their online nearness and an incredible
              boost in this cut-throat competition..
            </h2>
            <p>
              BLACK MARBLES TECH is a group of tech devotees who accept in
              tossing out their abilities in making a difference, supporting new
              businesses/startups get their online nearness and an incredible
              boost in this cut-throat competition. The inborn bunch of
              engineers, designers and marketing geniuses will make beyond any
              doubt only to stop you from dropping behind in this pacing world.
              A great group is like a back framework, upon which you'll be able
              to depend upon and we guarantee to be that for you. We are young
              minds and certainty streams in our blood. In the event that
              anything isn't in our space, we rethink our qualities, and after
              that bring it out before everyone. No hotchpotch, no if’s and
              but’s. Fair a YES!.
            </p>
          </About>
          <Services>
            <h3>Services</h3>
            {accordionIds.map((details, index) => (
              <Accordion
                key={index}
                details={details}
                expanded={expanded}
                setExpanded={setExpanded}
                onCursor={onCursor}
              />
            ))}
          </Services>
        </Flex>
      </Container>
    </HomeAboutSection>
  )
}

const Accordion = ({ details, expanded, setExpanded, onCursor }) => {
  const isOpen = details.id === expanded
  const [hovered, setHovered] = useState(false)
  const { currentTheme } = useGlobalStateContext()
  return (
    <>
      <AccordionHeader
        initial={false}
        onClick={() => setExpanded(isOpen ? false : details.id)}
        whileHover={{
          color: !isOpen && currentTheme === "dark" ? "#ffffff" : "#000000",
        }}
        onHoverStart={() => setHovered(!hovered)}
        onHoverEnd={() => setHovered(!hovered)}
        onMouseEnter={() => onCursor("hovered")}
        onMouseLeave={onCursor}
      >
        <AccordionIcon>
          <motion.span
            animate={{ rotate: isOpen || hovered ? 0 : 45, x: 3 }}
            transition={{ duration: 0.2, ease: [0.6, 0.05, -0.01, 0.9] }}
          ></motion.span>
          <motion.span
            animate={{ rotate: isOpen || hovered ? 0 : -45, x: -3 }}
            transition={{ duration: 0.2, ease: [0.6, 0.05, -0.01, 0.9] }}
          ></motion.span>
        </AccordionIcon>
        {details.title}
      </AccordionHeader>
      <AccordionContent
        key="content"
        animate={{ height: isOpen ? "100%" : "0" }}
        transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
      >
        {details.results.map((result, index) => (
          <span key={index}>{result}</span>
        ))}
      </AccordionContent>
    </>
  )
}

export default HomeAbout
