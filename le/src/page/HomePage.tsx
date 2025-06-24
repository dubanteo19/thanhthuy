import { ImageContainer } from "@/components/common/ImageContainer";
import { InstagramIcon } from "@/components/icons/instagram";
import { TikTokIcon } from "@/components/icons/tiktok";
import { motion } from "motion/react";
import { LocationEdit, MailIcon } from "lucide-react";
import Typewriter from "typewriter-effect";
import type { IConLink } from "@/type/icon-button";
export const HomePage = () => {
  const avatar =
    "https://cdn.beacons.ai/user_content/gqU47xv5rmd9VjSco893Suvjnqg1/profile_bachthao114.png?t=1697446690247";
  const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };
  const iconLinks: IConLink[] = [
    { icon: MailIcon, href: "" },
    {
      icon: TikTokIcon,
      href: "https://www.tiktok.com/@_bthaodiary?is_from_webapp=1&sender_device=pc",
    },
    {
      icon: InstagramIcon,
      href: "https://www.instagram.com/_bthaodiary/",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col space-y-2 items-center "
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <ImageContainer
          className="rounded-full size-20 shadow-lg"
          src={avatar}
        />
      </motion.div>

      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-semibold text-lg"
      >
        @_bthaodiary
      </motion.h2>

      <div className="flex text-gray-500 text-sm items-center">
        <LocationEdit size={15} />
        <span>Tp.HCM</span>
      </div>
      <motion.div variants={item} className="h-6 text-center text-sm">
        <Typewriter
          options={{
            strings: [
              "Aesthetic desk-setups",
              "Study vibes ✏️",
              "Unboxing addict 📦",
              "Honest reviews ⭐",
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 30,
            delay: 45,
          }}
        />
      </motion.div>
      <motion.div variants={item} className="flex space-x-4">
        {iconLinks.map(({ icon: Icon, href }, i) =>
          href ? (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-600 inline-block"
            >
              <Icon />
            </motion.a>
          ) : (
            <motion.div
              key={i}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-600 inline-block"
            >
              <Icon />
            </motion.div>
          ),
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.2, 0.8, 0.2, 1], // smooth cubic-bezier
          delay: 0.3,
        }}
        whileHover={{
          scale: 1.04,
          rotate: [-1, 1, 0],
          transition: { type: "spring", stiffness: 120 },
        }}
        className="w-[320px] rounded-3xl bg-gradient-to-br from-pink-100 to-pink-300 p-6 shadow-lg border border-pink-300 transition-all duration-300"
      >
        <h2 className="mb-3 text-center text-xl font-extrabold  tracking-wide">
          Hey there! 👋
        </h2>
        <p className="text-center text-[14px] leading-relaxed text-gray-700">
          I'm a creative freelancer who loves curating{" "}
          <span className="font-medium text-pink-800">
            aesthetic desk setups
          </span>
          , sharing <span className="italic">study vibes</span>, unboxing the
          latest goodies 📦, and giving honest reviews . Let's work together to
          make your brand stand out! 💡
        </p>
      </motion.div>
    </motion.div>
  );
};
