import React from 'react'
import { HighLightText } from '../components/core/homePage/HighLightText'
import Aboutus1 from '../assests/Images/aboutus1.webp'
import Aboutus2 from '../assests/Images/aboutus2.webp'
import Aboutus3 from '../assests/Images/aboutus3.webp'
import { Quote } from '../components/core/AboutPage/Quote'
import FoundingStory from '../assests/Images/FoundingStory.png'
import { StatsComponent } from '../components/core/AboutPage/StatsComponent'
import { LearningGrid } from '../components/core/AboutPage/LearningGrid'
import { ContactForm } from '../components/core/AboutPage/ContactForm'
import Footer from '../../src/components/common/Footer'

export const About = () => {
  return (
    <div className='flex flex-col'>
      <section className='flex flex-col items-center justify-center'>
        <div className='w-11/12 max-w-maxContent  text-white flex flex-col items-center justify-center gap-y-14 mt-20'>
          <div className='w-[70%] flex flex-col items-center justify-center gap-5'>
            <h1 className='text-4xl font-semibold text-center'>Driving Innovation in Online Education for a<HighLightText text={"Brighter Future"} /></h1>
            <p className='text-richblack-500 w-[80%] text-center'>Studynotion is at the forefront of driving innovation in online education.We're passionate about creating a brighter future by offering cutting-edge courses, levaraging emerging technologies, and nurturing a vibrant learing community</p>
          </div>
      
        <div className='flex lg:flex-row sm:flex-col w-[100%] justify-between items-center sm:gap-5'>
          <img src={Aboutus1}/>
          <img src={Aboutus2}/>
          <img src={Aboutus3}/>
        </div>
        </div>
      </section>


      <section className='text-white text-2xl font-semibold flex flex-col items-center gap-y-10'>
        <div className='w-[60%] mt-20'>
           <Quote/>
        </div>
      </section>


      <section className='text-white  flex flex-col mt-40 items-center '>
        <div className='flex flex-col gap-y-36 w-11/12 max-w-maxContent items-center justify-center'>
          <div className='flex lg:flex-row sm:flex-col gap-10 items-center justify-between'>
            <div className='flex flex-col gap-10 w-[50%]'>
              <h1 className='text-3xl font-semibold text-pink-300'>Our Founding Story</h1>
              <p >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda aspernatur consequatur molestiae incidunt dolores adipisci ipsum inventore totam fugiat provident! Est, odit nobis. Obcaecati, nam! Quia deleniti temporibus libero unde soluta ducimus quos aliquid recusandae vero molestiae, excepturi provident cupiditate officia consectetur, quis eaque omnis delectus reprehenderit dolore, assumenda culpa illo ipsa impedit accusantium! Dolore, </p>
              
              <p className='text-sm'>
              veritatis quod! Eveniet aspernatur commodi nemo cum alias cupiditate inventore officia dicta! Dolorum, rerum. Officia rerum laudantium obcaecati tempore, ratione nostrum vel optio beatae harum ut veritatis at nihil temporibus ullam totam perspiciatis voluptatem dicta corporis ad doloribus natus et. Facilis facere similique assumenda pariatur libero hic, voluptate illo eveniet soluta laborum cupiditate eius in enim velit porro. Tempore in quos temporibus recusandae vel inventore neque est soluta molestiae corrupti!
              </p>
            </div>

            <div className='w-[50%]'>
              <img src={FoundingStory} width={800}/>
            </div>
          </div>

          <div className='flex lg:flex-row sm:flex-col justify-between gap-20'>
            <div className='flex flex-col gap-y-10'>
              <h1 className='text-3xl font-semibold text-pink-300'>Our Vision</h1>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione amet, facilis dicta consequuntur, ea perspiciatis illo delectus non est itaque velit alias commodi omnis modi qui adipisci soluta, fuga quo sint hic. Fugit expedita rem, quod tempora, harum ipsum fugiat itaque doloremque necessitatibus reiciendis dolor magnam omnis praesentium numquam dolorum, debitis nisi vitae iste fuga saepe ad hic eum esse aperiam! Repudiandae dolor dolorem molestiae voluptatum doloremque esse ex. Culpa.</p>
            </div>

            <div className='flex flex-col  gap-y-10'>
              <h1 className='text-3xl font-semibold text-pink-300'>Our Mission</h1>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi repudiandae ipsa provident, debitis sunt et quasi fugit quibusdam. Maiores iusto fugit laborum quidem id ut suscipit ducimus, aliquid quam aspernatur quos praesentium sit adipisci! Optio ratione quia laboriosam deleniti dolore, molestias maiores repudiandae nisi, suscipit vitae perspiciatis. Cupiditate harum explicabo praesentium sit exercitationem. Quae beatae minima, veniam magnam corporis dignissimos facilis? Ad repellendus sint tempore ducimus debitis deleniti velit natus.</p>
            </div>
          </div>
        </div>
      </section>

      <StatsComponent/>

      <section className='w-full flex flex-col items-center justify-center'>
        <LearningGrid/>
        <ContactForm/>
      </section>

      <Footer/>
    </div>
  )
}
