import React from 'react'
import PlantSlider from '../../HomeComponents/PlantSlider/PlantSlider'
import PlantCareTips from '../../HomeComponents/PlantCareTips/PlantCareTips'
import PlantLottie from '../../HomeComponents/PlantHeroSection/PlantLottie'
import PlantInspoPro from '../../HomeComponents/PlantsAdvantage/PlantInspoPro'



const Home = () => {
  return (
    <div>
      <PlantSlider></PlantSlider>
      <PlantCareTips></PlantCareTips>
     <PlantLottie></PlantLottie>
     <PlantInspoPro></PlantInspoPro>
      
    </div>
  )
}

export default Home
