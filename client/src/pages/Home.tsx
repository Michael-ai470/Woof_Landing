import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * WOOF: The Canine Manifesto - Landing Page
 * Design Philosophy: Ultra-Minimalist Luxury
 * - Deep charcoal background with gold accents
 * - Serif typography (Garamond) for prestige
 * - Asymmetric layout with diagonal transitions
 * - Slow, deliberate animations
 */

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const peerReviews = [
    {
      quote:
        "A groundbreaking work that redefines our understanding of interspecies communication.",
      author: "Dr. Felis Catus",
      title: "Professor of Feline Linguistics, University of Yarn Ball",
    },
    {
      quote:
        "Sir Barks-a-Lot has penned a masterpiece. My own research on the semiotics of the squeaky toy pales in comparison.",
      author: "Prof. Hamster Wheel",
      title: "Institute of Rodent Ruminations",
    },
    {
      quote:
        "Finally, a manifesto that speaks to the soul of every good boy. Five paws up!",
      author: "Alpha Wolf",
      title: "Emeritus Professor of Pack Dynamics, Howl-vard University",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-sm bg-background/80 border-b border-border">
        <div className="container py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold tracking-wider"
            style={{ fontFamily: "Garamond, serif" }}
          >
            WOOF
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-500"
            >
              Secure the Manifesto
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video bg-card rounded-none border border-border overflow-hidden group">
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-transparent flex items-center justify-center relative">
                  {/* Placeholder for video - replace with actual video embed */}
                  <div className="text-center">
                    <div
                      className="text-6xl font-bold text-accent mb-4"
                      style={{ fontFamily: "Garamond, serif" }}
                    >
                      ▶
                    </div>
                    <p className="text-muted-foreground text-sm">
                      [Video Hero Placeholder]
                    </p>
                    <p className="text-muted-foreground text-xs mt-2">
                      "The Silence of the Good Boy" - 30 seconds
                    </p>
                  </div>
                </div>
              </div>
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 border border-accent pointer-events-none"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(212, 175, 55, 0.1)",
                    "0 0 40px rgba(212, 175, 55, 0.2)",
                    "0 0 20px rgba(212, 175, 55, 0.1)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            {/* Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <p className="text-accent text-sm tracking-widest uppercase">
                  A Conceptual Manifesto
                </p>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-6xl lg:text-7xl font-bold leading-tight"
                style={{ fontFamily: "Garamond, serif" }}
              >
                WOOF
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-muted-foreground leading-relaxed"
              >
                A Phonetic Exploration of the Good Boy
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-lg leading-relaxed max-w-md"
              >
                For centuries, humanity has grappled with the profound mysteries
                of our four-legged companions. Discover the groundbreaking
                academic parody that finally unveils the true linguistic and
                philosophical depth of dog-kind.
              </motion.p>

              <motion.div variants={itemVariants} className="pt-4">
                <a
                  href="https://selar.co"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg transition-all duration-500 group"
                    size="lg"
                  >
                    Secure the Manifesto
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="pt-8 border-t border-border"
              >
                <p className="text-sm text-muted-foreground">
                  By <span className="text-accent font-semibold">Sir Barks-a-Lot</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Translated from Canine to English by Michael Ajibola
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Diagonal Divider */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-card"
          style={{
            clipPath: "polygon(0 50%, 100% 0, 100% 100%, 0 100%)",
          }}
        />
      </section>

      {/* Academic Introduction Section */}
      <section className="py-20 bg-card relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2
              className="text-4xl font-bold mb-8"
              style={{ fontFamily: "Garamond, serif" }}
            >
              The Semiotics of the Bark
            </h2>

            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                In the annals of interspecies communication, few phenomena have
                captivated human and canine scholars alike as profoundly as the
                bark. Far from being a mere guttural expulsion, the bark, in its
                myriad forms, represents a complex semiotic system, a nuanced
                lexicon of intent, emotion, and situational awareness.
              </p>

              <p>
                This treatise endeavors to dissect the intricate layers of
                meaning embedded within the canine vocalization, moving beyond
                anthropocentric interpretations to embrace a truly zoosemiotic
                perspective. We posit that the bark, ranging from the sharp,
                declarative "WOOF!" to the subtle, interrogative "woof?",
                functions as a primary communicative unit.
              </p>

              <p>
                Furthermore, this exploration extends to the often-underestimated
                linguistic complexity of the tail wag. While seemingly a simple
                kinetic expression, the velocity, amplitude, and directional
                vectors of the tail wag constitute a sophisticated non-verbal
                dialect.
              </p>
            </div>

            {/* Academic Citation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-border"
            >
              <p className="text-sm text-muted-foreground italic">
                [1] Fido, A. (2023). <span className="text-accent">The Ontological Significance of the Squirrel Chase</span>. Journal of Applied Sniffing, 1(1), 1-15.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Peer Reviews Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2
              className="text-4xl font-bold"
              style={{ fontFamily: "Garamond, serif" }}
            >
              Praise for WOOF
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {peerReviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-card p-8 border border-border hover:border-accent transition-all duration-500 group"
              >
                {/* Opening Quote */}
                <div className="text-4xl text-accent mb-4 group-hover:text-accent/80 transition-colors">
                  "
                </div>

                <p className="text-lg leading-relaxed mb-6 italic">
                  {review.quote}
                </p>

                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-accent">{review.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {review.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Look Inside Section */}
      <section className="py-20 bg-card relative overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2
              className="text-4xl font-bold"
              style={{ fontFamily: "Garamond, serif" }}
            >
              What's Inside
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              100 pages of pure canine expression, meticulously crafted and
              presented in luxury edition format.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "The Scholarly Introduction",
                description: "500 words of impeccably footnoted academic treatise",
              },
              {
                title: "95 Pages of Dog Speak",
                description:
                  "From Aggressive Barks to Sleepy Whimpers to Long Howls",
              },
              {
                title: "Visual Tail-Wag Waveforms",
                description:
                  "Abstract graphical representations of canine kinetic energy",
              },
              {
                title: "Index of Barks",
                description:
                  "Pseudo-scientific guide categorizing vocalizations by frequency",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
                className="p-6 bg-background border border-border hover:border-accent transition-all duration-500"
              >
                <h3 className="font-semibold text-lg mb-3 text-accent">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Diagonal Divider */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background"
          style={{
            clipPath: "polygon(0 0, 100% 50%, 100% 100%, 0 100%)",
          }}
        />
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2
              className="text-5xl font-bold mb-6"
              style={{ fontFamily: "Garamond, serif" }}
            >
              Ready to Understand the Canine Mind?
            </h2>

            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Join thousands of dog lovers, academics, and absurdist humor
              enthusiasts who have already discovered the profound wisdom of
              WOOF: The Canine Manifesto.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <a
                href="https://selar.co"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-7 text-xl transition-all duration-500 group"
                  size="lg"
                >
                  Secure the Manifesto - $14.99
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>

            <p className="text-sm text-muted-foreground mt-8">
              Available on Selar and Gumroad • First Edition Digital Release
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-card">
        <div className="container flex justify-between items-center text-sm text-muted-foreground">
          <p>© 2026 Sir Barks-a-Lot. All rights reserved.</p>
          <p>Translated from Canine to English by Michael Ajibola</p>
        </div>
      </footer>
    </div>
  );
}
