const Category = require('../models/Category');
const mongoose=require('mongoose')

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

exports.createCategory=async(req,res)=>{
    try{
        const {name,desc}=req.body;

        if(!name||!desc){
            return res.status(401).json({
                success:false,
                message:"All fields are Required"
            })
        }

        const categoryDetails=await Category.create({name:name,description:desc});
        console.log("tag created ",categoryDetails);

        return res.status(200).json({
            success:true,
            message:"Tag created successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"canot create tag"
        })
    }
}

//get all category
exports.showAllCategory=async(req,res)=>{
    try{
        const allCategory=await Category.find({},{name:true,description:true,course:true}).populate('course').exec();

        return res.status(200).json({
            success:true,
            message:"all category recieved",
            data: allCategory
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Cannot fetch category"
        })
    }
}

//categoryPageDetails
exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: "ratingAndReview",
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.course.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })

      if(categoriesExceptSelected.length===0){
        return res.status(400).json({
          success:false,
          message:"no courses found"
        })
      }
      // console.log("categoryExcepted is ",categoriesExceptSelected);

      // console.log("entering");
      // console.log("id details are ", categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]);
      // console.log("random int is ",getRandomInt(categoriesExceptSelected.length));
      // console.log("length is ",categoriesExceptSelected.length);

      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
      )
        .populate({
          path: "course",
          match: { status: "Published" },
        })
        .exec()
        console.log("entering 1");
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.course)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }