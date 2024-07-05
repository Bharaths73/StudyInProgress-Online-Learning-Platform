import logo from './logo.svg';
import './App.css';
import { Route, Routes,} from 'react-router-dom';
import  Home  from './pages/Home';
import { Navbar } from './components/common/Navbar';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import { UpdatePassword } from './pages/UpdatePassword';
import { About } from './pages/About';
import { ContactUs } from './pages/ContactUs';
import { VerifyEmail } from './pages/VerifyEmail';
import { MyProfile } from './components/core/Dashboard/MyProfile';
import { Dashboard } from './pages/Dashboard';
import { OpenRoute } from './components/core/Auth/OpenRoute';
import { PrivateRoute } from './components/core/Auth/PrivateRoute';
import { Error } from './pages/Error';
import { Settings } from './components/core/Dashboard/Settings';
import { EnrolledCourses } from './components/core/Dashboard/EnrolledCourses';
import { Cart } from './components/core/Dashboard/Cart';
import { useSelector } from 'react-redux';
import { AddCourse } from './components/core/Dashboard/AddCourses';
import { ViewCourses } from './components/core/Dashboard/MyCourses/ViewCourses';
import { EditCourse } from './components/core/Dashboard/EditCourse.jsx';
import { Catalog } from './pages/Catalog.jsx';
import { BuyNow } from './pages/BuyNow.jsx';
import { VideoDetails } from './components/core/ViewCourse/VideoDetails.jsx';
import { ViewCourse } from './pages/ViewCourse.jsx';
import Instructor from './components/core/Dashboard/InstructorDashboard/Instructor.jsx';




function App() {
  const {user}=useSelector((state)=>state.profile)
  console.log("user account type is ",user?.accountType);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
     <Routes>
        <Route path='/' element={<OpenRoute><Home/></OpenRoute>}/>
        <Route path='/catalog/:catalogName' element={<Catalog/>}/>
        <Route path='courses/:courseId' element={<BuyNow/>}/>
        <Route path='/login' element={<OpenRoute><Login/></OpenRoute>}/>
        <Route path='/signUp' element={<OpenRoute><SignUp/></OpenRoute>}/>
        <Route path='/forgot-password' element={<OpenRoute><ForgotPassword/></OpenRoute>}></Route>
        <Route path='/update-password/:id' element={<OpenRoute><UpdatePassword/></OpenRoute>}/>
        <Route path='/about' element={<OpenRoute><About/></OpenRoute>}/>
        <Route path='/contact' element={<OpenRoute><ContactUs/></OpenRoute>}/>
        <Route path='/verify-email' element={<OpenRoute><VerifyEmail/></OpenRoute>}/>
        <Route 
      element={
         <PrivateRoute>
           <Dashboard />
         </PrivateRoute>
      }
    >
        <Route path="dashboard/my-profile" element={<MyProfile/>} />
        <Route path="dashboard/Settings" element={<Settings/>} />
        {
          user?.accountType==='Student' && (
            <>
              <Route path='dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
              <Route path='dashboard/cart' element={<Cart/>}/>
            </>
          )
        } 

{
          user?.accountType==='Instructor' && (
            <>
              <Route path='dashboard/add-course' element={<AddCourse/>}/>
            </>
          )
        } 

{
          user?.accountType==='Instructor' && (
            <>
              <Route path='dashboard/my-courses' element={<ViewCourses/>}/>
            </>
          )
        } 

{
          user?.accountType==='Instructor' && (
            <>
              <Route path='dashboard/instructor' element={<Instructor/>}/>
            </>
          )
        }

{
          user?.accountType==='Instructor' && (
            <>
              <Route path='dashboard/edit-course/:courseId' element={<EditCourse/>}/>
            </>
          )
        } 
        </Route>

        <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
          {
            user?.accountType==='Student' && (
              <>
              <Route path='view-course/:courseId/section/:sectionId/sub-section/:subSectionId' element={<VideoDetails/>}/>
              </>
            )
          }
        </Route>
        <Route path='*' element={<Error/>}/>
       </Routes>
    </div>
  );
}

export default App;
