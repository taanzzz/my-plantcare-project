import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import Aos from "aos";
import Lottie from "lottie-react";


const Tips = [
  {
    title: "Maintain Moisture Balance",
    desc: "Ensure the soil stays lightly moist—avoid both overwatering and dryness to prevent stress.",
    src: "/plant-water.json",
  },
  {
    title: "Optimize Sunlight Exposure",
    desc: "Give your plant access to sufficient light—prefer indirect bright light for healthy growth.",
    src: "/plant-sunlight.json",
  },
  {
    title: "Trim Dead Foliage",
    desc: "Remove yellowing or wilted leaves to boost airflow and channel nutrients to thriving areas.",
    src: "/plant-prune.json",
  },
  {
    title: "Inspect for Insects",
    desc: "Check the undersides of leaves regularly for early signs of pests like mites or aphids.",
    src: "/plant-pests.json",
  },
  {
    title: "Apply Fertilizer Moderately",
    desc: "Use balanced nutrients during the growing season, but avoid overfeeding to protect roots.",
    src: "/plant-fertilizer.json",
  },
  {
    title: "Repot for Root Health",
    desc: "Shift to a larger pot when roots crowd—this improves growth and nutrient absorption.",
    src: "/plant-repot.json",
  },
];

const PlantLottieTips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    Aos.init({ duration: 800 });

    const loadAnimations = async () => {
      const loadedTips = await Promise.all(
        Tips.map(async (tip) => {
          const res = await fetch(tip.src);
          const animationData = await res.json();
          return { ...tip, animationData };
        })
      );
      setTips(loadedTips);
    };

    loadAnimations();
  }, []);

  return (
    <section className="py-16 px-6 md:px-20 ">
      <h2
        className="text-4xl font-bold text-center mb-12"
        data-aos="fade-up"
      >
        🌿Plant Care Tips
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {tips.map((tip, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="bg-white dark:bg-green-900 shadow-xl rounded-2xl p-6 flex flex-col items-center text-center hover:scale-[1.03] transition-transform duration-300"
          >
            <div className="w-32 h-32 mb-4">
              <Lottie animationData={tip.animationData} loop={true} />
            </div>
            <h3 className="text-xl font-bold text-green-700 dark:text-green-200">{tip.title}</h3>
            <p className="text-green-600 dark:text-green-100 text-sm mt-2">{tip.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlantLottieTips;
