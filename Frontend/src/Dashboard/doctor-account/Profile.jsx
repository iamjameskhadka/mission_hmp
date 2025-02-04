/*eslint-disable react/prop-type */
import React, { useEffect } from 'react'
import { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import uploadImageToCloudinary from './../../utils/uploadCloudinary'
import { BASE_URL, token } from './../../config'
import { toast } from 'react-toastify'

const Profile = ({ doctorData }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    bio: '',
    gender: '',
    specialization: '',
    ticketPrice: 0,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: '',
    photo: null,
  })


  useEffect(() => {
    setFormData({
      name: doctorData?.name,
      email: doctorData?.email,
      phone: doctorData?.phone,
      bio: doctorData?.bio,
      gender: doctorData?.gender,
      specialization: doctorData?.specialization,
      ticketPrice: doctorData?.ticketPrice,
      qualifications: doctorData?.qualifications,
      experiences: doctorData?.experiences,
      timeSlots: doctorData?.timeSlots,
      about: doctorData?.about,
      photo: doctorData?.photo,

    })
  }, [doctorData])


  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileInputChange = async event => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    //console.log(data);
    setFormData({ ...formData, photo: data?.url })

  }


  //function to update profile settiing
  const updateProfileHandler = async e => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const result = await res.json()
      if (!res.ok) {
        throw Error(result.message)
      }

      toast.success(result.message)
    } catch (err) {
      toast.error(err.message)
    }
  }

  //reuseable function for adding item
  const addItem = (key, item) => {
    setFormData(prevFormData => ({ ...prevFormData, [key]: [...prevFormData[key], item] }))

  }

  //reuseable input change
  const handleReuseableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target

    setFormData(prevFormData => {
      const updateItems = [...prevFormData[key]]
      updateItems[index][name] = value;
      return {
        ...prevFormData, [key]: updateItems,
      }
    })
  }

  //reuseable function fordeleting data
  const deleteItem = (key, index) => {
    setFormData(prevFormData => ({
      ...prevFormData, [key]: prevFormData[key].filter((_, i) => i != index)
    }))
  }


  //================= qualifications function =================
  const addQualification = e => {
    e.preventDefault();
    addItem('qualifications', {
      startingDate: '',
      endingDate: '',
      degree: 'MBBS',
      university: 'Pokhara University (PU)'
    })
  }

  const handleQualificationChange = (event, index) => {
    handleReuseableInputChangeFunc('qualifications', index, event)
  }
  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem('qualifications', index)
  }


  //================== experience function ================
  const addExperience = e => {
    e.preventDefault();
    addItem('experiences', {
      startingDate: '',
      endingDate: '',
      position: 'Senior Surgeon',
      hospital: 'B&C medical collage and RC',
    })
  }

  const handleExperienceChange = (event, index) => {
    handleReuseableInputChangeFunc('experiences', index, event)
  }
  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem('experiences', index)
  }


  // ================= time slots  function =================
  const addTimeSlot = e => {
    e.preventDefault();
    addItem('timeSlots', {
      day: 'Sunday',
      startingTime: '10:00 ',
      endingTime: '04:30 '
    })
  }

  const handleTimeSlotChange = (event, index) => {
    handleReuseableInputChangeFunc('timeSlots', index, event)
  }
  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem('timeSlots', index)
  }




  return (
    <div>
      <h2 className='text-headingColor font-bold  text-[24px] leading-9 mb-10'>Profile Information</h2>

      <form action="">
        {/* ============ name =============== */}
        <div className='mb-5'>
          <p className='form__label'>Name*</p>
          <input type="text" name='name' value={formData.name} onChange={handleInputChange} placeholder='Full Name' className='form__input rounded-lg' />
        </div>

        {/* ============ email =============== */}
        <div className='mb-5'>
          <p className='form__label'>Email*</p>
          <input type="email" name='email' value={formData.email} onChange={handleInputChange} placeholder='Email' className='form__input rounded-lg' readOnly aria-readonly disabled={true} />
        </div>

        {/* ============ phone =============== */}
        <div className='mb-5'>
          <p className='form__label'>Phone Number*</p>
          <input type="number" name='phone' value={formData.phone} onChange={handleInputChange} placeholder='Phone Number' className='form__input rounded-lg' />
        </div>

        {/* ============ bio =============== */}
        <div className='mb-5'>
          <p className='form__label'>Bio*</p>
          <input type="text" name='bio' value={formData.bio} onChange={handleInputChange} placeholder='Bio' className='form__input rounded-lg' maxLength={100} />
        </div>


        <div className="mb-5">
          <div className='grid grid-cols-3 gap-5 mb-[30px]'>
            {/* ================  gender=============== */}
            <div>
              <p className='form__label'>Gender*</p>
              <select name="gender" value={formData.gender} onChange={handleInputChange} className='form__input py-3.5 rounded-lg'>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* ================  specialization =============== */}
            <div>
              <p className='form__label'>Specialization*</p>
              <select name="specialization" value={formData.specialization} onChange={handleInputChange} className='form__input py-3.5 rounded-lg'>
                <option value="">Select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>

            {/* ================  Ticket Price =============== */}
            <div>
              <p className='form__label'>Ticket Price*</p>
              <input type="number" placeholder='$ 100' name='ticketPrice' value={formData.ticketPrice} className='form__input rounded-lg' onChange={handleInputChange} />
            </div>
          </div>
        </div>

        {/* =========== Qualifications ============== */}
        <div className='mb-5 '>
          <p className='form__label'>Qualifications*</p>
          {formData.qualifications?.map((items, index) => (<div key={index}>

            {/* ================ timings ============= */}
            <div>
              <div className='grid grid-cols-2 gap-5'>
                <div>
                  <p className="form__label">Starting Date*</p>
                  <input type="date" name='startingDate' value={items.startingDate} className='form__input rounded-lg' onChange={e => handleQualificationChange(e, index)} />
                </div>

                <div>
                  <p className="form__label">Ending Date*</p>
                  <input type="date" name='endingDate' value={items.endingDate} className='form__input rounded-lg' onChange={e => handleQualificationChange(e, index)} />
                </div>
              </div>

              {/* ===========degreee ============== */}
              <div className='grid grid-cols-2 gap-5 mt-5'>
                <div>
                  <p className="form__label">Degree*</p>
                  <input type="text" name='degree' value={items.degree} className='form__input rounded-lg' onChange={e => handleQualificationChange(e, index)} />
                </div>


                {/* ===================== university ================== */}
                <div>
                  <p className="form__label">University*</p>
                  <input type="text" name='university' value={items.university} className='form__input rounded-lg' onChange={e => handleQualificationChange(e, index)} />
                </div>
              </div>

              <button className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'><AiOutlineDelete onClick={e => deleteQualification(e, index)} /></button>
            </div>
          </div>
          ))}
          <button onClick={addQualification} className='bg-green-700 py-2 px-5 rounded-lg text-white h-fit cursor-pointer'>Add Qualifications</button>
        </div>

        {/* =========== Experiences ============== */}
        <div className='mb-5 '>
          <p className='form__label'>Experiences*</p>
          {formData.experiences?.map((items, index) => <div key={index}>

            {/* ================ timings ============= */}
            <div>
              <div className='grid grid-cols-2 gap-5'>
                <div>
                  <p className="form__label">Starting Date*</p>
                  <input type="date" name='startingDate' value={items.startingDate} className='form__input rounded-lg' onChange={e => handleExperienceChange(e, index)} />
                </div>

                <div>
                  <p className="form__label">Ending Date*</p>
                  <input type="date" name='endingDate' value={items.endingDate} className='form__input rounded-lg' onChange={e => handleExperienceChange(e, index)} />
                </div>
              </div>

              {/* ===========position ============== */}
              <div className='grid grid-cols-2 gap-5 mt-5'>
                <div>
                  <p className="form__label">Position*</p>
                  <input type="text" name='position' value={items.position} className='form__input rounded-lg' onChange={e => handleExperienceChange(e, index)} />
                </div>


                {/* ===================== Hospital ================== */}
                <div>
                  <p className="form__label">Hospital*</p>
                  <input type="text" name='hospital' value={items.hospital} className='form__input rounded-lg' onChange={e => handleExperienceChange(e, index)} />
                </div>
              </div>

              <button className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'><AiOutlineDelete onClick={e => deleteExperience(e, index)} /></button>
            </div>
          </div>
          )}

          <button onClick={addExperience} className='bg-green-700 py-2 px-5 rounded-lg text-white h-fit cursor-pointer'>Add Experiences</button>
        </div>


        {/* =========== Time Slots ============== */}
        <div className='mb-5 '>
          <p className='form__label'>Time Slots*</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>

              {/* ================ timings ============= */}
              <div>
                <div className='grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5'>
                  <div>
                    <p className="form__label">Day*</p>
                    <select name="day" value={item.day} className='form__input py-3.5 rounded-lg' onChange={e => handleTimeSlotChange(e, index)}>
                      <option value="">Select</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                    </select>
                  </div>

                  <div>
                    <p className="form__label">Starting Time*</p>
                    <input type='time' name='startingTime' value={item.startingTime} className='form__input rounded-lg' onChange={e => handleTimeSlotChange(e, index)} />
                  </div>

                  <div>
                    <p className="form__label">Ending Time*</p>
                    <input type="time" name='endingTime' value={item.endingTime} className='form__input rounded-lg' onChange={e => handleTimeSlotChange(e, index)} />
                  </div>
                  <div className='flex items-center'>
                    <button className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-6  cursor-pointer'><AiOutlineDelete onClick={e => deleteTimeSlot(e, index)} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={addTimeSlot} className='bg-green-700 py-2 px-5 rounded-lg text-white h-fit cursor-pointer'>Add TimeSlots</button>
        </div>

        {/*============== about ============ */}
        <div className='mb-5'>
          <p className='form__label'>About*</p>
          <textarea name="about" rows={5} value={formData.about} placeholder='Write About You......' onChange={handleInputChange} className='form__input rounded-lg' ></textarea>
        </div>

        {/* ========== photo field ============= */}
        <div className='mb-5 flex items-center gap-3'>
          {formData.photo && (
            <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-irisBlueColor flex items-center justify-center'>
              <img src={formData.photo} alt="doc image" className='w-full rounded-full' />
            </figure>
          )}

          <div className='relative w-[130px] h-[50px]'>
            <input type="file"
              name='photo'
              id='customFile'
              onChange={handleFileInputChange}
              accept='.jpg , .png, .jpeg'
              className='text-irisBlueColor absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' />

            <label htmlFor='customFile' className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] text-[15px] leading-6 overflow-hidden bg-irisBlueColor text-headincolor font-semibold rounded-lg truncate cursor-pointer transition-all duration-300 ease-in-out hover:scale-105   hover:shadow-black hover:shadow-xl'>Upload Photo</label>
          </div>
        </div>

        <div className="mt-7">
          <button type='submit' onClick={updateProfileHandler} className='bg-irisBlueColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg'>Update Changes</button>
        </div>
      </form>
    </div>
  )
}

export default Profile
