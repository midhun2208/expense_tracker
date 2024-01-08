
const incomeModel = require("../models/incomeModel")
const IncomeSchema = require("../models/incomeModel")

exports.addIncome = async (req, res)=>{
    const {userid,title, amount, category, description, date} =  req.body

    const income = IncomeSchema({
        userid,
        title,
        amount,
        category,
        description,
        date
    })
    try {
        //validation
        if(!title || !amount || !category || !description || !date){
            return res.status(400).json({message: "All fields are required!!"})
        }
        if(amount <=0 || !amount == 'number'){
            return res.status(400).json({message: "Amount Should a positive number"})
        }
        else{
            await income.save()
            res.status(200).json({message: "Income Added"})
        }

    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}

exports.getIncomes = async(req, res) =>{
    try {
        const incomes = await IncomeSchema.find({userid:req.body.userid}).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}

exports.deteleIncome = async(req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
    .then((income) =>{
        res.status(200).json({message: 'Income Deleted'})
    })
    .catch((err)=>{
        res.status(200).json({message: "Server Error"})
    })
}

exports.editIncome = async(req,res) =>{
    try {
        await IncomeSchema.findOneAndUpdate({_id: req.body.id},req.body.payload)
        res.status(200).json({message:"Edit Successful"})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

