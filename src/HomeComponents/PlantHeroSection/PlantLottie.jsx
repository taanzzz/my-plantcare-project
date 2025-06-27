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
    Aos.init({ duration: 800, once: true }); 

    const loadAnimations = async () => {
      const loadedTips = await Promise.all(
        Tips.map(async (tip) => {
          try {
            const res = await fetch(tip.src);
            if (!res.ok) throw new Error(`Failed to load ${tip.src}`);
            const animationData = await res.json();
            return { ...tip, animationData };
          } catch (error) {
            console.error(`Error loading Lottie file: ${tip.src}`, error);
      
            return tip;
          }
        })
      );
      setTips(loadedTips);
    };

    loadAnimations();
  }, []);

  return (
    <section className="py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h2
  className="text-4xl md:text-5xl font-bold text-center  mb-12"
  data-aos="fade-up"
>
  🌿 Plant Care Tips
</h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {tips.map((tip, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white dark:bg-zinc-800 shadow-xl rounded-2xl p-6 flex flex-col items-center text-center transition-transform duration-300 transform hover:scale-[1.03] border border-gray-200 dark:border-zinc-700"
            >
              <div className="w-36 h-36 mb-4">
                {tip.animationData ? (
                  <Lottie animationData={tip.animationData} loop={true} />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-zinc-700 rounded-full flex items-center justify-center text-gray-500 dark:text-zinc-500 text-xs">
                    <p>Loading...</p>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{tip.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlantLottieTips;