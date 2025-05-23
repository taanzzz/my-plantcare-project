import React from 'react'
import PlantSlider from '../../HomeComponents/PlantSlider/PlantSlider'
import PlantCareTips from '../../HomeComponents/PlantCareTips/PlantCareTips'
import PlantLottie from '../../HomeComponents/PlantHeroSection/PlantLottie'
import PlantInspoPro from '../../HomeComponents/PlantsAdvantage/PlantInspoPro'
import AllPlantDetails from '../../HomeComponents/PlantDecoration/AllPlantDetails'



const Home = () => {
  return (
    <div>
      <AllPlantDetails></AllPlantDetails>
      <PlantSlider></PlantSlider>
      <PlantCareTips></PlantCareTips>
     <PlantLottie></PlantLottie>
     <PlantInspoPro></PlantInspoPro>
      
    </div>
  )
}

export default Home
