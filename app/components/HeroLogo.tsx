import { MotionValue } from "framer-motion"
import Image from "next/image"
import { useTransform } from "framer-motion"

import { motion } from "framer-motion"

const HeroLogo = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4])
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 1.1])
    const opacity = useTransform(scrollYProgress, [0, 1.2, 1.3], [1, 1, 0])
    return (
      <motion.div 
        style={{ scale, rotate, opacity }}
        transition={{ ease: "easeOut" }}
        className="fixed left-0 right-0 md:top-1/3 top-1/4 z-50 mx-auto w-fit"
      >
          <div className="relative md:w-64 md:h-64 w-48 h-48 mb-8 rounded-full overflow-hidden bg-white shadow-xl">
            <Image
              src="/logo.webp"
              alt="Le petit marché de Bruno"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
    )
}

export default HeroLogo;